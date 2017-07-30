using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using COMSTU2.Model;
using System.Security.Cryptography;
using System.Text;

namespace COMSTU2.Controllers
{
    // [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        // GET: api/User
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [Route("")]
        [Route("[action]")]
        public User Login([FromQuery]string email, [FromQuery]string password)
        {
            var bll = new BLL.UserBll();
            return bll.login(email, password);
        }
       
        // GET: api/User/5
        [Route("")]
        [HttpGet("{id}", Name = "GetUsers")]
        public string Get(int id)
        {
            return "value";
        }

        [Route("[action]")]
        [HttpGet("{guidId}")]
        public UserAccountResponse GetUserAccount(string guidId)
        {
            var guidParsed = Guid.Parse(guidId);
            var bll = new BLL.UserBll();
            return bll.getUserAccount(guidParsed);
        }

        //[HttpPost("{user}")]
        //public bool StudentRegisterll([FromBody]User user)
        //{
        //    var bll = new BLL.UserBll();
        //    return bll.studentRegisterUser(user);
        //}

        [HttpPost("{req}")]
        public ResponseBuyToken Post([FromBody]RequestBuyToken req)
        {
            var refNum = RandomString(12);

            string MERCHANT = req.MERCHANT
                 , CURRENCY = req.CURRENCY
                 , COUNTRY = req.COUNTRY
                 , REFERENCE = refNum
                 , AMOUNT = req.AMOUNT
                 , PRIVATEKEY = "gXg8RSXmgQlipUQ3upZVtwnd3bI8ZqVul7E9zIPutCsbJsrroeFfnfHtt";

            StringBuilder concatenatedString = new StringBuilder();
            concatenatedString.Append(MERCHANT);
            concatenatedString.Append(CURRENCY);
            concatenatedString.Append(COUNTRY);
            concatenatedString.Append(REFERENCE);
            concatenatedString.Append(AMOUNT);
            concatenatedString.Append(PRIVATEKEY);

            SHA512 SHA512HashCreator = SHA512.Create();

            byte[] EncryptedData = SHA512HashCreator.ComputeHash(Encoding.UTF8.GetBytes(concatenatedString.ToString()));

            StringBuilder CONSISTENT_KEY = new StringBuilder();

            for (int i = 0; i < EncryptedData.Length; i++)
            {
                CONSISTENT_KEY.Append(EncryptedData[i].ToString("X2"));
            }

            var FINAL_CONSISTENT_KEY = CONSISTENT_KEY.ToString().ToUpper();


            var response = new ResponseBuyToken()
            {
                FinalKey = FINAL_CONSISTENT_KEY,
                Reference = refNum
            };

            return response;

        }

        [Route("[action]")]
        [HttpPost("{user}")]
        public User UpdateUserInfo([FromBody]User user)
        {
            var bll = new BLL.UserBll();
            return bll.UpdateUserInfo(user);
        }

        [Route("[action]")]
        public bool BookThisAcc([FromBody]Accommodation acc)
        {
            var bll = new BLL.UserBll();
            return bll.BookThisAcc(acc);

        }

        [Route("")]
        [Route("[action]")]
        public List<User> GetUsersToPayForAdmin()
        {
            var bll = new BLL.UserBll();
            return bll.GetUsersToPay();
        }

        [Route("")]
        [Route("[action]")]
        public bool PayUser(User user)
        {
            var bll = new BLL.UserBll();
            return bll.payUser(user);
        }
        //[HttpPost("{trans}")]
        //public async Task<Transaction> GetTransactionStatus([FromBody]RequestBuyToken trans)
        //{
        //    var tries = 6;
        //    while (true)
        //    {
        //        try
        //        {
        //            _SidApi = new com.sidpayment.www.SidApi();

        //            List<Transaction> Transactions = new List<Transaction>();
        //            Transactions.Add(new Transaction(trans.COUNTRY, trans.CURRENCY, trans.AMOUNT, trans.REFERENCE));
        //            var merchantPassword = "Ws0O5U7v";
        //            string Error = string.Empty;
        //            List<Transaction> transactions = CreateOrderQueryRequestString(trans.MERCHANT, trans.MERCHANT, merchantPassword, Transactions, out Error);
        //            if (transactions == null) throw new Exception();

        //            return transactions.FirstOrDefault();
        //        }
        //        catch (Exception)
        //        {
        //            if (--tries == 0)
        //                throw;
        //            await Task.Delay(100000);
        //        }

        //    }

        //}

        //private static List<Transaction> CreateOrderQueryRequestString(string MerchantCode, string MerchantUsername,
        //string MerchantPassword, List<Transaction> TransactionsToConfirm, out string ErrorMessage)
        //{
        //    StringBuilder Builder = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

        //    Builder.Append("<sid_order_query_request>");
        //    Builder.Append("<merchant>");
        //    Builder.Append(string.Format("<code>{0}</code>", MerchantCode));
        //    Builder.Append(string.Format("<uname>{0}</uname>", MerchantUsername));
        //    Builder.Append(string.Format("<pword>{0}</pword>", MerchantPassword));
        //    Builder.Append("</merchant>");
        //    Builder.Append("<orders>");

        //    foreach (Transaction _transaction in TransactionsToConfirm)
        //    {
        //        Builder.Append("<transaction>");
        //        Builder.Append(string.Format("<country>{0}</country>", _transaction.Country));
        //        Builder.Append(string.Format("<currency>{0}</currency>", _transaction.Currency));
        //        Builder.Append(string.Format("<amount>{0}</amount>", _transaction.Amount));
        //        Builder.Append(string.Format("<reference>{0}</reference>", _transaction.Reference));
        //        Builder.Append("</transaction>");
        //    }

        //    Builder.Append("</orders>");
        //    Builder.Append("</sid_order_query_request>");

        //    string ReturnString = _SidApi.sid_order_query(Builder.ToString());

        //    List<Transaction> ReturnMe = Returned(ReturnString, out ErrorMessage);

        //    return ReturnMe;
        //}

        //private static List<Transaction> Returned(string XMLString, out string ErrorMessage)
        //{
        //    ErrorMessage = string.Empty;


        //    XmlDocument doc = new XmlDocument();
        //    doc.LoadXml(XMLString);

        //    XmlNode outcome = doc.SelectSingleNode("./sid_order_query_response/data/outcome");
        //    XmlNode Error = outcome.Attributes["errorcode"];

        //    if (Error.InnerText != "0")
        //    {

        //        XmlNode ErrorDesc = outcome.Attributes["errordescription"];
        //        XmlNode ErrorSolu = outcome.Attributes["errorsolution"];
        //        ErrorMessage = string.Format("Code: {0}; Description: {1}; Solution: {2}", Error.InnerText, ErrorDesc.InnerText, ErrorSolu.InnerText);

        //        return null;
        //    }

        //    XmlNodeList OrdersList = doc.SelectNodes("./sid_order_query_response/data/orders/transaction");

        //    List<Transaction> transList = new List<Transaction>();

        //    foreach (XmlNode node in OrdersList)
        //    {
        //        Transaction trans = new Transaction();

        //        trans.Status = node.SelectSingleNode("./status").InnerText;
        //        trans.Country = node.SelectSingleNode("./country/code").InnerText;
        //        trans.CountryName = node.SelectSingleNode("./country/name").InnerText;

        //        trans.Currency = node.SelectSingleNode("./currency/code").InnerText;
        //        trans.CurrencyName = node.SelectSingleNode("./currency/name").InnerText;

        //        trans.Amount = node.SelectSingleNode("./amount").InnerText;
        //        trans.Reference = node.SelectSingleNode("./reference").InnerText;

        //        trans.Date_Created = node.SelectSingleNode("./date_created").InnerText;
        //        trans.Date_Ready = node.SelectSingleNode("./date_ready").InnerText;
        //        trans.Date_Completed = node.SelectSingleNode("./date_completed").InnerText;

        //        trans.TnxID = node.SelectSingleNode("./tnxid").InnerText;
        //        trans.ReceiptNo = node.SelectSingleNode("./receiptno").InnerText;

        //        transList.Add(trans);
        //    }

        //    return transList;
        //}

        [Route("")]
        [Route("[action]")]
        public bool CreateUser([FromBody]User user)
        {
            var bll = new BLL.UserBll();
            return bll.registerUser(user);
        }

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        
        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

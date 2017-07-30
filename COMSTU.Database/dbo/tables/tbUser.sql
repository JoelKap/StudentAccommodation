CREATE TABLE [dbo].[tbUser](
	[UserId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Surname] [nvarchar](50) NOT NULL,
	[Cellphone] [nvarchar](50) NOT NULL,
	[SAID] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[ProfilePicture] [nvarchar](max) NULL,
	[StudentProof] [nvarchar](max) NULL,
	[UserType] [nvarchar](50) NOT NULL,
	[BankAccountType] [nvarchar](50) NULL,
	[CaretakerName] [varchar](50) NULL,
 CONSTRAINT [PK_tbUser] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
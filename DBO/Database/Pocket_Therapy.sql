USE [PocketTherapy]
GO
  /****** Object:  Table [dbo].[Advices]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Advices](
    [advice_id] [int] IDENTITY(1, 1) NOT NULL,
    [hashtag_id] [int] NOT NULL,
    [contentAdvice] [nvarchar](800) NOT NULL,
    [authorAdvice] [nvarchar](50) NOT NULL,
    [urlCitation] [nvarchar](50) NULL,
    [createdAt] [datetime] NULL,
    [updatedAt] [datetime] NULL,
    CONSTRAINT [PK_Advices] PRIMARY KEY CLUSTERED ([advice_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Comment]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Comment](
    [comment_id] [int] IDENTITY(1, 1) NOT NULL,
    [user_id] [int] NOT NULL,
    [post_id] [int] NOT NULL,
    [contentComment] [nvarchar](500) NOT NULL,
    [createdAt] [datetime] NOT NULL,
    [updateAt] [datetime] NOT NULL,
    CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED ([comment_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Comunity]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Comunity](
    [hashtag_id] [int] NOT NULL,
    [post_id] [int] NOT NULL,
    [user_id] [int] NOT NULL,
    [likeacnt] [int] NOT NULL,
    [comentcnt] [int] NOT NULL,
    [createdAt] [datetime] NOT NULL,
    [updatedAt] [datetime] NOT NULL
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Contact]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Contact](
    [contact_id] [int] IDENTITY(1, 1) NOT NULL,
    [user_id] [int] NOT NULL,
    [firstName_contact] [nvarchar](50) NOT NULL,
    [lastName_contact] [nvarchar](50) NOT NULL,
    [email_contact] [nvarchar](50) NOT NULL,
    [phoneNumber_contact] [nvarchar](50) NOT NULL,
    CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED ([contact_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Hashtag]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Hashtag](
    [hastag_id] [int] IDENTITY(1, 1) NOT NULL,
    [name] [nvarchar](50) NOT NULL,
    [status] [nvarchar](50) NOT NULL,
    [createdAt] [datetime] NOT NULL,
    [uptdatedAt] [datetime] NOT NULL,
    [createdBy] [nvarchar](50) NOT NULL,
    CONSTRAINT [PK_Hashtag] PRIMARY KEY CLUSTERED ([hastag_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Post]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Post](
    [post_id] [int] IDENTITY(1, 1) NOT NULL,
    [contentPost] [nvarchar](500) NOT NULL,
    [createdAt] [datetime] NOT NULL,
    [updatedAt] [datetime] NOT NULL,
    CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED ([post_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Preferences]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Preferences](
    [preferences_id] [int] IDENTITY(1, 1) NOT NULL,
    [user_id] [int] NOT NULL,
    [hashtag_id] [int] NOT NULL,
    CONSTRAINT [PK_Preferences] PRIMARY KEY CLUSTERED ([preferences_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Roles]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Roles](
    [role_id] [int] IDENTITY(1, 1) NOT NULL,
    [name] [nvarchar](50) NOT NULL,
    [createAt] [datetime] NOT NULL,
    [updateAt] [datetime] NOT NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED ([role_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Schedule]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Schedule](
    [schedule_id] [int] IDENTITY(1, 1) NOT NULL,
    [user_id] [int] NOT NULL,
    [name_schedule] [nvarchar](100) NOT NULL,
    [createdAt] [datetime] NOT NULL,
    [updatedAt] [datetime] NOT NULL,
    CONSTRAINT [PK_Schedule] PRIMARY KEY CLUSTERED ([schedule_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[Task]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[Task](
    [task_id] [int] IDENTITY(1, 1) NOT NULL,
    [schedule_id] [int] NOT NULL,
    [contentTask] [nvarchar](400) NOT NULL,
    [startDate] [datetime] NOT NULL,
    [endDate] [datetime] NOT NULL,
    [createdAt] [datetime] NULL,
    [updatedAt] [datetime] NOT NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([task_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
  /****** Object:  Table [dbo].[User]    Script Date: 5/5/2021 11:15:42 AM ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  CREATE TABLE [dbo].[User](
    [user_id] [int] IDENTITY(1, 1) NOT NULL,
    [role_id] [int] NOT NULL,
    [photoUrl] [nvarchar](150) NULL,
    [firstName] [nvarchar](50) NOT NULL,
    [lastName] [nvarchar](50) NOT NULL,
    [emailprimary] [nvarchar](50) NOT NULL,
    [emailsecundary] [nvarchar](50) NULL,
    [twiter] [nvarchar](50) NULL,
    [facebook] [nvarchar](50) NULL,
    [linkedin] [nvarchar](50) NULL,
    [phoneNumber] [nvarchar](50) NOT NULL,
    [username] [nvarchar](50) NOT NULL,
    [passwordHash] [nvarchar](50) NOT NULL,
    [status] [nvarchar](50) NOT NULL,
    [createdAt] [datetime] NOT NULL,
    [updatedAt] [datetime] NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([user_id] ASC) WITH (
      PAD_INDEX = OFF,
      STATISTICS_NORECOMPUTE = OFF,
      IGNORE_DUP_KEY = OFF,
      ALLOW_ROW_LOCKS = ON,
      ALLOW_PAGE_LOCKS = ON,
      OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
    ) ON [PRIMARY]
  ) ON [PRIMARY]
GO
SET
  IDENTITY_INSERT [dbo].[Hashtag] ON
INSERT
  [dbo].[Hashtag] (
    [hastag_id],
    [name],
    [status],
    [createdAt],
    [uptdatedAt],
    [createdBy]
  )
VALUES
  (
    1,
    N'#depresion',
    N'active',
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    N'jared'
  )
INSERT
  [dbo].[Hashtag] (
    [hastag_id],
    [name],
    [status],
    [createdAt],
    [uptdatedAt],
    [createdBy]
  )
VALUES
  (
    2,
    N'#depresion',
    N'active',
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    N'jared'
  )
INSERT
  [dbo].[Hashtag] (
    [hastag_id],
    [name],
    [status],
    [createdAt],
    [uptdatedAt],
    [createdBy]
  )
VALUES
  (
    3,
    N'#depresion',
    N'active',
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    N'jared'
  )
INSERT
  [dbo].[Hashtag] (
    [hastag_id],
    [name],
    [status],
    [createdAt],
    [uptdatedAt],
    [createdBy]
  )
VALUES
  (
    4,
    N'#depresion',
    N'active',
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    N'jared'
  )
INSERT
  [dbo].[Hashtag] (
    [hastag_id],
    [name],
    [status],
    [createdAt],
    [uptdatedAt],
    [createdBy]
  )
VALUES
  (
    5,
    N'#depresion',
    N'active',
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    N'jared'
  )
INSERT
  [dbo].[Hashtag] (
    [hastag_id],
    [name],
    [status],
    [createdAt],
    [uptdatedAt],
    [createdBy]
  )
VALUES
  (
    6,
    N'#depresion',
    N'active',
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    CAST(N'2021-04-29T21:34:23.267' AS DateTime),
    N'jared'
  )
SET
  IDENTITY_INSERT [dbo].[Hashtag] OFF
GO
SET
  IDENTITY_INSERT [dbo].[Roles] ON
INSERT
  [dbo].[Roles] ([role_id], [name], [createAt], [updateAt])
VALUES
  (
    1,
    N'admin',
    CAST(N'2021-04-29T04:43:35.337' AS DateTime),
    CAST(N'2021-04-29T04:43:35.337' AS DateTime)
  )
INSERT
  [dbo].[Roles] ([role_id], [name], [createAt], [updateAt])
VALUES
  (
    2,
    N'user',
    CAST(N'2021-04-29T04:43:35.337' AS DateTime),
    CAST(N'2021-04-29T04:43:35.337' AS DateTime)
  )
INSERT
  [dbo].[Roles] ([role_id], [name], [createAt], [updateAt])
VALUES
  (
    3,
    N'prueba',
    CAST(N'2021-04-29T20:59:41.883' AS DateTime),
    CAST(N'2021-04-29T20:59:41.883' AS DateTime)
  )
INSERT
  [dbo].[Roles] ([role_id], [name], [createAt], [updateAt])
VALUES
  (
    4,
    N'prueba',
    CAST(N'2021-04-29T20:59:41.883' AS DateTime),
    CAST(N'2021-04-29T20:59:41.883' AS DateTime)
  )
INSERT
  [dbo].[Roles] ([role_id], [name], [createAt], [updateAt])
VALUES
  (
    5,
    N'prueba',
    CAST(N'2021-04-29T20:59:41.883' AS DateTime),
    CAST(N'2021-04-29T20:59:41.883' AS DateTime)
  )
INSERT
  [dbo].[Roles] ([role_id], [name], [createAt], [updateAt])
VALUES
  (
    6,
    N'prueba',
    CAST(N'2021-04-29T20:59:41.883' AS DateTime),
    CAST(N'2021-04-29T20:59:41.883' AS DateTime)
  )
INSERT
  [dbo].[Roles] ([role_id], [name], [createAt], [updateAt])
VALUES
  (
    7,
    N'prueba',
    CAST(N'2021-04-29T20:59:41.883' AS DateTime),
    CAST(N'2021-04-29T20:59:41.883' AS DateTime)
  )
INSERT
  [dbo].[Roles] ([role_id], [name], [createAt], [updateAt])
VALUES
  (
    8,
    N'prueba',
    CAST(N'2021-04-29T20:59:41.883' AS DateTime),
    CAST(N'2021-04-29T20:59:41.883' AS DateTime)
  )
SET
  IDENTITY_INSERT [dbo].[Roles] OFF
GO
ALTER TABLE
  [dbo].[Advices] WITH CHECK
ADD
  CONSTRAINT [FK_Advices_Hashtag] FOREIGN KEY([hashtag_id]) REFERENCES [dbo].[Hashtag] ([hastag_id])
GO
ALTER TABLE
  [dbo].[Advices] CHECK CONSTRAINT [FK_Advices_Hashtag]
GO
ALTER TABLE
  [dbo].[Comment] WITH CHECK
ADD
  CONSTRAINT [FK_Comment_Post] FOREIGN KEY([post_id]) REFERENCES [dbo].[Post] ([post_id])
GO
ALTER TABLE
  [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Post]
GO
ALTER TABLE
  [dbo].[Comment] WITH CHECK
ADD
  CONSTRAINT [FK_Comment_User] FOREIGN KEY([user_id]) REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE
  [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_User]
GO
ALTER TABLE
  [dbo].[Comunity] WITH CHECK
ADD
  CONSTRAINT [FK_Comunity_Hashtag] FOREIGN KEY([hashtag_id]) REFERENCES [dbo].[Hashtag] ([hastag_id])
GO
ALTER TABLE
  [dbo].[Comunity] CHECK CONSTRAINT [FK_Comunity_Hashtag]
GO
ALTER TABLE
  [dbo].[Comunity] WITH CHECK
ADD
  CONSTRAINT [FK_Comunity_Post] FOREIGN KEY([post_id]) REFERENCES [dbo].[Post] ([post_id])
GO
ALTER TABLE
  [dbo].[Comunity] CHECK CONSTRAINT [FK_Comunity_Post]
GO
ALTER TABLE
  [dbo].[Comunity] WITH CHECK
ADD
  CONSTRAINT [FK_Comunity_User] FOREIGN KEY([user_id]) REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE
  [dbo].[Comunity] CHECK CONSTRAINT [FK_Comunity_User]
GO
ALTER TABLE
  [dbo].[Contact] WITH CHECK
ADD
  CONSTRAINT [FK_Contact_User] FOREIGN KEY([user_id]) REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE
  [dbo].[Contact] CHECK CONSTRAINT [FK_Contact_User]
GO
ALTER TABLE
  [dbo].[Preferences] WITH CHECK
ADD
  CONSTRAINT [FK_Preferences_Hashtag] FOREIGN KEY([hashtag_id]) REFERENCES [dbo].[Hashtag] ([hastag_id])
GO
ALTER TABLE
  [dbo].[Preferences] CHECK CONSTRAINT [FK_Preferences_Hashtag]
GO
ALTER TABLE
  [dbo].[Preferences] WITH CHECK
ADD
  CONSTRAINT [FK_Preferences_User] FOREIGN KEY([user_id]) REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE
  [dbo].[Preferences] CHECK CONSTRAINT [FK_Preferences_User]
GO
ALTER TABLE
  [dbo].[Schedule] WITH CHECK
ADD
  CONSTRAINT [FK_Schedule_User] FOREIGN KEY([user_id]) REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE
  [dbo].[Schedule] CHECK CONSTRAINT [FK_Schedule_User]
GO
ALTER TABLE
  [dbo].[Task] WITH CHECK
ADD
  CONSTRAINT [FK_Task_Schedule] FOREIGN KEY([schedule_id]) REFERENCES [dbo].[Schedule] ([schedule_id])
GO
ALTER TABLE
  [dbo].[Task] CHECK CONSTRAINT [FK_Task_Schedule]
GO
ALTER TABLE
  [dbo].[User] WITH CHECK
ADD
  CONSTRAINT [FK_User_Roles] FOREIGN KEY([role_id]) REFERENCES [dbo].[Roles] ([role_id])
GO
ALTER TABLE
  [dbo].[User] CHECK CONSTRAINT [FK_User_Roles]
GO

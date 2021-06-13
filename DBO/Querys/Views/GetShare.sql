USE PocketTherapy

IF EXISTS (
SELECT *
FROM sys.views
  JOIN sys.schemas
  ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
  AND sys.views.name = N'GetShare'
)
DROP VIEW dbo.GetShare
GO

CREATE VIEW dbo.GetShare
AS
  SELECT po.post_id 'PostId', po.contentPost 'ContentPost', us.user_id  'UserShareId', us.photoUrl  'PhotoUrl', us.username  'Username'
  FROM [User] us, [Share] sh, [Post] po
  WHERE sh.user_id = us.user_id and sh.post_id = po.post_id
GO


SELECT *
FROM dbo.GetShare

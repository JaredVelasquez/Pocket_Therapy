USE PocketTherapy

IF EXISTS (
SELECT *
FROM sys.views
  JOIN sys.schemas
  ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
  AND sys.views.name = N'GetComment'
)
DROP VIEW dbo.GetComment
GO

CREATE VIEW dbo.GetComment
AS
  SELECT po.post_id 'PostId', us.user_id  'UserCommentId', us.photoUrl  'PhotoUrl', us.username  'Username', co.comment_id 'ContentId', co.contentComment 'ContentComment'
  FROM [User] us, [Comment] co, [Post] po
  WHERE co.user_id = us.user_id and co.post_id = po.post_id
GO


SELECT *
FROM dbo.GetComment
WHERE PostId = 'jtCEAHj5E'

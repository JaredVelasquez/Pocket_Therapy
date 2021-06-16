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
  SELECT us.user_id  'UserId', us.photoUrl  'Photo', us.username  'Username', po.post_id 'PostId', ha.name 'Hashtag', po.contentPost 'ContentPost', sh.comentcount 'Coment', sh.likecount 'Like'
  FROM [User] us, [Share] sh, [Post] po, [Hashtag] ha
  WHERE sh.user_id = us.user_id and sh.post_id = po.post_id and sh.hashtag_id = ha.hastag_id
GO


SELECT *
FROM dbo.GetShare

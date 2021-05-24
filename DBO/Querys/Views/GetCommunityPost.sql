USE PocketTherapy

IF EXISTS (
SELECT *
FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'ViewName'
)
DROP VIEW dbo.GetCommunityPost
GO

CREATE VIEW dbo.GetCommunityPost
AS
    SELECT us.userId  'UserId', us.photoUrl  'Photo', us.username  'Username', ha.name 'Hashtag', po.contentPost 'Content', co.comentcnt'Coment', co.likeacnt'Like'
    FROM [User] us, [Comunity] co, [Hashtag] ha, [Post] po
    WHERE co.user_id = us.user_id and co.post_id = po.post_id and co.hashtag_id = ha.hastag_id
GO


SELECT *
FROM dbo.GetCommunityPost

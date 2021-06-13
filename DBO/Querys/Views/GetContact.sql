USE PocketTherapy

IF EXISTS (
SELECT *
FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'GetContact'
)
DROP VIEW dbo.GetContact
GO

CREATE VIEW dbo.GetContact
AS
    SELECT us.user_id  'UserContactId', us.photoUrl  'PhotoContact', us.username  'UsernameContact', us.emailprimary  'EmailContact', co.userOwner_id  'UserOwnerId'
    FROM [User] us, [Contact] co
    WHERE co.userContact_id = us.user_id
GO


SELECT *
FROM dbo.GetContact

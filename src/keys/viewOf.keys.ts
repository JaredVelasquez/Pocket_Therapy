export namespace ViewOf {
  export const GetCommunityPost = `SELECT * FROM dbo.GetCommunityPost`;
  export const GetUserLikes = `SELECT * FROM [Like] WHERE user_id = `;
  export const GetContact = `SELECT * FROM dbo.GetContact`;
  export const GetShare = `SELECT * FROM dbo.GetShare`;
  export const GetComment = `SELECT * FROM dbo.GetComment WHERE PostId = `;
}

SELECT us.lastName  'Nombre del Usuario ', ha.name ' Nombre del Hashtag', po.contentPost 'Contenido del Post ', co.comentcnt' Coment', co.likeacnt'Like '

FROM [User] us

  INNER JOIN Hashtag ha

  ON us.user_id = ha.hastag_id

  INNER JOIN Post po

  ON po.post_id = po.post_id


  INNER JOIN Comunity co

  on co.user_id = co.user_id

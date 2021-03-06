import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Post} from '../models';
import {CommentRepository, ComunityRepository, LikeRepository, PostRepository, ShareRepository} from '../repositories';
const shortid = require('shortid');

class AddPost {
  hashtagid: string;
  contentPost: string;
  userid: string;
  createdAt: string;
  updatedAt: string;
}


//@authenticate('admin', 'user')
export class PostController {
  constructor(

    @repository(PostRepository)
    public postRepository: PostRepository,
    @repository(ComunityRepository)
    public comunityRepository: ComunityRepository,
    @repository(LikeRepository)
    public likeRepository: LikeRepository,
    @repository(ShareRepository)
    public shareRepository: ShareRepository,
    @repository(CommentRepository)
    public commentRepository: CommentRepository,

  ) { }

  @post('/add-post', {
    responses: {
      '200': {

        description: 'Add post of Usert on Community'
      }
    }
  })
  async login(
    @requestBody() addpost: AddPost
  ): Promise<object> {
    let postId = shortid.generate();

    let postModel = {
      postId: postId,
      contentPost: addpost.contentPost,
      createdAt: addpost.createdAt,
      updatedAt: addpost.updatedAt
    };

    let post = await this.postRepository.create(postModel);

    let CommunityModel: any = {
      hashtagId: addpost.hashtagid,
      postId: postId,
      userId: addpost.userid,
      likeacnt: 0,
      comentcnt: 0,
      createdAt: addpost.createdAt,
      updatedAt: addpost.updatedAt
    };

    let Community = await this.comunityRepository.create(CommunityModel);

    return post;
  }


  @authenticate.skip()
  @get('/posts/count')
  @response(200, {
    description: 'Post model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Post) where?: Where<Post>,
  ): Promise<Count> {
    return this.postRepository.count(where);

  }

  @authenticate.skip()
  @get('/posts')
  @response(200, {
    description: 'Array of Post model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Post, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Post) filter?: Filter<Post>,
  ): Promise<Post[]> {
    return this.postRepository.find(filter);
  }

  @patch('/posts')
  @response(200, {
    description: 'Post PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {partial: true}),

        },
      },
    })
    post: Post,
    @param.where(Post) where?: Where<Post>,
  ): Promise<Count> {
    return this.postRepository.updateAll(post, where);
  }

  @authenticate.skip()
  @get('/posts/{id}')
  @response(200, {
    description: 'Post model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Post, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Post, {exclude: 'where'}) filter?: FilterExcludingWhere<Post>
  ): Promise<Post> {
    return this.postRepository.findById(id, filter);

  }

  @patch('/posts/{id}')
  @response(204, {
    description: 'Post PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {partial: true}),
        },
      },
    })
    post: Post,
  ): Promise<void> {
    await this.postRepository.updateById(id, post);

  }

  @put('/posts/{id}')
  @response(204, {
    description: 'Post PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() post: Post,
  ): Promise<void> {
    await this.postRepository.replaceById(id, post);

  }

  @del('/posts/{id}')
  @response(204, {
    description: 'Post DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    let identifyPost = await this.comunityRepository.findOne({where: {postId: id}});
    if (!identifyPost)
      throw new HttpErrors[400]("Este post no existe.");
    await this.likeRepository.deleteAll({where: {postId: id}});
    await this.comunityRepository.deleteById(identifyPost?.id);
    await this.shareRepository.deleteAll({where: {postId: id}});
    await this.commentRepository.deleteAll({where: {postId: id}});
    await this.postRepository.deleteById(id);

  }
}

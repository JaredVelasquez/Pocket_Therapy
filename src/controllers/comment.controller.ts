import {
  Count,
  CountSchema,
  Filter,

  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {ViewOf} from '../keys/viewOf.keys';
import {Comment} from '../models';
import {CommentRepository, ComunityRepository, PostRepository} from '../repositories';

//@authenticate('admin', 'user')
export class CommentController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
    @repository(PostRepository)
    public postRepository: PostRepository,
    @repository(ComunityRepository)
    public comunityRepository: ComunityRepository,
  ) { }

  @post('/comments')
  @response(200, {
    description: 'Comment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewComment',
            exclude: ['id'],
          }),
        },
      },
    })
    comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    let ExistPost = await this.comunityRepository.findOne({where: {postId: comment.postId}});
    let countComent: any;
    if (ExistPost)
      countComent = ExistPost.comentcnt + 1;

    let update: any = {
      hashtagId: ExistPost?.hashtagId,
      postId: ExistPost?.postId,
      userId: ExistPost?.userId,
      likeacnt: ExistPost?.likeacnt,
      comentcnt: countComent,
      createdAt: ExistPost?.createdAt,
      updatedAt: Date.now()
    }

    let updatePost = await this.comunityRepository.replaceById(ExistPost?.id, update);
    return this.commentRepository.create(comment);
  }

  @get('/comments/count')
  @response(200, {
    description: 'Comment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comment) where?: Where<Comment>,
  ): Promise<Count> {
    return this.commentRepository.count(where);
  }

  @get('/comments')
  @response(200, {
    description: 'Array of Comment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comment) filter?: Filter<Comment>,
  ): Promise<Comment[]> {
    return this.commentRepository.find(filter);
  }

  @patch('/comments')
  @response(200, {
    description: 'Comment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Comment,
    @param.where(Comment) where?: Where<Comment>,
  ): Promise<Count> {
    return this.commentRepository.updateAll(comment, where);
  }

  @get('/comments/{id}')
  @response(200, {
    description: 'Comment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<any> {

    return await this.commentRepository.dataSource.execute(ViewOf.GetComment + `'${id}'`);
  }

  @patch('/comments/{id}')
  @response(204, {
    description: 'Comment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Comment,
  ): Promise<void> {
    await this.commentRepository.updateById(id, comment);
  }

  @put('/comments/{id}')
  @response(204, {
    description: 'Comment PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() comment: Comment,
  ): Promise<void> {
    await this.commentRepository.replaceById(id, comment);
  }

  @del('/comments/{id}')
  @response(204, {
    description: 'Comment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    let identifyComment = await this.commentRepository.findOne({where: {commentId: id}});
    let ExistPost = await this.comunityRepository.findOne({where: {postId: identifyComment?.postId}});
    let countComent: any;
    if (ExistPost)
      countComent = ExistPost.comentcnt - 1;

    let update: any = {
      hashtagId: ExistPost?.hashtagId,
      postId: ExistPost?.postId,
      userId: ExistPost?.userId,
      likeacnt: ExistPost?.likeacnt,
      comentcnt: countComent,
      createdAt: ExistPost?.createdAt,
      updatedAt: Date.now()
    }

    let updatePost = await this.comunityRepository.replaceById(ExistPost?.id, update);

    await this.commentRepository.deleteById(id);
  }
}

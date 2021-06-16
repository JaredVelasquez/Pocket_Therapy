import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
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
import {Like} from '../models';
import {LikeRepository} from '../repositories';

@authenticate('admin', 'user')
export class LikeController {
  constructor(
    @repository(LikeRepository)
    public likeRepository: LikeRepository,
  ) { }

  @post('/likes')
  @response(200, {
    description: 'Like model instance',
    content: {'application/json': {schema: getModelSchemaRef(Like)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Like, {
            title: 'NewLike',
            exclude: ['id'],
          }),
        },
      },
    })
    like: Omit<Like, 'id'>,
  ): Promise<Like> {
    return this.likeRepository.create(like);
  }

  @get('/likes/count')
  @response(200, {
    description: 'Like model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Like) where?: Where<Like>,
  ): Promise<Count> {
    return this.likeRepository.count(where);
  }

  @get('/likes')
  @response(200, {
    description: 'Array of Like model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Like, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Like) filter?: Filter<Like>,
  ): Promise<Like[]> {
    return this.likeRepository.find(filter);
  }

  @patch('/likes')
  @response(200, {
    description: 'Like PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Like, {partial: true}),
        },
      },
    })
    like: Like,
    @param.where(Like) where?: Where<Like>,
  ): Promise<Count> {
    return this.likeRepository.updateAll(like, where);
  }

  @get('/likes/{id}')
  @response(200, {
    description: 'Like model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Like, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Like, {exclude: 'where'}) filter?: FilterExcludingWhere<Like>
  ): Promise<Like> {
    return this.likeRepository.findById(id, filter);
  }

  @patch('/likes/{id}')
  @response(204, {
    description: 'Like PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Like, {partial: true}),
        },
      },
    })
    like: Like,
  ): Promise<void> {
    await this.likeRepository.updateById(id, like);
  }

  @put('/likes/{id}')
  @response(204, {
    description: 'Like PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() like: Like,
  ): Promise<void> {
    await this.likeRepository.replaceById(id, like);
  }

  @del('/likes/{id}')
  @response(204, {
    description: 'Like DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.likeRepository.deleteById(id);
  }


  @get('/get-user-likes/{id}')
  async vista1(
    @param.path.number('id') id: number
  ): Promise<Like> {
    let datos = await this.getUserLikes(id);
    return datos;
  }

  async getUserLikes(id: number) {
    return await this.likeRepository.dataSource.execute(ViewOf.GetUserLikes + `${id}`);
  }
}

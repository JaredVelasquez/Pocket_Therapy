import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Hashtag} from '../models';
import {HashtagRepository} from '../repositories';

@authenticate('admin')
export class HashtagController {
  constructor(
    @repository(HashtagRepository)
    public hashtagRepository: HashtagRepository,
  ) { }

  @post('/hashtags')
  @response(200, {
    description: 'Hashtag model instance',
    content: {'application/json': {schema: getModelSchemaRef(Hashtag)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hashtag, {
            title: 'NewHashtag',
            exclude: ['id'],
          }),
        },
      },
    })
    hashtag: Omit<Hashtag, 'id'>,
  ): Promise<Hashtag> {
    return this.hashtagRepository.create(hashtag);
  }

  @authenticate.skip()
  @get('/hashtags/count')
  @response(200, {
    description: 'Hashtag model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Hashtag) where?: Where<Hashtag>,
  ): Promise<Count> {
    return this.hashtagRepository.count(where);
  }

  @authenticate.skip()
  @get('/hashtags')
  @response(200, {
    description: 'Array of Hashtag model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hashtag, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Hashtag) filter?: Filter<Hashtag>,
  ): Promise<Hashtag[]> {
    return this.hashtagRepository.find(filter);
  }

  @patch('/hashtags')
  @response(200, {
    description: 'Hashtag PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hashtag, {partial: true}),
        },
      },
    })
    hashtag: Hashtag,
    @param.where(Hashtag) where?: Where<Hashtag>,
  ): Promise<Count> {
    return this.hashtagRepository.updateAll(hashtag, where);
  }

  @authenticate.skip()
  @get('/hashtags/{id}')
  @response(200, {
    description: 'Hashtag model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Hashtag, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Hashtag, {exclude: 'where'}) filter?: FilterExcludingWhere<Hashtag>
  ): Promise<Hashtag> {
    return this.hashtagRepository.findById(id, filter);
  }

  @patch('/hashtags/{id}')
  @response(204, {
    description: 'Hashtag PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hashtag, {partial: true}),
        },
      },
    })
    hashtag: Hashtag,
  ): Promise<void> {
    await this.hashtagRepository.updateById(id, hashtag);
  }

  @put('/hashtags/{id}')
  @response(204, {
    description: 'Hashtag PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() hashtag: Hashtag,
  ): Promise<void> {
    await this.hashtagRepository.replaceById(id, hashtag);
  }

  @del('/hashtags/{id}')
  @response(204, {
    description: 'Hashtag DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.hashtagRepository.deleteById(id);
  }
}

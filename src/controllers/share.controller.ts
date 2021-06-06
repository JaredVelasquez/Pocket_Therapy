import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Share} from '../models';
import {ShareRepository} from '../repositories';

export class ShareController {
  constructor(
    @repository(ShareRepository)
    public shareRepository : ShareRepository,
  ) {}

  @post('/shares')
  @response(200, {
    description: 'Share model instance',
    content: {'application/json': {schema: getModelSchemaRef(Share)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Share, {
            title: 'NewShare',
            exclude: ['id'],
          }),
        },
      },
    })
    share: Omit<Share, 'id'>,
  ): Promise<Share> {
    return this.shareRepository.create(share);
  }

  @get('/shares/count')
  @response(200, {
    description: 'Share model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Share) where?: Where<Share>,
  ): Promise<Count> {
    return this.shareRepository.count(where);
  }

  @get('/shares')
  @response(200, {
    description: 'Array of Share model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Share, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Share) filter?: Filter<Share>,
  ): Promise<Share[]> {
    return this.shareRepository.find(filter);
  }

  @patch('/shares')
  @response(200, {
    description: 'Share PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Share, {partial: true}),
        },
      },
    })
    share: Share,
    @param.where(Share) where?: Where<Share>,
  ): Promise<Count> {
    return this.shareRepository.updateAll(share, where);
  }

  @get('/shares/{id}')
  @response(200, {
    description: 'Share model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Share, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Share, {exclude: 'where'}) filter?: FilterExcludingWhere<Share>
  ): Promise<Share> {
    return this.shareRepository.findById(id, filter);
  }

  @patch('/shares/{id}')
  @response(204, {
    description: 'Share PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Share, {partial: true}),
        },
      },
    })
    share: Share,
  ): Promise<void> {
    await this.shareRepository.updateById(id, share);
  }

  @put('/shares/{id}')
  @response(204, {
    description: 'Share PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() share: Share,
  ): Promise<void> {
    await this.shareRepository.replaceById(id, share);
  }

  @del('/shares/{id}')
  @response(204, {
    description: 'Share DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.shareRepository.deleteById(id);
  }
}

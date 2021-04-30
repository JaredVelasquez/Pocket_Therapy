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
import {Advices} from '../models';
import {AdvicesRepository} from '../repositories';

export class AdvicesController {
  constructor(
    @repository(AdvicesRepository)
    public advicesRepository : AdvicesRepository,
  ) {}

  @post('/advices')
  @response(200, {
    description: 'Advices model instance',
    content: {'application/json': {schema: getModelSchemaRef(Advices)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advices, {
            title: 'NewAdvices',
            exclude: ['id'],
          }),
        },
      },
    })
    advices: Omit<Advices, 'id'>,
  ): Promise<Advices> {
    return this.advicesRepository.create(advices);
  }

  @get('/advices/count')
  @response(200, {
    description: 'Advices model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Advices) where?: Where<Advices>,
  ): Promise<Count> {
    return this.advicesRepository.count(where);
  }

  @get('/advices')
  @response(200, {
    description: 'Array of Advices model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Advices, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Advices) filter?: Filter<Advices>,
  ): Promise<Advices[]> {
    return this.advicesRepository.find(filter);
  }

  @patch('/advices')
  @response(200, {
    description: 'Advices PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advices, {partial: true}),
        },
      },
    })
    advices: Advices,
    @param.where(Advices) where?: Where<Advices>,
  ): Promise<Count> {
    return this.advicesRepository.updateAll(advices, where);
  }

  @get('/advices/{id}')
  @response(200, {
    description: 'Advices model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Advices, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Advices, {exclude: 'where'}) filter?: FilterExcludingWhere<Advices>
  ): Promise<Advices> {
    return this.advicesRepository.findById(id, filter);
  }

  @patch('/advices/{id}')
  @response(204, {
    description: 'Advices PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advices, {partial: true}),
        },
      },
    })
    advices: Advices,
  ): Promise<void> {
    await this.advicesRepository.updateById(id, advices);
  }

  @put('/advices/{id}')
  @response(204, {
    description: 'Advices PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() advices: Advices,
  ): Promise<void> {
    await this.advicesRepository.replaceById(id, advices);
  }

  @del('/advices/{id}')
  @response(204, {
    description: 'Advices DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.advicesRepository.deleteById(id);
  }
}

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
import {Preferences} from '../models';
import {PreferencesRepository} from '../repositories';

@authenticate('user')
export class PreferencesController {
  constructor(
    @repository(PreferencesRepository)
    public preferencesRepository: PreferencesRepository,
  ) { }

  @post('/preferences')
  @response(200, {
    description: 'Preferences model instance',
    content: {'application/json': {schema: getModelSchemaRef(Preferences)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferences, {
            title: 'NewPreferences',
            exclude: ['id'],
          }),
        },
      },
    })
    preferences: Omit<Preferences, 'id'>,
  ): Promise<Preferences> {
    return this.preferencesRepository.create(preferences);
  }

  @authenticate.skip()
  @get('/preferences/count')
  @response(200, {
    description: 'Preferences model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Preferences) where?: Where<Preferences>,
  ): Promise<Count> {
    return this.preferencesRepository.count(where);
  }

  @authenticate.skip()
  @get('/preferences')
  @response(200, {
    description: 'Array of Preferences model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Preferences, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Preferences) filter?: Filter<Preferences>,
  ): Promise<Preferences[]> {
    return this.preferencesRepository.find(filter);
  }

  @patch('/preferences')
  @response(200, {
    description: 'Preferences PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferences, {partial: true}),
        },
      },
    })
    preferences: Preferences,
    @param.where(Preferences) where?: Where<Preferences>,
  ): Promise<Count> {
    return this.preferencesRepository.updateAll(preferences, where);
  }

  @authenticate.skip()
  @get('/preferences/{id}')
  @response(200, {
    description: 'Preferences model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Preferences, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Preferences, {exclude: 'where'}) filter?: FilterExcludingWhere<Preferences>
  ): Promise<Preferences> {
    return this.preferencesRepository.findById(id, filter);
  }

  @patch('/preferences/{id}')
  @response(204, {
    description: 'Preferences PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferences, {partial: true}),
        },
      },
    })
    preferences: Preferences,
  ): Promise<void> {
    await this.preferencesRepository.updateById(id, preferences);
  }

  @put('/preferences/{id}')
  @response(204, {
    description: 'Preferences PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() preferences: Preferences,
  ): Promise<void> {
    await this.preferencesRepository.replaceById(id, preferences);
  }

  @del('/preferences/{id}')
  @response(204, {
    description: 'Preferences DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.preferencesRepository.deleteById(id);
  }
}

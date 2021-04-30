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
import {Schedule} from '../models';
import {ScheduleRepository} from '../repositories';

@authenticate('admin', 'user')
export class ScheduleController {
  constructor(
    @repository(ScheduleRepository)
    public scheduleRepository: ScheduleRepository,
  ) { }

  @post('/schedules')
  @response(200, {
    description: 'Schedule model instance',
    content: {'application/json': {schema: getModelSchemaRef(Schedule)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {
            title: 'NewSchedule',
            exclude: ['id'],
          }),
        },
      },
    })
    schedule: Omit<Schedule, 'id'>,
  ): Promise<Schedule> {
    return this.scheduleRepository.create(schedule);
  }

  @authenticate.skip()
  @get('/schedules/count')
  @response(200, {
    description: 'Schedule model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Schedule) where?: Where<Schedule>,
  ): Promise<Count> {
    return this.scheduleRepository.count(where);
  }

  @authenticate.skip()
  @get('/schedules')
  @response(200, {
    description: 'Array of Schedule model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Schedule, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Schedule) filter?: Filter<Schedule>,
  ): Promise<Schedule[]> {
    return this.scheduleRepository.find(filter);
  }

  @patch('/schedules')
  @response(200, {
    description: 'Schedule PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {partial: true}),
        },
      },
    })
    schedule: Schedule,
    @param.where(Schedule) where?: Where<Schedule>,
  ): Promise<Count> {
    return this.scheduleRepository.updateAll(schedule, where);
  }

  @authenticate.skip()
  @get('/schedules/{id}')
  @response(200, {
    description: 'Schedule model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Schedule, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Schedule, {exclude: 'where'}) filter?: FilterExcludingWhere<Schedule>
  ): Promise<Schedule> {
    return this.scheduleRepository.findById(id, filter);
  }

  @patch('/schedules/{id}')
  @response(204, {
    description: 'Schedule PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Schedule, {partial: true}),
        },
      },
    })
    schedule: Schedule,
  ): Promise<void> {
    await this.scheduleRepository.updateById(id, schedule);
  }

  @put('/schedules/{id}')
  @response(204, {
    description: 'Schedule PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() schedule: Schedule,
  ): Promise<void> {
    await this.scheduleRepository.replaceById(id, schedule);
  }

  @del('/schedules/{id}')
  @response(204, {
    description: 'Schedule DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.scheduleRepository.deleteById(id);
  }
}

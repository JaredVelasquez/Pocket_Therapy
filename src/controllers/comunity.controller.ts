import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {ViewOf} from '../keys/viewOf.keys';
import {Comunity} from '../models';
import {ComunityRepository, LikeRepository} from '../repositories';

class SetLike {
  postid: string;
  userid: number;
}

@authenticate('admin', 'user')
export class ComunityController {
  constructor(
    @repository(ComunityRepository)
    public comunityRepository: ComunityRepository,
    @repository(LikeRepository)
    public likeRepository: LikeRepository,
  ) { }

  @post('/comunities')
  @response(200, {
    description: 'Comunity model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comunity)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunity, {
            title: 'NewComunity',
            exclude: ['id'],
          }),
        },
      },
    })
    comunity: Omit<Comunity, 'id'>,
  ): Promise<Comunity> {
    return this.comunityRepository.create(comunity);
  }

  @put('/new-like', {
    responses: {
      '200': {
        description: 'Set new like'
      }
    }
  })
  async login(
    @requestBody() setLike: SetLike
  ): Promise<object> {
    let identifyPost = await this.comunityRepository.findOne({where: {postId: setLike.postid}});
    let ExistLike = await this.likeRepository.findOne({where: {userId: setLike.userid}} && {where: {postId: setLike.postid}});
    let likesum: any = identifyPost?.likeacnt;
    let createLike: any;
    if (ExistLike) {
      likesum = likesum - 1;
      await this.likeRepository.deleteById(ExistLike.likeId);
    }
    if (!ExistLike) {
      likesum = likesum + 1;
      let newLike: any = {
        userId: setLike.userid,
        postId: setLike.postid
      }
      createLike = await this.likeRepository.create(newLike);
    }

    let update: any = {
      hashtagId: identifyPost?.hashtagId,
      postId: identifyPost?.postId,
      userId: identifyPost?.userId,
      likeacnt: likesum,
      comentcnt: identifyPost?.comentcnt,
      createdAt: identifyPost?.createdAt,
      updatedAt: Date.now()
    }



    let updatePost = await this.comunityRepository.replaceById(identifyPost?.id, update);

    return createLike;
  }


  @authenticate.skip()
  @get('/comunities/count')
  @response(200, {
    description: 'Comunity model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comunity) where?: Where<Comunity>,
  ): Promise<Count> {
    return this.comunityRepository.count(where);
  }

  @authenticate.skip()
  @get('/comunities')
  @response(200, {
    description: 'Array of Comunity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comunity, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comunity) filter?: Filter<Comunity>,
  ): Promise<Comunity[]> {
    return this.comunityRepository.find(filter);
  }

  @patch('/comunities')
  @response(200, {
    description: 'Comunity PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunity, {partial: true}),
        },
      },
    })
    comunity: Comunity,
    @param.where(Comunity) where?: Where<Comunity>,
  ): Promise<Count> {
    return this.comunityRepository.updateAll(comunity, where);
  }

  @authenticate.skip()
  @get('/comunities/{id}')
  @response(200, {
    description: 'Comunity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comunity, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Comunity, {exclude: 'where'}) filter?: FilterExcludingWhere<Comunity>
  ): Promise<Comunity> {
    return this.comunityRepository.findById(id, filter);
  }

  @patch('/comunities/{id}')
  @response(204, {
    description: 'Comunity PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunity, {partial: true}),
        },
      },
    })
    comunity: Comunity,
  ): Promise<void> {
    await this.comunityRepository.updateById(id, comunity);
  }

  @put('/comunities/{id}')
  @response(204, {
    description: 'Comunity PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() comunity: Comunity,
  ): Promise<void> {
    await this.comunityRepository.replaceById(id, comunity);
  }

  @del('/comunities/{id}')
  @response(204, {
    description: 'Comunity DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {

    await this.comunityRepository.deleteById(id);

  }

  @get('/ver-post-view')
  async CommunityPost(): Promise<any> {
    let datos: any[] = await this.getView();
    return datos;
  }

  async getView() {
    return await this.comunityRepository.dataSource.execute(
      ViewOf.GetCommunityPost,
    );
  }
}

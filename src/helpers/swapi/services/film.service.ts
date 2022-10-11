import { Film } from '../types/film.type'
import { Request } from '../types/request.type'
import { Resource } from '../types/resource.type'
import { BaseService } from './base.service'

type GetFilmsProps = {
  search?: string
}

class FilmService extends BaseService<Film, GetFilmsProps> {
  constructor() {
    super(Resource.FILMS)
  }

  async list(options?: GetFilmsProps) {
    try {
      const { search } = options || {}      
      return search
        ? await this.searchResource(search)
        : await this.listResource()
    } catch (error) {
      throw error
    }
  }

  async get(id: string) {
    try {
      return await this.getResource(id)
    } catch (error) {
      throw error
    }
  }
}

export const Service = new FilmService()

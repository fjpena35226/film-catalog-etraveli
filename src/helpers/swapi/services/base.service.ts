import axios from 'axios'
import { Request } from '../types/request.type'
import { Resource } from '../types/resource.type'

const BASE_API_URL = process.env.BASE_API_URL || 'https://swapi.dev/api'

export abstract class BaseService<Type, Search> {
  resource: Resource

  constructor(resource: Resource) {
    this.resource = resource
  }

  public listResource = async () => {
    try {
      const { data } = await axios.get<Request<Type>>(
        `${BASE_API_URL}/${this.resource}`
      )
      return data
    } catch (error) {
      throw error
    }
  }

  public searchResource = async (search?: string) => {
    try {
      const { data } = await axios.get<Request<Type>>(
        `${BASE_API_URL}/${this.resource}/?search=${search}`
      )
      return data
    } catch (error) {
      throw error
    }
  }

  public getResource = async (id: string) => {
    try {
      const { data } = await axios.get<Type>(
        `${BASE_API_URL}/${this.resource}/${id}`
      )
      return data
    } catch (error) {
      throw error
    }
  }

  abstract list(options: Search): Promise<Request<Type>>
  abstract get(id: string): Promise<Type>
}

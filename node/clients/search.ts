import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class SearchClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://search.biggylabs.com.br', context, options)
  }

  public async search(account: string, path: string): Promise<any> {

    const url = `search-api/v1/${account}/api/split/product_search/${path}`
    console.log(url)
    return this.http.get(url)
  }
}

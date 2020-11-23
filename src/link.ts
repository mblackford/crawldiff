'use strict'

import { URL } from 'url'

import LinkType from './link-type'

class Link {
  readonly uri: string
  readonly type: LinkType
  private readonly url: URL

  constructor(uri: string, type: LinkType) {
    this.uri = uri
    this.type = type

    this.url = new URL(uri)
  }

  pathname(): string {
    // if (this.type == LinkType.Page) {
    //   return this.url.pathname
    // }
    return this.url.pathname + this.url.search 
  }
}

export default Link

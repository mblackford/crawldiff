'use strict'

import fetch from 'node-fetch'

import Config from './config'
import Entity from './entity'
import Link from './link'
import Logger from './logger'

class Fetcher {
  readonly config: Config
  readonly logger: Logger

  constructor(config: Config, logger: Logger) {
    this.config = config
    this.logger = logger
  }

  async loadEntity(link: Link): Promise<Entity> {
    const headers = this.createHeaders()
    if (this.config.warmupCache) {
      this.logger.debug(`    ... Warming up ${link.uri}`)
      await fetch(link.uri, { 'headers': headers })
    }

    this.logger.debug(`    ... Loading ${link.uri}`)
    const response = await fetch(link.uri, { 'headers': headers })
    const body = await response.text()
    const contentType = response.headers.get('Content-Type')

    return new Entity(link, response.status, body, contentType)
  }

  private createHeaders() {
    return {
      'User-Agent': this.config.userAgent
    }
  }
}

export default Fetcher

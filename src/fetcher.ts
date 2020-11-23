'use strict'

import fetch from 'node-fetch'

import Config from './config'
import Entity from './entity'
import Link from './link'
import Logger from './logger'

const packageJson = require('../package.json')
const USER_AGENT = `${packageJson.name}/${packageJson.version}`

class Fetcher {
  readonly config: Config
  readonly logger: Logger

  constructor(config: Config, logger: Logger) {
    this.config = config
    this.logger = logger
  }

  async loadEntity(link: Link): Promise<Entity> {
    this.logger.debug(`    ... Loading ${link.uri}`)

    const headers = this.createHeaders()
    const response = await fetch(link.uri, { 'headers': headers })
    const body = await response.text()
    const contentType = response.headers.get('Content-Type')

    return new Entity(link, response.status, body, contentType)
  }

  private createHeaders() {
    return {
      'User-Agent': USER_AGENT,
    }
  }
}

export default Fetcher

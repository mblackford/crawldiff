'use strict'

import fetch from 'node-fetch'

import Config from './config'
import Entity from './entity'
import Link from './link'
import Logger from './logger'

const packageJson = require('../package.json')
const USER_AGENT_DESKTOP = `${packageJson.name}/${packageJson.version}`
const USER_AGENT_MOBILE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'

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
    if (this.config.mobile) {
      return {
        'User-Agent': USER_AGENT_MOBILE
      }
    }

    return {
      'User-Agent': USER_AGENT_DESKTOP,
    }
  }
}

export default Fetcher

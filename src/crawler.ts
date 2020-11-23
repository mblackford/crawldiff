'use strict'

import { linkSync } from 'fs'
import Config from './config'
import Entity from './entity'
import Fetcher from './fetcher'
import Link from './link'
import Logger from './logger'
import Store from './store'

class Crawler {
  readonly config: Config
  readonly logger: Logger
  readonly store: Store
  readonly fetcher: Fetcher

  constructor(config: Config, logger: Logger, store: Store) {
    this.config = config
    this.logger = logger
    this.store = store

    this.fetcher = new Fetcher(config, logger)
  }

  async crawlLink(link: Link): Promise<[Entity, Entity]> {
    // Mark the link as crawled
    this.store.markCrawled(link)

    // Load the original entity
    const original = await this.fetcher.loadEntity(link)

    // Load the comparison entity
    const comparisonUri = this.config.comparisonHost + link.pathname()
    const comparisonLink = new Link(comparisonUri, link.type)
    const comparison = await this.fetcher.loadEntity(comparisonLink)

    // Only parse entities if they're html pages
    if (original.contentType?.toLowerCase().startsWith('text/html')) {
      // Parse the links, scripts, and link tags
      const foundLinks = original.parseLinks()
      this.logger.debug(` - Parsed ${foundLinks.length} links`)
  
      const foundScripts = this.config.resources ? original.parseScripts() : []
      if (this.config.resources) this.logger.debug(` - Parsed ${foundScripts.length} script links`)

      const foundLinkTags = this.config.resources ? original.parseLinkTags() : []
      if (this.config.resources) this.logger.debug(` - Parsed ${foundLinkTags.length} link tags`)

      this.store.addLinks([...foundLinks, ...foundScripts, ...foundLinkTags])
    }

    // Return the two entities
    return [original, comparison]
  }
}

export default Crawler

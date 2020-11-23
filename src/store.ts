'use strict'

import Link from './link'
import Logger from './logger'

class Store {
  readonly knownLinks: Array<Link> = new Array
  readonly crawledLinks: Array<Link> = new Array

  readonly logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  addLink(link: Link): void {
    this.addLinks([link])
  }

  addLinks(links: Array<Link>): void {
    const currentLinkCount = this.knownLinks.length

    for (const link of links) {
      const knownLinkUris = this.knownLinks.map(l => l.uri)
      if (!knownLinkUris.includes(link.uri)) {
        this.knownLinks.push(link)
      }
    }

    this.logger.verbose(` > Found ${(this.knownLinks.length - currentLinkCount)} new link(s)`)
  }

  getNextLink(): Link|null {
    const crawledLinkUris = this.crawledLinks.map(l => l.uri)
    const remainingLinks = this.knownLinks.filter(l => !crawledLinkUris.includes(l.uri))

    this.logger.debug(` < ${remainingLinks.length} links remaining`)
    return remainingLinks.length > 0 ? remainingLinks[0] : null
  }

  markCrawled(link: Link): void {
    this.crawledLinks.push(link)
  }

  countKnown(): number {
    return this.knownLinks.length
  }

  countCrawled(): number {
    return this.crawledLinks.length
  }

  countRemaining(): number {
    return this.countKnown() - this.countCrawled()
  }
}

export default Store

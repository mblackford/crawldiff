'use strict'

import cliProgress, { SingleBar } from 'cli-progress'

import Config from './config'
import Link from './link'
import LinkType from './link-type'
import Store from './store'
import Record from './record'
import Crawler from './crawler'
import Logger from './logger'
import Comparer from './comparer'
import { exit } from 'process'

/**
 * What should the controller do?
 * 
 * - Keep track of running time, and stop when reached the timeout
 * - Repeatedly run the crawler if there's time and more links
 * - Show progress updates to the user
 * - Display the results after completion or timeout
 */
class Controller {
  private readonly startTime = process.hrtime()[0]

  private readonly config: Config
  private readonly logger: Logger
  private readonly record: Record
  private readonly store: Store
  private readonly crawler: Crawler
  private readonly comparer: Comparer

  private progressBar: SingleBar|null = null

  constructor(config: Config, logger: Logger) {
    this.config = config
    this.logger = logger

    this.record = new Record(logger)
    this.store = new Store(logger)
    this.crawler = new Crawler(config, logger, this.store)
    this.comparer = new Comparer(config, logger, this.record)
  }

  async start(): Promise<void> {
    // Add the starting link
    this.store.addLink(new Link(this.config.startingUri, LinkType.Page))

    // Get the first link to process
    let link = this.store.getNextLink()

    // Start the progress bar
    this.progressStart()

    // Run until out of links or time
    while (link && this.isTimeLeft()) {
      this.logger.verbose(`Crawling ${LinkType[link.type]} ${link.pathname()}`)

      const entities = await this.crawler.crawlLink(link)
      this.comparer.comparePages(entities[0], entities[1])

      link = this.store.getNextLink()

      // Update the progress bar
      this.progressUpdate()
    }

    // Clear the progress bar
    this.progressStop()

    if (link) {
      this.logger.warn(`Stopped crawling due to timeout, at least ${this.store.countRemaining()} link(s) remaining`)
    } else {
      this.logger.success(`Finished crawling ${this.store.countCrawled()} link(s) in ${this.timeElapsed()} seconds`)
    }

    // Output the results
    if (this.config.detailed) {
      this.record.reportDetailed()
    }
    this.record.reportSummary()

    // Return an error code if problems were identified
    if (this.record.didFindProblems()) {
      exit(99)
    }
  }

  private isTimeLeft(): boolean {
    return this.timeElapsed() < this.config.timeout
  }

  private timeElapsed(): number {
    return process.hrtime()[0] - this.startTime
  }

  private progressStart(): void {
    if (!this.config.verbose && !this.config.debug) {
      this.progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
      this.progressBar.start(1, 0)
    }
  }

  private progressUpdate(): void {
    this.progressBar?.update(this.store.countCrawled())
    this.progressBar?.setTotal(this.store.countKnown())
  }

  private progressStop(): void {
    this.progressBar?.stop()

    // Scroll the terminal down a couple of lines
    console.log('')
  }
}

export default Controller

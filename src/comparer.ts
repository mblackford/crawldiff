'use strict'

import similarity from 'string-similarity'

import Config from './config'
import Entity from './entity'
import Link from './link'
import Logger from './logger'
import Record from './record'

class Comparer {
  readonly config: Config
  readonly logger: Logger
  readonly record: Record

  constructor(config: Config, logger: Logger, record: Record) {
    this.config = config
    this.logger = logger
    this.record = record
  }

  comparePages(original: Entity, comparison: Entity): void {
    // Compare the status codes
    if (original.status != comparison.status) {
      const problem = `Status ${original.status} vs ${comparison.status}`
      this.logger.verbose(` *** Different ${problem} ***`)
      return this.record.recordDifference(original.link, comparison.link, problem, `HTTP Status: ${original.status}\n`, `HTTP Status: ${comparison.status}\n`);
    }

    // Calculate the similarity of the two bodies
    const score = similarity.compareTwoStrings(original.body, comparison.body)
    const simPercent = Math.round(score * 100) + '%'
    const problem = `${simPercent} similarity`
    this.logger.verbose(` *** ${problem} ***`)
    if (score < this.config.similarity) {
      return this.record.recordDifference(original.link, comparison.link, problem, original.body, comparison.body)
    }
  }
}

export default Comparer

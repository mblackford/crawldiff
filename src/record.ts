'use strict'

import Table from 'cli-table'
import cliDiff from 'cli-diff'

import Difference from './difference'
import Link from './link'
import LinkType from './link-type'
import Logger from './logger'

class Record {
  readonly differences: Array<Difference> = new Array()

  readonly logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  recordDifference(originalLink: Link, comparisonLink: Link, problem: string, original: string, comparison: string): void {
    this.differences.push(new Difference(originalLink, comparisonLink, problem, original, comparison))

    this.logger.verbose(` !!! Recorded problem with ${LinkType[originalLink.type]} ${originalLink.pathname()}`)
  }

  reportDetailed() {
    if (this.differences.length > 0) {
      this.logger.info('-'.repeat(process.stdout.columns || 80) + '\n')

      for (const difference of this.differences) {

        this.logger.info(cliDiff(
          { name: difference.originalLink.uri, content: difference.original },
          { name: difference.comparisonLink.uri, content: difference.comparison },
        ))

        this.logger.info('-'.repeat(process.stdout.columns || 80) + '\n')
      }
    }
  }

  reportSummary() {
    // Add a space before the summary
    this.logger.info('')

    if (this.differences.length > 0) {
      const middleWidth = Math.max((process.stdout.columns || 80) - 32, 30)

      const table = new Table({
        head: ['Type', 'Path', 'Problem'],
        colWidths: [8, middleWidth, 20],
      })
  
      this.differences.map(d => table.push([LinkType[d.originalLink.type], d.originalLink.pathname(), d.problem]))

      this.logger.info(table.toString())

      this.logger.error(`The crawler has identified ${this.differences.length} problem(s)! 🤕`)
    } else {
      this.logger.success(`No problems have been identified 😎`)
    }

    // And a space at the end
    this.logger.info('')
  }

  didFindProblems(): boolean {
    return this.differences.length > 0
  }
}

export default Record

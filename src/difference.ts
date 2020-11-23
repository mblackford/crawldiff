'use strict'

import Link from './link'

class Difference {
  readonly originalLink: Link
  readonly comparisonLink: Link
  readonly problem: string
  readonly original: string
  readonly comparison: string

  constructor(originalLink: Link, comparisonLink: Link, problem: string, original: string, comparison: string) {
    this.originalLink = originalLink
    this.comparisonLink = comparisonLink
    this.problem = problem
    this.original = original
    this.comparison = comparison
  }
}

export default Difference

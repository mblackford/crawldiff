'use strict'

class Config {
  readonly startingUri: string
  readonly comparisonHost: string
  readonly similarity: number
  readonly timeout: number
  readonly resources: boolean
  readonly detailed: boolean
  readonly verbose: boolean
  readonly debug: boolean

  constructor(start: string, comparison: string, similarity: number, timeout: number, resources: boolean, detailed: boolean, verbose: boolean, debug: boolean) {
    this.startingUri = start
    this.comparisonHost = comparison
    this.similarity = similarity
    this.timeout = timeout
    this.resources = resources
    this.detailed = detailed
    this.verbose = verbose
    this.debug = debug
  }
}

export default Config

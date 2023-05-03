'use strict'

class Config {
  readonly startingUri: string
  readonly comparisonHost: string
  readonly similarity: number
  readonly timeout: number
  readonly mobile: boolean
  readonly resources: boolean
  readonly detailed: boolean
  readonly verbose: boolean
  readonly debug: boolean

  constructor(start: string, comparison: string, similarity: number, timeout: number, mobile: boolean, resources: boolean, detailed: boolean, verbose: boolean, debug: boolean) {
    this.startingUri = start.replace(/\/+$/, '')
    this.comparisonHost = comparison.replace(/\/+$/, '')
    this.similarity = similarity
    this.timeout = timeout
    this.mobile = mobile
    this.resources = resources
    this.detailed = detailed
    this.verbose = verbose
    this.debug = debug
  }
}

export default Config

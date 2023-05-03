'use strict'

const packageJson = require('../package.json')
const USER_AGENT_DESKTOP = `${packageJson.name}/${packageJson.version}`
const USER_AGENT_MOBILE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'

class Config {
  readonly startingUri: string
  readonly comparisonHost: string
  readonly similarity: number
  readonly timeout: number
  readonly userAgent: string
  readonly resources: boolean
  readonly detailed: boolean
  readonly verbose: boolean
  readonly debug: boolean
  readonly warmupCache: boolean

  constructor(start: string, comparison: string, similarity: number, timeout: number, mobile: boolean, resources: boolean, detailed: boolean, verbose: boolean, debug: boolean, warmupCache: boolean) {
    this.startingUri = start.replace(/\/+$/, '')
    this.comparisonHost = comparison.replace(/\/+$/, '')
    this.similarity = similarity
    this.timeout = timeout

    if (mobile) {
      this.userAgent = USER_AGENT_MOBILE
    } else {
      this.userAgent = USER_AGENT_DESKTOP
    }
    this.resources = resources
    this.detailed = detailed
    this.verbose = verbose
    this.debug = debug
    this.warmupCache = warmupCache
  }
}

export default Config

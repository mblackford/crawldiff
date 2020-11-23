'use strict'

import chalk from 'chalk'

import Config from './config'

class Logger {
  readonly config: Config

  constructor(config: Config) {
    this.config = config
  }

  debug(...output: any) {
    if (this.config.debug) {
      console.log(chalk.grey(...output))
    }
  }

  verbose(...output: any) {
    if (this.config.verbose || this.config.debug) {
      console.log(chalk.cyan(...output))
    }
  }

  success(...output: any) {
    console.log(chalk.green(...output))
  }

  info(...output: any) {
    console.log(...output)
  }

  warn(...output: any) {
    console.log(chalk.yellow(...output))
  }

  error(...output: any) {
    console.log(chalk.bgRed(...output))
  }
}

export default Logger

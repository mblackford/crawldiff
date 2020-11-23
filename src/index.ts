#!/usr/bin/env node

'use strict'

import chalk from 'chalk'

const clear = require('clear')
const figlet = require('figlet')
const program = require('commander')

import Config from './config'
import Logger from './logger'
import Controller from './controller'

const packageJson = require('../package.json')

async function execute (start: string, comparison: string): Promise<void> {
  const config = new Config(
    start,
    comparison,
    program.similarity,
    program.timeout,
    program.resources == true,
    program.detailed == true,
    program.verbose == true,
    program.debug == true,
  )

  const logger = new Logger(config)
  logger.info(`Crawler is running for ${config.timeout}s and checking for less than ${Math.round(config.similarity * 100)}% similarity:`)
  logger.info(` - starting at ${config.startingUri}`)
  logger.info(` - comparing to host ${config.comparisonHost}`)
  logger.info('')

  logger.debug('Start:', start)
  logger.debug('Comparison:', comparison)
  logger.debug('Similarity:', program.similarity)
  logger.debug('Timeout:', program.timeout)
  logger.debug('User-Agent:', program['user-agent'])
  logger.debug('Cookies:', program.cookies)
  logger.debug('Include Resources:', program.resources)
  logger.debug('Detailed:', program.detailed)
  logger.debug('Verbose:', program.verbose)
  logger.debug('Debug:', program.debug)
  logger.debug('')

  const controller = new Controller(config, logger)
  await controller.start()
}

async function run() {
  clear()
  console.log(
    chalk.blueBright(
      figlet.textSync('crawldiff', { horizontalLayout: 'full' })
    )
  )

  program
    .name(packageJson.name)
    .version(`${packageJson.name} version ${packageJson.version}`, '-v, --version')
    .arguments('<start> <comparison>',)
    .description(packageJson.description, {
      start: 'the initial page to start crawling (e.g. https://www.example.com/)',
      comparison: 'the secondary host to compare against (e.g. new.example.com)',
    })
    .option('-s, --similarity <0.01-1.0>', 'specifiy the minimum required similarity between hosts', (n: any) => parseFloat(n), 1.0)
    .option('-t, --timeout <integer>', 'the maximum time in seconds to run the crawler', (n: any) => parseInt(n), 60)
    // .option('-u, --user-agent <string>', 'set a custom User-Agent string')
    // .option('-c, --cookies <string>', 'add a custom cookie header string to requests')
    .option('-r, --resources', 'include static resources (such as scripts and styles) in comparison')
    .option('-d, --detailed', 'report full detailed diffs for each problem')
    .option('-V, --verbose', 'provide more detailed output while running')
    .option('-D, --debug', 'provide debug level output while running')
    .action(execute)
    .parse(process.argv)
}

run()

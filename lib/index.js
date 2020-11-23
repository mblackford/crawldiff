#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const package = require('../package.json');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        clear();
        console.log(chalk.blueBright(figlet.textSync('crawldiff', { horizontalLayout: 'full' })));
        program
            .name(package.name)
            .version(package.version, '-v, --version')
            .arguments('<start> <comparison>')
            .description(package.description, {
            start: 'the initial page to start crawling (e.g. https://www.example.com/)',
            comparison: 'the secondary host to compare against (e.g. new.example.com)'
        })
            .option('-s, --similarity <0.01-1.0>', 'Specifiy the minimum required similarity between hosts', 0.5)
            .option('-t, --timeout <integer>', 'The maximum time in seconds to run the Controller', 60)
            .option('-r, --include-resources', 'Include the comparison of static text-based resources');
        program.parse();
        if (!program.start || program.comparison) {
            program.outputHelp();
        }
        console.log('Start', program.start);
        console.log('Comparison', program.comparison);
        console.log('Similarity', program.similarity);
        console.log('Timeout', program.timeout);
    });
}
run();
//# sourceMappingURL=index.js.map
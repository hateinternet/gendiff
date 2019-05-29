#!/usr/bin/env node
import commander from 'commander';

commander
  .command('gendiff <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'Output format')
  .parse(process.argv);

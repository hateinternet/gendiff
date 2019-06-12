#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = new commander.Command();

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.5.2')
  .option('-f, --format <type>', 'Output format', 'tree')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);

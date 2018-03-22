#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const { inspect } = require('util');

const excludeRecordSetTypes = ['SOA', 'NS'];

program
  .arguments('<file>')
  .option('-o, --output <output_file>', 'The file to output')
  .action(function(file) {
    console.log('issuing create zone file for input file %s', file);
    const zoneData = fs.readFileSync(file, 'UTF-8');
    const zone = JSON.parse(zoneData);

    const { ResourceRecordSets } = zone;
    const createZone = {
      Changes: ResourceRecordSets.filter(
        set => excludeRecordSetTypes.indexOf(set.Type) === -1
      ).map(set => ({
        Action: 'CREATE',
        ResourceRecordSet: set
      }))
    };
    console.log(inspect(createZone, {depth: null}));
    fs.writeFileSync(program.output, JSON.stringify(createZone));
  })
  .parse(process.argv);

# create-hosted-zone
A simple cli to transform an existing aws hosted zone into a well-formed hosted zone change resource record set batch

## Motivation
When transferring a hosted zone between AWS accounts you must also [transfer all resource records](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-migrating.html). However, the aws command `list-resource-record-sets` does not output zone data in a format that can be imported. Amazon wants you to painstakingly modify the zone data by hand to remove SOA, NS records and structure the file correctly. Using `create-hosted-zone` you can transform the zone data with a single command.

## Installation

npm
```
npm install -g create-hosted-zone
```

yarn
```
yarn global add create-hosted-zone
```

## Usage

```
❯ create-hosted-zone -h

  Usage: create-hosted-zone [options] <file>

  Options:

    -o, --output <output_file>  The file to output
    -h, --help                  output usage information
```

## Example

```
❯ aws --profile <profile> route53 list-resource-record-sets --hosted-zone-id <hosted_zone_id> > zone.txt
❯ create-hosted-zone -o zone_create.txt zone.txt
❯ aws --profile <profile> route53 change-resource-record-sets --hosted-zone-id <hosted_zone_id> --change-batch file://zone_create.txt
```

## Todo (PRs Welcome!)
- [ ] split zone files with more than 1000 records into multiple files
- [ ] split zone files with combined length of the values in all Value elements of 32,000 bytes.
- [ ] implement `aws-sdk` to download zone file for a given hosted_zone_id
- [ ] implement `aws-sdk` to change resource record sets automatically (💥 dangerous)
- [ ] compare resource records after migration
- [ ] create target hosted zone if not specified
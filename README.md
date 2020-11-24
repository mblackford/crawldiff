# crawldiff

**crawlldiff** will help with migrating websites from one system to another. Will crawl a website and compare it to another, reporting on any differences.

## Installation

You can **optionally** choose to install this tool locally, or just execute it using `npx` and npm will automatically download it on first use.

To install it globally, use:

```
  npm install -g crawldiff
```

Or as part of a specific project, use:

```
  npm install --save-dev crawldiff
```

## Configuration

No configuration necessary.

## Usage

Usage: `npx crawldiff [options] <start> <comparison>`

Crawls a website and compares each page to a different host.

Arguments:

| Argument   | Description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| start      | the initial page to start crawling (e.g. https://www.example.com/)     |
| comparison | the secondary host to compare against (e.g. https://new.example.com/ ) |

Options:

| Option                       | Description                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
|  -v, --version               | output the version number                                           |
|  -s, --similarity <0.01-1.0> | specifiy the minimum required similarity between hosts (default: 1) |
|  -t, --timeout <integer>     | the maximum time in seconds to run the crawler (default: 60)        |
|  -r, --resources             | include static resources (such as scripts and styles) in comparison |
|  -d, --detailed              | report full detailed diffs for each problem                         |
|  -V, --verbose               | provide more detailed output while running                          |
|  -D, --debug                 | provide debug level output while running                            |
|  -h, --help                  | display help for command                                            |


## Copyright / License

See [LICENSE](LICENSE)

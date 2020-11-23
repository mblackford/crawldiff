About
-----

A great tool to help with migrating websites from one system to another. Will crawl a website and compare it to another, reporting on any differences.

Installation
------------

Add this to your `composer.json` file:

```
  npm install crawldiff
```

Configuration
-------------

No configuration necessary.


Usage
-----

Usage: npx crawldiff [options] <start> <comparison>

Crawls a website and compares each page to a different host.

Arguments:

| start     | the initial page to start crawling (e.g. https://www.example.com/) |
| comparison | the secondary host to compare against (e.g. new.example.com)      |

Options:

|  -v, --version               | output the version number                                           |
|  -s, --similarity <0.01-1.0> | specifiy the minimum required similarity between hosts (default: 1) |
|  -t, --timeout <integer>     | the maximum time in seconds to run the crawler (default: 60)        |
|  -r, --resources             | include static resources (such as scripts and styles) in comparison |
|  -d, --detailed              | report full detailed diffs for each problem                         |
|  -V, --verbose               | provide more detailed output while running                          |
|  -D, --debug                 | provide debug level output while running                            |
|  -h, --help                  | display help for command                                            |


Copyright / License
-------------------

See [LICENSE](LICENSE)

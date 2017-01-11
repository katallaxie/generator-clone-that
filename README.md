[![taylor swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)
[![Build Status](https://travis-ci.org/katallaxie/generator-clone-that.svg?branch=master)](https://travis-ci.org/katallaxie/generator-clone-that)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Clone That Generator

> this is a [Yeoman](http://yeoman.io) generator which allows you to clone a project @ GitHub

## Requirements

This only requires `npm -g i yo`.

## Installation

> all generators are global modules and prefixed with `generator-`

```
npm -g i generator-clone-that
```

## Usage

> have \u1F389

```
mkdir my-new-app && cd $_
```

and

```
yo clone-that https://github.com/<username>/<repo>
```

## Arguments

### url
Pase in the Url of the project @ GitHub

Example
```
yo clone that https://github.com/<username>/<repo>
```

## Options

### skip-install
Do not automatically install dependencies.

Example
```
yo clone that https://github.com/<username>/<repo> --skip-install
```

### skip-cache
We use the cache directory of `yeoman-remote` and fetch the most recent version of `master`.

Example
```
yo clone that https://github.com/<username>/<repo> --skip-cache
```

---
Coded by [@katallaxie](http://twitter.com/katallaxie)
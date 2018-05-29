![Contao Generator Logo](https://i.imgur.com/ClmcR4q.png)

# Contao Generator [![NPM version][npm-image]][npm-url]
> Yeoman generator for Contao 4.4+ with SCSS and ES6 via WebPack

## Features

 * SCSS compilation via WebPack
 * ES6 support via Babel/WebPack
 * Basic theme scaffold included
 * Installs jQuery, React, Vue, lodash and many more JS-libs, if you want to
 * [Integrated local development server just for Contao 4](https://github.com/DieSchittigs/contao-dev-server)
 * Batteries included

## Screencast

![Screencast](https://i.imgur.com/wvgQ2qg.gif)

## Prerequisites

 * Mac OS or Linux*
 * PHP 7.1+
 * Node.js 8.9+
 * MySQL Server

\* Windows support can be achieved through the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

## Installation

First, install [Yeoman](http://yeoman.io) and generator-contao using [npm](https://www.npmjs.com/).

```bash
npm i -g yo
npm i -g @dieschittigs/generator-contao
```

Then generate your new project:

```bash
yo @dieschittigs/contao
```

That's it!

## Usage

This generator provides tasks for compilation via WebPack, source-file watching, syncing, deployment and the local dev server.  
See a list of all tasks by entering:

```bash
npm run
```

## License

ISC © [Die Schittigs](https://www.dieschittigs.de)


[npm-image]: https://badge.fury.io/js/%40dieschittigs%2Fgenerator-contao.svg
[npm-url]: https://npmjs.org/package/@dieschittigs/generator-contao

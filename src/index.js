import Generator from 'yeoman-generator';
import Chalk from 'chalk';
import Path from 'path';
import Proc from 'process';
import Rimraf from 'rimraf';
// import S from 'underscore.string';
import Yosay from 'yosay';

import Remote from 'yeoman-remote';
import GUrl from 'parse-github-url';

// config
import {
  testUrl,
  yell
} from './helpers';
import {
  defaultProject,
  npm
} from './config';

class PrebootGenerator extends Generator {

  constructor(args, options) {
    super(args, options);

    // self
    const g = this;

    g.argument('url', {
      desc: `Pase in the Url of the project @ GitHub`,
      type: String,
      required: false
    });

    g.options['url'] = g.options['url'] || defaultProject;
    g.project = {};

  }

  // this is first priority
  // see: http://yeoman.io/authoring/running-context.html
  get initializing() {

    return {
      cleaning() {
        // self
        const g = this;

        // return a promise to stop the run loop
        const done = g.async();

        if (!g.options['cache']) {
          const counter = yell('Cleaning cache ...');
          counter.start();

          Rimraf(Remote.cacheRoot(), () => {
            counter.stop();
            done();
          });
        } else { // we should avoid else
          done();
        }

      },

      hello() {
        // self
        const g = this;

        // say yo!
        g.log(Yosay(`Greetings! I will help you to clone a Github project. E.g. Angular 2 Preboot.`));
      },

    };

  }

  get prompting() {

    return {
      async projectName() {

        if (this.options['url'] !== defaultProject &&
          testUrl(this.options['url']))
          return;

        // self
        const g = this;

        try {
          const prompt = [{
            type: 'input',
            name: 'url',
            message: `Paste in the Url of the project @ GitHub?`,
            default: g.options['url'],
            store: true,
          }];
          const {
            url
          } = await g.prompt(prompt);
          g.options['url'] = url;
        } catch (err) {
          throw new Error(Chalk.red(`${err.message}`));
        }

      },

      async gitUserName() {
        // self
        const g = this;

        try {
          const prompt = [{
            type: 'input',
            name: 'name',
            message: `What is your name, or alias?`,
            default: this.user.git.name(),
            store: true,
          }];
          const {
            name
          } = await g.prompt(prompt);
          g.options['name'] = name;
        } catch (err) {
          throw new Error(Chalk.red(`${err.message}`));
        }
      },

      async gitUserEmail() {
        // self
        const g = this;

        try {
          const prompt = [{
            type: 'input',
            name: 'email',
            message: `What is your email?`,
            default: g.user.git.email(),
            store: g,
          }];
          const {
            email
          } = await g.prompt(prompt);
          g.options.email = email;
        } catch (err) {
          throw new Error(Chalk.red(`${err.message}`));
        }

      }

    };
  }

  get configuring() {
    return {

      parseUrl() {
        // self
        const g = this;

        g.git = GUrl(g.options['url']);
      }

    };
  };

  get default() {
    return {};
  }

  get writing() {

    return {
      staging() {
        // self
        const g = this;

        // promise to me, sir...
        const done = g.async();

        const counter = yell(`Staging ...`);
        counter.start();

        const {
          owner,
          name,
          branch
        } = g.git;

        Remote(owner, name, branch || '', (err, cached) => {

          if (err)
            throw new Error(Chalk.red(`${err}`));

          // we have a different root for the sources
          g.sourceRoot(Path.join(cached));

          g.fs.copy(
            g.templatePath('**/*'),
            g.destinationPath(''), {
              globOptions: {
                dot: true,
              },
            },
          );

          if (g.fs.exists('package.json')) {
            g.isNpm = true;
          }

          if (g.isNpm) {

            counter.message = `Patching ${Chalk.yellow('package.json')} ...`;

            g.fs.extendJSON(
              g.destinationPath('package.json'), {
                author: {
                  name: this.options.name,
                  email: this.options.email,
                },
                bugs: {
                  url: '',
                },
                description: this.options.description,
                homepage: '',
                repository: {
                  type: 'git',
                  url: '',
                },
                version: '0.0.1',
              },
            );

          }

          counter.stop();

          done();
        });
      },

      npm() {
        // self
        const g = this;

        // npm
        if (g.isNpm && !this.options['skip-install']) {
          // new counter
          const cl = console.log;
          console.log = () => {};

          const counter = yell(`Installing dependencies ...`);
          counter.start();

          this.runInstall('npm', '', npm, () => {
            console.log = cl;
            counter.stop();
          });
        } else {
          this.log(`\nPlease run ${chalk.yellow.bold('npm install')}.
            \nAfterwards run ${chalk.yellow.bold('npm start')}`);
        }
      }

    };
  }

}

// exporting generator as CommonJS module
module.exports = PrebootGenerator;

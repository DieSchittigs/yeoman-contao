'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var inquirer = require('inquirer');

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

module.exports = class extends Generator {
  prompting() {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the Die Schittigs ' + chalk.red('Contao') + ' generator!')
    );

    const options = {
      installLatestNode: 'Install Node.js 8.x via apt',
      installLatestPhp: 'Install the PHP 7.2 via apt',
      installPhpLibs: 'Install required PHP libs via apt',
      installYarn: 'Install Yarn package manager via apt',
      installComposer: 'Install Composer package manager',
      installLocalDevServer: 'Install local development server (PHP 5.6+ required)',
      installComposerLocal: 'Install composer packages locally',
      installRemoteSync: 'Use Remote Sync, to upload code automatically',
      installDploy: 'Use Dploy for easy deployment to a live system'
    };

    this.props = {};
    Object.keys(options).forEach(key => {
      this.props[key] = false;
    });

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'contaoVersion',
          message: 'What version of Contao shell we use?',
          default: '4.4'
        },
        {
          type: 'input',
          name: 'theme',
          message: 'What should your theme be suffixed?',
          default: new Date().getFullYear()
        },
        {
          type: 'checkbox',
          message: 'Setup',
          name: 'config',
          choices: [
            new inquirer.Separator(' = Prerequisites (Ubuntu only) = '),
            {
              name: options.installLatestNode,
              checked: false
            },
            {
              name: options.installYarn,
              checked: false
            },
            {
              name: options.installLatestPhp,
              checked: false
            },
            {
              name: options.installPhpLibs,
              checked: false
            },
            {
              name: options.installComposer,
              checked: false
            },
            new inquirer.Separator(' = Local Development = '),
            {
              name: options.installLocalDevServer,
              checked: true
            },
            {
              name: options.installComposerLocal,
              checked: true
            },
            new inquirer.Separator(' = Sync and Deployment = '),
            {
              name: options.installRemoteSync,
              checked: true
            },
            {
              name: options.installDploy,
              checked: true
            }
          ]
        }
      ])
      .then(answers => {
        this.props.contaoVersion = answers.contaoVersion;
        this.props.theme = answers.theme;
        answers.config.forEach(opt => {
          this.props[getKeyByValue(options, opt)] = true;
        });
        let questions = [];
        if (this.props.installRemoteSync) {
          questions = questions.concat([
            {
              type: 'input',
              name: 'preview_ftp_transport',
              message: 'Preview server protocol? (ftp or sftp)',
              default: 'ftp'
            },
            {
              type: 'input',
              name: 'preview_ftp_hostname',
              message: 'Preview server hostname?',
              default: ''
            },
            {
              type: 'input',
              name: 'preview_ftp_target',
              message: 'Preview server target path?',
              default: '/'
            },
            {
              type: 'input',
              name: 'preview_ftp_username',
              message: 'Preview server username?',
              default: ''
            },
            {
              type: 'input',
              name: 'preview_ftp_password',
              message: 'Preview server password?',
              default: ''
            }
          ]);
        }
        if (this.props.installDploy) {
          questions = questions.concat([
            {
              type: 'input',
              name: 'live_ftp_scheme',
              message: 'Live server protocol? (ftp or sftp)',
              default: 'ftp'
            },
            {
              type: 'input',
              name: 'live_ftp_host',
              message: 'Live server host?',
              default: ''
            },
            {
              type: 'input',
              name: 'live_ftp_port',
              message: 'Live server port?',
              default: '21'
            },
            {
              type: 'input',
              name: 'live_ftp_path_remote',
              message: 'Live server remote path?',
              default: '/'
            },
            {
              type: 'input',
              name: 'live_ftp_user',
              message: 'Live server username?',
              default: ''
            },
            {
              type: 'input',
              name: 'live_ftp_pass',
              message: 'Live server password?',
              default: ''
            }
          ]);
        }
        if (questions.length > 0) {
          return inquirer.prompt(questions).then(answers => {
            for (let key in answers) {
              this.props[key] = answers[key];
            }
          });
        }
        done();
      });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('.*'), this.destinationPath(), this.props);
    this.fs.copyTpl(this.templatePath('*'), this.destinationPath(), this.props);
    this.fs.copy(this.templatePath('app/**'), this.destinationPath('app'));
    this.fs.copy(
      this.templatePath('src/**'),
      this.destinationPath('src/'.concat(this.props.theme))
    );
    this.fs.copy(
      this.templatePath('templates/templates_/.gitkeep'),
      this.destinationPath(
        'templates/templates_'.concat(this.props.theme).concat('/.gitkeep')
      )
    );
    this.fs.copyTpl(this.templatePath('_web/**'), this.destinationPath('web'));
  }

  _installNodePackages() {
    const packages = [
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-decorators-legacy',
      'babel-preset-env',
      'babel-preset-react',
      'babel-preset-stage-0',
      'cross-env',
      'laravel-mix',
      'webpack',
      'lodash',
      'jquery'
    ];
    if (this.props.installRemoteSync) packages.push('remote-sync-ds');
    if (this.props.installDploy) packages.push('dploy');
    if (this.props.installLocalDevServer)
      packages.push('@dieschittigs/contao-dev-server');
    this.yarnInstall(packages, { dev: true });
  }

  _installComposerLocal() {
    if (!this.props.installComposerLocal) return;
    this.spawnCommandSync('composer', ['update']);
  }

  _installLatestPhp() {
    if (!this.props.installLatestPhp) return;
    this.spawnCommandSync('sh', [__dirname + '/scripts/install_php.sh']);
  }

  _installPhpLibs() {
    if (!this.props.installPhpLibs) return;
    this.spawnCommandSync('sh', [__dirname + '/scripts/install_phplibs.sh']);
  }

  _installComposer() {
    if (!this.props.installComposer) return;
    this.spawnCommandSync('sh', [__dirname + '/scripts/install_composer.sh']);
  }

  _installLatestNode() {
    if (!this.props.installLatestNode) return;
    this.spawnCommandSync('sh', [__dirname + '/scripts/install_node.sh']);
  }

  install() {
    this._installLatestNode();
    this._installNodePackages();
    this._installLatestPhp();
    this._installPhpLibs();
    this._installComposer();
    this._installComposerLocal();
  }

  end() {
    if (!this.props.installRemoteSync) this.fs.delete('.remote-sync.json');
    if (!this.props.installDploy) this.fs.delete('dploy.yaml');
    console.log('All done! Enter `yarn run` to see which tasks are available.');
  }
};

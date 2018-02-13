'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const inquirer = require('inquirer');
const pjson = require(path.join(__dirname, '../../package.json'));

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

module.exports = class extends Generator {
    prompting() {
        var done = this.async();
        // Have Yeoman greet the user.
        this.log(
            yosay('Welcome to the Die Schittigs ' + chalk.red('Contao') + ' generator v'+ pjson.version +'!')
        );
        
        const options = {
            installLocalDevServer: 'Install local development server (PHP 7.1+ required)',
            installComposerLocal: 'Install composer packages locally',
            installRemoteSync: 'Use Remote Sync, to upload code automatically',
            installDploy: 'Use Dploy for easy deployment to a live system'
        };
        
        this.props = {
            previewInDploy: false
        };
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
                name: 'projectName',
                message: 'What is the sites name?',
                default: 'My Awesome Site'
            },
            {
                type: 'input',
                name: 'theme',
                message: 'What should your theme be suffixed with?',
                default: new Date().getFullYear()
            },
            {
                type: 'checkbox',
                message: 'Setup',
                name: 'config',
                choices: [
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
                        checked: false
                    },
                    {
                        name: options.installDploy,
                        checked: false
                    }
                ]
            }
        ])
        .then(answers => {
            this.props.contaoVersion = answers.contaoVersion;
            this.props.theme = answers.theme;
            this.props.projectName = answers.projectName;
            answers.config.forEach(opt => {
                this.props[getKeyByValue(options, opt)] = true;
            });
            let questions = [];
            if (this.props.installRemoteSync) {
                questions = questions.concat([
                    {
                        type: 'input',
                        name: 'preview_ftp_scheme',
                        message: 'Preview server protocol? (ftp or sftp)',
                        default: 'ftp'
                    },
                    {
                        type: 'input',
                        name: 'preview_ftp_host',
                        message: 'Preview server hostname?',
                        default: 'ftp.example.org'
                    },
                    {
                        type: 'input',
                        name: 'preview_ftp_port',
                        message: 'Preview server port?',
                        default: '21'
                    },
                    {
                        type: 'input',
                        name: 'preview_ftp_path_remote',
                        message: 'Preview server target path?',
                        default: '/'
                    },
                    {
                        type: 'input',
                        name: 'preview_ftp_user',
                        message: 'Preview server username?',
                        default: 'ftpuser'
                    },
                    {
                        type: 'input',
                        name: 'preview_ftp_pass',
                        message: 'Preview server password?',
                        default: 'ftppass'
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
                        default: 'ftp.example.org'
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
                        default: 'ftpuser'
                    },
                    {
                        type: 'input',
                        name: 'live_ftp_pass',
                        message: 'Live server password?',
                        default: 'ftppass'
                    }
                ]);
            }
            if (this.props.installRemoteSync && this.props.installDploy) {
                questions.push({
                    type: 'confirm',
                    name: 'previewInDploy',
                    message: 'Shell we add the preview server as an additional target for Dploy?',
                    default: true
                });
            }
            if (questions.length > 0) {
                return inquirer.prompt(questions).then(answers => {
                    for (let key in answers) {
                        this.props[key] = answers[key];
                    }
                });
            }
        }).then(done);
    }
    
    writing() {
        this.fs.copyTpl(this.templatePath('.*'), this.destinationPath(), this.props);
        this.fs.copyTpl(this.templatePath('*'), this.destinationPath(), this.props);
        this.fs.copy(this.templatePath('app/.gitkeep'), this.destinationPath('app/.gitkeep'));
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
        this.fs.copy(
            this.templatePath('files/theme_/.public'),
            this.destinationPath(
                'files/theme_'.concat(this.props.theme).concat('/.public')
            )
        );
        this.fs.copyTpl(
            this.templatePath('templates/template.sql'),
            this.destinationPath('templates/template.sql'),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath('system/**'),
            this.destinationPath('system'),
            this.props
        );
        this.fs.copy(this.templatePath('gitignore/_gitignore'), this.destinationPath('.gitignore'));
        this.fs.copyTpl(this.templatePath('web/**'), this.destinationPath('web'), this.props);
    }
    
    _installNodePackages() {
        const packages = [
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-decorators-legacy',
            'babel-preset-env',
            'babel-preset-react',
            'babel-preset-stage-0',
            'cross-env',
            'stmux',
            'node-sass',
            'webpack',
            'style-loader',
            'css-loader',
            'sass-loader',
            'babel-loader',
            'babel-core',
            'copy-webpack-plugin',
            'extract-text-webpack-plugin',
            'lodash',
            'jquery'
        ];
        if (this.props.installRemoteSync) packages.push('remote-sync-ds');
        if (this.props.installDploy) packages.push('dploy');
        if (this.props.installLocalDevServer)
        packages.push('@dieschittigs/contao-dev-server');
        this.npmInstall(packages, { 'save-dev': true });
    }
    
    _installComposerLocal() {
        if (!this.props.installComposerLocal) return;
        this.spawnCommandSync('php', [path.join(__dirname, 'scripts/install_composer.php')]);
        this.spawnCommandSync('php', ['composer.phar', 'install']);
    }
    
    install() {
        this._installNodePackages();
        this._installComposerLocal();
    }
    
    end() {
        if (!this.props.installRemoteSync) this.fs.delete('.remote-sync.json');
        if (!this.props.installDploy) this.fs.delete('dploy.yaml');
        console.log('\n\n    All done! Enter `npm run` to see which tasks are available.\n\n');
    }
};

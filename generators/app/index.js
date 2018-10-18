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
            installComposerLocal: 'Install composer packages',
            installContaoManager: 'Install Contao Manager',
            installRemoteSync: 'Setup Remote Sync',
            installDploy: 'Setup Dploy',
            installPHPloy: 'Setup PHPloy'
        };

        const npmOptions = [
            { value: 'jquery', title: 'jQuery - Still kickin\'', checked: true },
            { value: 'slick-carousel', title: 'Slick - The last carousel you\'ll ever need', checked: true },
            { value: 'stickyfilljs', title: 'StickFillJS - CSS position: sticky Polyfill', checked: true },
            { value: 'smooth-scroll', title: 'Smooth Scroll - Animate scrolling to anchor links', checked: true },
            { value: 'magnific-popup', title: 'Magnific Popup - Fast, light and responsive lightbox plugin for jQuery', checked: true },
            { value: 'lodash', title: 'Lodash - A JavaScript utility library', checked: false },
            { value: 'moment', title: 'Moment.js - Parse, validate, manipulate, and display dates and times', checked: false },
            { value: 'axios', title: 'Axios - Promise based HTTP client', checked: false },
            { value: 'font-awesome', title: 'Font Awesome - The iconic font and CSS framework', checked: false },
            { value: 'react react-dom', title: 'React - A library for building UIs', checked: false },
            { value: 'mobx mobx-react', title: 'Mobx - Simple, scalable state management', checked: false },
            { value: 'vue', title: 'Vue.js - The Progressive JavaScript Framework', checked: false }
        ];

        const contaoOptions = [
            { value: 'news-bundle', title: 'News', checked: true },
            { value: 'calendar-bundle', title: 'Calendar', checked: true },
            { value: 'comments-bundle', title: 'Comments', checked: true },
            { value: 'faq-bundle', title: 'FAQ', checked: true },
            { value: 'newsletter-bundle', title: 'Newsletter', checked: true }
        ];
        
        this.props = {
            deployToRemoteSync: false,
            npmOptions: []
        };
        Object.keys(options).forEach(key => {
            this.props[key] = false;
        });

        inquirer.prompt([
            {
                type: 'input',
                name: 'contaoVersion',
                message: 'What version of Contao shall we use?',
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
                    new inquirer.Separator(' = Local development = '),
                    {
                        name: options.installLocalDevServer,
                        checked: true
                    },
                    {
                        name: options.installComposerLocal,
                        checked: true
                    },
                    {
                        name: options.installContaoManager,
                        checked: true
                    },
                    new inquirer.Separator(' = Synchronization = '),
                    {
                        name: options.installRemoteSync,
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
            return inquirer.prompt([
                {
                    type: 'list',
                    message: 'Local deployment options',
                    name: 'deployment',
                    choices: [
                        {
                            name: 'None',
                            checked: true
                        },
                        {
                            name: options.installDploy,
                            checked: false
                        },
                        {
                            name: options.installPHPloy,
                            checked: false
                        }
                    ]
                }
            ]);
        })
        .then(answers => {
            if(answers.deployment != 'None'){
                this.props[getKeyByValue(options, answers.deployment)] = true;
            }
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
            if (this.props.installDploy || this.props.installPHPloy) {
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
            if (this.props.installRemoteSync && (this.props.installDploy || this.props.installPHPloy)) {
                questions.push({
                    type: 'confirm',
                    name: 'deployToRemoteSync',
                    message: 'Shell we add the preview server as an additional target for Dploy?',
                    default: true
                });
            }
            if (questions.length > 0) {
                return inquirer.prompt(questions);
            }
        }).then(answers => {
            for (let key in answers) {
                this.props[key] = answers[key];
            }
            const choices = contaoOptions.map((option)=>{
                return { name: option.title, checked: option.checked, value: option.value }
            });
            return inquirer.prompt([
                {
                    type: 'checkbox',
                    message: 'Which Contao Bundles should be installed?',
                    name: 'contaoOptions',
                    choices
                }
            ]).then(answers => {
                this.props.contaoOptions = answers.contaoOptions;
            });
        }).then(answers => {
            for (let key in answers) {
                this.props[key] = answers[key];
            }
            const choices = npmOptions.map((option)=>{
                return { name: option.title, checked: option.checked, value: option.value }
            });
            return inquirer.prompt([
                {
                    type: 'checkbox',
                    message: 'Additional JS libraries',
                    name: 'npmOptions',
                    choices
                }
            ]).then(answers => {
                this.props.npmOptions = answers.npmOptions;
            });
        }).then(done);
    }
    
    writing() {
        this.fs.copyTpl(
            this.templatePath('.*'),
            this.destinationPath(),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath('*'),
            this.destinationPath(),
            this.props
        );
        this.fs.copy(
            this.templatePath('app/.gitkeep'),
            this.destinationPath('app/.gitkeep')
        );
        this.fs.copyTpl(
            this.templatePath('src/**'),
            this.destinationPath('src/'.concat(this.props.theme)),
            this.props
        );
        this.fs.copy(
            this.templatePath('src/*/.*'),
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
        this.fs.copy(
            this.templatePath('files/deleteme/*'),
            this.destinationPath(
                'files/deleteme'
            )
        );
        this.fs.copy(
            this.templatePath('files/deleteme/.*'),
            this.destinationPath(
                'files/deleteme'
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
        this.fs.copy(
            this.templatePath('config/_gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copyTpl(
            this.templatePath('web/icons_/*'),
            this.destinationPath('web/icons_'.concat(this.props.theme)),
            this.props
        );
        this.fs.copy(
            this.templatePath('web/*'),
            this.destinationPath('web')
        );
        if (this.props.installRemoteSync){
            this.fs.copyTpl(
                this.templatePath('config/_remote-sync.json'),
                this.destinationPath('.remote-sync.json'),
                this.props
            );
        }
        if (this.props.installDploy) {
            this.fs.copyTpl(
                this.templatePath('config/dploy.yaml'),
                this.destinationPath('dploy.yaml'),
                this.props
            );
        }
        if (this.props.installPHPloy) {
            this.fs.copyTpl(
                this.templatePath('config/phploy.ini'),
                this.destinationPath('phploy.ini'),
                this.props
            );
        }
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
            'webpack-cli',
            'style-loader',
            'css-loader',
            'sass-loader',
            'babel-loader@7',
            'file-loader',
            'url-loader',
            'babel-core',
            'copy-webpack-plugin',
            'extract-text-webpack-plugin@next'
        ];
        let npmOptions = [];
        this.props.npmOptions.forEach(npmOption => {
            npmOptions = npmOptions.concat(npmOption.split(' '));
        });
        if (this.props.installRemoteSync) packages.push('remote-sync-ds');
        if (this.props.installDploy) packages.push('dploy');
        if (this.props.installLocalDevServer)packages.push('@dieschittigs/contao-dev-server');
        this.npmInstall(packages, { 'save-dev': true });
        if(npmOptions.length) this.npmInstall(npmOptions, { 'save': true });
    }
    
    _installComposerLocal() {
        if (!this.props.installComposerLocal) return;
        this.spawnCommandSync('php', [path.join(__dirname, 'scripts/install_composer.php')]);
        this.spawnCommandSync('php', ['composer.phar', 'install']);
    }

    _installContaoManager() {
        if (!this.props.installContaoManager) return;
        this.spawnCommandSync('php', [path.join(__dirname, 'scripts/install_contao-manager.php')]);
    }
    
    install() {
        this._installNodePackages();
        this._installComposerLocal();
        this._installContaoManager();
    }
    
    end() {
        console.log('\n\n    All done! Enter `npm run` to see which tasks are available.\n\n');
    }
};

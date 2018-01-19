'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('Die Schittigs Contao') + ' generator!'
        ));
        
        const prompts = [
            {
                type: 'confirm',
                name: 'installComposerLocal',
                message: 'Would you like to install the Composer packages locally?',
                default: false
            },
            {
                type: 'input',
                name: 'contaoVersion',
                message: 'What version of Contao shell we use?',
                default: '4.4'
            },
            {
                type: 'input',
                name: 'theme',
                message: 'What should your theme be called?',
                default: new Date().getFullYear()
            },
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
            },
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
            },
        ];
        
        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }
    
    writing() {
        const templateOpts = {
            theme: this.props.theme,
            contaoVersion: this.props.contaoVersion,
            preview_ftp_transport: this.props.preview_ftp_transport,
            preview_ftp_hostname: this.props.preview_ftp_hostname,
            preview_ftp_target: this.props.preview_ftp_target,
            preview_ftp_username: this.props.preview_ftp_username,
            preview_ftp_password: this.props.preview_ftp_password,
            live_ftp_scheme: this.props.live_ftp_scheme,
            live_ftp_host: this.props.live_ftp_host,
            live_ftp_port: this.props.live_ftp_port,
            live_ftp_user: this.props.live_ftp_user,
            live_ftp_pass: this.props.live_ftp_pass,
            live_ftp_path_remote: this.props.live_ftp_path_remote
        };
        this.fs.copyTpl(
            this.templatePath('.*'),
            this.destinationPath(),
            templateOpts
        );
        this.fs.copyTpl(
            this.templatePath('*'),
            this.destinationPath(),
            templateOpts
        );
        this.fs.copy(
            this.templatePath('app/**'),
            this.destinationPath('app')
        );
        this.fs.copy(
            this.templatePath('src/**'),
            this.destinationPath('src/'.concat(this.props.theme))
        );
        this.fs.copy(
            this.templatePath('templates/templates_/.gitkeep'),
            this.destinationPath('templates/templates_'.concat(this.props.theme).concat('/.gitkeep'))
        );
        this.fs.copyTpl(
            this.templatePath('web/**'),
            this.destinationPath('web')
        );
    }

    installNodePackages() {
        this.yarnInstall([
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-decorators-legacy',
            'babel-preset-env',
            'babel-preset-react',
            'babel-preset-stage-0',
            'cross-env',
            'dploy',
            'laravel-mix',
            'remote-sync-ds',
            'lodash',
            'jquery',
            'axios'
        ], { 'dev': true });
    }

    installComposerPackages() {
        if(!this.props.installComposerLocal) return;
        this.spawnCommand('composer', ['update']);
    }
    
    install() {
        this.config.save();
        this.installNodePackages();
        this.installComposerPackages();
    }

    end(){
        if(this.props.preview_ftp_hostname){
            this.spawnCommand('yarn', ['watchsync']);
        } else {
            this.spawnCommand('yarn', ['watch']);
        }
    }
};

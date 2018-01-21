#!/bin/sh

echo 'Contao Generator: Installing PHP'

sudo apt-get install python-software-properties
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install -y php7.2

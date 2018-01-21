#!/bin/sh

echo 'Contao Generator: Installing PHP'

sudo apt-get update && sudo apt-get install python-software-properties
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install -y php7.2 php7.2-mysql php7.2-curl php7.2-json php7.2-cgi php7.2-gd php7.2-dom php7.2-intl php7.2-mbstring php7.2-zip php7.2-xml

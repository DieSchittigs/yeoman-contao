<?php

echo "Installing Composer.phar" . PHP_EOL . PHP_EOL;
copy('https://getcomposer.org/installer', 'composer-setup.php');
$chksum = trim(
    file_get_contents('https://composer.github.io/installer.sig')
);
if (hash_file('SHA384', 'composer-setup.php') === $chksum) {
    echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php');
} echo PHP_EOL;
echo `php composer-setup.php`;
unlink('composer-setup.php');

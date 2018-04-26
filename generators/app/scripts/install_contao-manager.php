<?php

echo "Installing Contao Manager" . PHP_EOL . PHP_EOL;
copy('https://download.contao.org/contao-manager.phar', 'web/contao-manager.phar.php');
echo PHP_EOL . PHP_EOL . "    Copied Contao Manager to web/contao-manager.phar.php" . PHP_EOL . PHP_EOL;

INSERT INTO `tl_article` (`id`, `pid`, `sorting`, `tstamp`, `title`, `alias`, `author`, `inColumn`, `keywords`, `showTeaser`, `teaserCssID`, `teaser`, `printable`, `customTpl`, `protected`, `groups`, `guests`, `cssID`, `published`, `start`, `stop`) VALUES (1, 2, 128, 1518521890, 'Home', 'index', 1, 'main', NULL, '', '', NULL, '', '', '', NULL, '', '', '1', '', '');
INSERT INTO `tl_content` (`id`, `pid`, `ptable`, `sorting`, `tstamp`, `type`, `headline`, `text`, `addImage`, `overwriteMeta`, `singleSRC`, `alt`, `imageTitle`, `size`, `imagemargin`, `imageUrl`, `fullsize`, `caption`, `floating`, `html`, `listtype`, `listitems`, `tableitems`, `summary`, `thead`, `tfoot`, `tleft`, `sortable`, `sortIndex`, `sortOrder`, `mooHeadline`, `mooStyle`, `mooClasses`, `highlight`, `code`, `url`, `target`, `titleText`, `linkTitle`, `embed`, `rel`, `useImage`, `multiSRC`, `orderSRC`, `useHomeDir`, `perRow`, `perPage`, `numberOfItems`, `sortBy`, `metaIgnore`, `galleryTpl`, `customTpl`, `playerSRC`, `youtube`, `vimeo`, `posterSRC`, `playerSize`, `autoplay`, `sliderDelay`, `sliderSpeed`, `sliderStartSlide`, `sliderContinuous`, `cteAlias`, `articleAlias`, `article`, `form`, `module`, `protected`, `groups`, `guests`, `cssID`, `invisible`, `start`, `stop`, `com_order`, `com_perPage`, `com_moderate`, `com_bbcode`, `com_disableCaptcha`, `com_requireLogin`, `com_template`) VALUES (1, 1, 'tl_article', 128, 1518527694, 'text', 'a:2:{s:4:\"unit\";s:2:\"h1\";s:5:\"value\";s:16:\"Hey there :&#41;\";}', '<p>You have successfully installed Contao!</p>', '', '', NULL, '', '', '', '', '', '', '', 'above', NULL, '', NULL, NULL, '', '', '', '', '', 0, 'ascending', '', '', '', '', NULL, '', '', '', '', '', '', '', NULL, NULL, '', 4, 0, 0, '', '', '', '', NULL, '', '', NULL, '', '', 0, 300, 0, '', 0, 0, 0, 0, 0, '', NULL, '', 'a:2:{i:0;s:0:\"\";i:1;s:0:\"\";}', '', '', '', 'ascending', 0, '', '', '', '', 'com_default');
INSERT INTO `tl_layout` (`id`, `pid`, `tstamp`, `name`, `rows`, `headerHeight`, `footerHeight`, `cols`, `widthLeft`, `widthRight`, `sections`, `framework`, `stylesheet`, `external`, `orderExt`, `loadingOrder`, `combineScripts`, `modules`, `template`, `doctype`, `webfonts`, `viewport`, `titleTag`, `cssClass`, `onload`, `head`, `addJQuery`, `jSource`, `jquery`, `addMooTools`, `mooSource`, `mootools`, `picturefill`, `analytics`, `scripts`, `script`, `static`, `width`, `align`, `newsfeeds`, `calendarfeeds`) VALUES (1, 1, 1518532413, 'Default', '2rwh', 'a:2:{s:4:\"unit\";s:0:\"\";s:5:\"value\";s:0:\"\";}', '', '1cl', 'a:2:{s:4:\"unit\";s:0:\"\";s:5:\"value\";s:0:\"\";}', '', 'a:1:{i:0;a:4:{s:5:\"title\";s:0:\"\";s:2:\"id\";s:0:\"\";s:8:\"template\";s:13:\"block_section\";s:8:\"position\";s:3:\"top\";}}', '', NULL, NULL, 'a:1:{i:0;s:16:\"%�����X���A��\";}', 'external_first', '', 'a:2:{i:0;a:3:{s:3:\"mod\";s:1:\"1\";s:3:\"col\";s:6:\"header\";s:6:\"enable\";s:1:\"1\";}i:1;a:3:{s:3:\"mod\";s:1:\"0\";s:3:\"col\";s:4:\"main\";s:6:\"enable\";s:1:\"1\";}}', 'fe_page', 'html5', '', 'width=device-width, initial-scale=1.0, user-scalable=no', '', '', '', '<link rel=\"stylesheet\" type=\"text/css\" href=\"/files/theme_<%= theme %>/css/screen.css\" media=\"all\">', '', '', NULL, '', 'moo_local', NULL, '', NULL, NULL, '<script src=\"/files/theme_<%= theme %>/js/script.js\"></script>', '', '', 'center', NULL, NULL);
INSERT INTO `tl_module` (`id`, `pid`, `tstamp`, `name`, `headline`, `type`, `levelOffset`, `showLevel`, `hardLimit`, `showProtected`, `defineRoot`, `rootPage`, `navigationTpl`, `customTpl`, `pages`, `orderPages`, `showHidden`, `customLabel`, `autologin`, `jumpTo`, `redirectBack`, `cols`, `editable`, `memberTpl`, `form`, `queryType`, `fuzzy`, `contextLength`, `totalLength`, `perPage`, `searchType`, `searchTpl`, `inColumn`, `skipFirst`, `loadFirst`, `size`, `transparent`, `flashvars`, `altContent`, `source`, `singleSRC`, `url`, `interactive`, `flashID`, `flashJS`, `imgSize`, `useCaption`, `fullsize`, `multiSRC`, `orderSRC`, `html`, `rss_cache`, `rss_feed`, `rss_template`, `numberOfItems`, `disableCaptcha`, `reg_groups`, `reg_allowLogin`, `reg_skipName`, `reg_close`, `reg_assignDir`, `reg_homeDir`, `reg_activate`, `reg_jumpTo`, `reg_text`, `reg_password`, `protected`, `groups`, `guests`, `cssID`, `faq_categories`, `faq_readerModule`, `list_table`, `list_fields`, `list_where`, `list_search`, `list_sort`, `list_info`, `list_info_where`, `list_layout`, `list_info_layout`, `news_archives`, `news_featured`, `news_jumpToCurrent`, `news_readerModule`, `news_metaFields`, `news_template`, `news_format`, `news_startDay`, `news_order`, `news_showQuantity`, `newsletters`, `nl_channels`, `nl_hideChannels`, `nl_subscribe`, `nl_unsubscribe`, `nl_template`, `cal_calendar`, `cal_noSpan`, `cal_hideRunning`, `cal_startDay`, `cal_format`, `cal_ignoreDynamic`, `cal_order`, `cal_readerModule`, `cal_limit`, `cal_template`, `cal_ctemplate`, `cal_showQuantity`, `com_order`, `com_moderate`, `com_bbcode`, `com_requireLogin`, `com_disableCaptcha`, `com_template`) VALUES (1, 1, 1518529946, 'Main menu', 'a:2:{s:4:\"unit\";s:2:\"h1\";s:5:\"value\";s:0:\"\";}', 'navigation', 0, 0, '', '', '', 0, 'nav_default', '', NULL, NULL, '', '', '', 0, '', '2cl', NULL, '', 0, 'and', '', 48, 1000, 0, 'simple', '', 'main', 0, '', '', '', '', NULL, 'internal', NULL, '', '', '', NULL, '', '', '', NULL, NULL, NULL, 3600, NULL, 'rss_default', 3, '', NULL, '', '', '', '', NULL, '', 0, NULL, NULL, '', NULL, '', 'a:2:{i:0;s:0:\"\";i:1;s:4:\"main\";}', NULL, 0, '', '', '', '', '', '', '', 'list_default', 'info_default', NULL, 'all_items', '', 0, 'a:2:{i:0;s:4:\"date\";i:1;s:6:\"author\";}', 'news_latest', 'news_month', 0, 'descending', '', NULL, NULL, '', NULL, NULL, 'nl_simple', NULL, '', '', 1, 'cal_month', '', 'ascending', 0, 0, 'event_full', 'cal_default', '', 'ascending', '', '', '', '', 'com_default');
INSERT INTO `tl_page` (`id`, `pid`, `sorting`, `tstamp`, `title`, `alias`, `type`, `pageTitle`, `language`, `robots`, `description`, `redirect`, `jumpTo`, `redirectBack`, `url`, `target`, `dns`, `staticFiles`, `staticPlugins`, `fallback`, `adminEmail`, `dateFormat`, `timeFormat`, `datimFormat`, `createSitemap`, `sitemapName`, `useSSL`, `autoforward`, `protected`, `groups`, `includeLayout`, `layout`, `mobileLayout`, `includeCache`, `cache`, `clientCache`, `includeChmod`, `cuser`, `cgroup`, `chmod`, `noSearch`, `cssClass`, `sitemap`, `hide`, `guests`, `tabindex`, `accesskey`, `published`, `start`, `stop`) VALUES (1, 0, 128, 1518529613, '<%= projectName %>', '', 'root', '', 'en-US', '', NULL, 'permanent', 0, '', '', '', '', '', '', '1', '', '', '', '', '', '', '', '', '', NULL, '1', 1, 0, '', 0, 0, '', 0, 0, 'a:9:{i:0;s:2:\"u1\";i:1;s:2:\"u2\";i:2;s:2:\"u3\";i:3;s:2:\"u4\";i:4;s:2:\"u5\";i:5;s:2:\"u6\";i:6;s:2:\"g4\";i:7;s:2:\"g5\";i:8;s:2:\"g6\";}', '', '', '', '', '', 0, '', '1', '', ''), (2, 1, 128, 1518521890, 'Home', 'index', 'regular', '', '', 'index,follow', NULL, 'permanent', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', 0, 0, '', 0, 0, '', 0, 0, 'a:9:{i:0;s:2:\"u1\";i:1;s:2:\"u2\";i:2;s:2:\"u3\";i:3;s:2:\"u4\";i:4;s:2:\"u5\";i:5;s:2:\"u6\";i:6;s:2:\"g4\";i:7;s:2:\"g5\";i:8;s:2:\"g6\";}', '', '', 'map_default', '', '', 0, '', '1', '', '');
INSERT INTO `tl_theme` (`id`, `tstamp`, `name`, `author`, `folders`, `screenshot`, `templates`, `vars`, `defaultImageDensities`) VALUES (1, 1518521810, 'theme_<%= theme %>', 'Die Schittigs', '', NULL, 'templates/templates_<%= theme %>', 'a:0:{}', '');

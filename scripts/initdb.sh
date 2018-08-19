# Install and create database script here, bash

# Users table structure CREATE TABLE `notes`.`Users` ( `id` bigint(20) NOT NULL, `username` text, `password` text, `email` text, `phone` text, `ip` text, `token` text, `lastupdated` text, `verified` tinyint(4) NOT NULL DEFAULT '0', `authcode` text, `timeauthed` text NOT NULL, `admin` tinyint(4) DEFAULT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1; ALTER TABLE `notes`.`Users` ADD PRIMARY KEY (`id`);


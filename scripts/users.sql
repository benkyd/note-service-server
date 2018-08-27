CREATE TABLE `notes`.`Users` ( 
    `id` bigint(20) NOT NULL, 
    `username` text, 
    `password` text, 
    `email` text, 
    `phone` text, 
    `ip` text, `
    token` text, 
    `lastupdated` text, 
    `verified` tinyint(4) NOT NULL DEFAULT '0', 
    `authcode` text, 
    `timeauthed` text NOT NULL, 
    `admin` tinyint(4) DEFAULT NULL 
)

ALTER TABLE `notes`.`Users` ADD PRIMARY KEY (`id`);


CREATE TABLE `notes`.`session` (
    `session_id` VARCHAR(32) NOT NULL,
    `session_data` TEXT NOT NULL,
    `t_created` bigint(20) NOT NULL, 
    `t_updated`bigint(20) NOT NULL, 
    PRIMARY KEY  (`session_id`)
) 

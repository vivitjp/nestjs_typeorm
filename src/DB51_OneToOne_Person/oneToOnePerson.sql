SELECT
        `user`.`name` AS `user_name`,
        `user`.`age` AS `user_age`,
        `profile`.`id` AS `profile_id`,
        `profile`.`photo` AS `profile_photo`,
        `profile`.`personId` AS `profile_personId`,
        `profile`.`photo` AS `profile_photo`,
        `profile`.`photo`
FROM
        `o2o_person` `user`
        LEFT JOIN `o2o_profile` `profile` ON `profile`.`personId` = `user`.`id`
WHERE
        `user`.`age` > 50;

SELECT
        `user`.`name` AS `user_name`,
        `user`.`age` AS `user_age`,
        `profile`.`id` AS `profile_id`,
        `profile`.`photo` AS `profile_photo`,
        `profile`.`personId` AS `profile_personId`
FROM
        `o2o_person` `user`
        LEFT JOIN `o2o_profile` `profile` ON `profile`.`personId` = `user`.`id`
WHERE
        `user`.`age` > 50;
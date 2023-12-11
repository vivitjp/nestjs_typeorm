DROP table view_analyze_city;

DROP table view_analyze_parent;

DROP table view_analyze_pref;

DROP table view_analyze_profession;

Create table view_analyze_profession (
  prof_id int primary key NOT NULL COMMENT 'PROFESSION_ID',
  prof_name varchar(16) NOT NULL COMMENT '職種名'
);

insert into
  view_analyze_profession
values
  (10, '会社員'),
  (11, '公務員'),
  (12, '自営業'),
  (13, '農業'),
  (14, '主婦'),
  (15, '学生'),
  (16, '無職');

Create table view_analyze_pref (
  pref_id int primary key NOT NULL COMMENT 'PREF_ID',
  pref_name varchar(16) NOT NULL COMMENT '名前'
);

insert into
  view_analyze_pref
values
  (10, '北海道'),
  (11, '青森'),
  (12, '岩手'),
  (13, '秋田'),
  (14, '宮城'),
  (15, '山形'),
  (16, '福島'),
  (17, '群馬'),
  (18, '栃木'),
  (19, '千葉'),
  (20, '埼玉'),
  (21, '東京'),
  (22, '千葉');

-- drop table view_analyze_city;
Create table view_analyze_city (
  city_id int auto_increment primary key NOT NULL COMMENT 'CITY_ID',
  pref_id int NOT NULL references view_analyze_pref(pref_id),
  city_name varchar(16) NOT NULL COMMENT '名前'
);

insert into
  view_analyze_city (pref_id, city_name)
values
  (10, '10-A'),
  (10, '10-B'),
  (10, '10-C'),
  (10, '10-D'),
  (10, '10-E'),
  (10, '10-F'),
  (10, '10-G'),
  (10, '10-H'),
  (10, '10-I'),
  (10, '10-J'),
  (11, '11-A'),
  (11, '11-B'),
  (11, '11-C'),
  (11, '11-D'),
  (11, '11-E'),
  (11, '11-F'),
  (11, '11-G'),
  (11, '11-H'),
  (11, '11-I'),
  (11, '11-J'),
  (12, '12-A'),
  (12, '12-B'),
  (12, '12-C'),
  (12, '12-D'),
  (12, '12-E'),
  (12, '12-F'),
  (12, '12-G'),
  (12, '12-H'),
  (12, '12-I'),
  (12, '12-J'),
  (13, '13-A'),
  (13, '13-B'),
  (13, '13-C'),
  (13, '13-D'),
  (13, '13-E'),
  (13, '13-F'),
  (13, '13-G'),
  (13, '13-H'),
  (13, '13-I'),
  (13, '13-J'),
  (14, '14-A'),
  (14, '14-B'),
  (14, '14-C'),
  (14, '14-D'),
  (14, '14-E'),
  (14, '14-F'),
  (14, '14-G'),
  (14, '14-H'),
  (14, '14-I'),
  (14, '14-J'),
  (15, '15-A'),
  (15, '15-B'),
  (15, '15-C'),
  (15, '15-D'),
  (15, '15-E'),
  (15, '15-F'),
  (15, '15-G'),
  (15, '15-H'),
  (15, '15-I'),
  (15, '15-J'),
  (16, '16-A'),
  (16, '16-B'),
  (16, '16-C'),
  (16, '16-D'),
  (16, '16-E'),
  (16, '16-F'),
  (16, '16-G'),
  (16, '16-H'),
  (16, '16-I'),
  (16, '16-J'),
  (17, '17-A'),
  (17, '17-B'),
  (17, '17-C'),
  (17, '17-D'),
  (17, '17-E'),
  (17, '17-F'),
  (17, '17-G'),
  (17, '17-H'),
  (17, '17-I'),
  (17, '17-J'),
  (18, '18-A'),
  (18, '18-B'),
  (18, '18-C'),
  (18, '18-D'),
  (18, '18-E'),
  (18, '18-F'),
  (18, '18-G'),
  (18, '18-H'),
  (18, '18-I'),
  (18, '18-J'),
  (19, '19-A'),
  (19, '19-B'),
  (19, '19-C'),
  (19, '19-D'),
  (19, '19-E'),
  (19, '19-F'),
  (19, '19-G'),
  (19, '19-H'),
  (19, '19-I'),
  (19, '19-J'),
  (20, '20-A'),
  (20, '20-B'),
  (20, '20-C'),
  (20, '20-D'),
  (20, '20-E'),
  (20, '20-F'),
  (20, '20-G'),
  (20, '20-H'),
  (20, '20-I'),
  (20, '20-J'),
  (21, '21-A'),
  (21, '21-B'),
  (21, '21-C'),
  (21, '21-D'),
  (21, '21-E'),
  (21, '21-F'),
  (21, '21-G'),
  (21, '21-H'),
  (21, '21-I'),
  (21, '21-J');

-- DROP table view_analyze_parent;
Create table view_analyze_parent (
  id int AUTO_INCREMENT primary key NOT NULL COMMENT 'ID',
  parent_name varchar(16) NOT NULL COMMENT '名前',
  city_id int NOT NULL references view_analyze_city(city_id),
  profession_id int not null,
  FOREIGN KEY kuso1(profession_id) references view_analyze_profession(prof_id),
  preferred_city1_id int default null,
  FOREIGN KEY kuso2(preferred_city1_id) references view_analyze_city(city_id),
  preferred_city2_id int default null,
  FOREIGN KEY kuso3(preferred_city2_id) references view_analyze_city(city_id)
);

insert into
  view_analyze_parent (
    parent_name,
    city_id,
    profession_id,
    preferred_city1_id,
    preferred_city2_id
  )
values
  ();

-- ==============================================
-- View
-- ==============================================
CREATE
OR REPLACE VIEW view_analyze_view AS
SELECT
  view_analyze_parent.*,
  view_analyze_profession.*,
  view_analyze_city.city_name
FROM
  view_analyze_parent,
  view_analyze_profession,
  view_analyze_city
WHERE
  view_analyze_parent.profession_id = view_analyze_profession.prof_id
  and view_analyze_parent.city_id = view_analyze_city.city_id;

explain analyze
select
  *
from
  view_analyze_view;

-- ==============================================
-- View
-- ==============================================
CREATE
OR REPLACE VIEW view_analyze_view_join AS
select
  p.*,
  city.city_name
from
  (
    SELECT
      *
    FROM
      view_analyze_parent,
      view_analyze_profession
    WHERE
      view_analyze_parent.profession_id = view_analyze_profession.prof_id
  ) p
  left outer join view_analyze_city city on p.city_id = city.city_id;

explain analyze
select
  *
from
  view_analyze_view_join;

-- -> Nested loop inner join  (cost=5.85 rows=7) (actual time=0.0644..7.77 rows=3000 loops=1)
--    -> Nested loop inner join  (cost=3.4 rows=7) (actual time=0.0587..4.57 rows=3000 loops=1)
--        -> Table scan on view_analyze_profession  (cost=0.95 rows=7) (actual time=0.0238..0.0321 rows=7 loops=1)
--        -> Index lookup on view_analyze_parent using kuso1 (profession_id=view_analyze_profession.prof_id)
--                                                           (cost=0.264 rows=1) (actual time=0.0183..0.627 rows=429 loops=7)
--    -> Single-row index lookup on view_analyze_city using PRIMARY (city_id=view_analyze_parent.city_id)
--                                                                  (cost=0.264 rows=1) (actual time=907e-6..928e-6 rows=1 loops=3000)
--
--
---> Nested loop left join  (cost=5.85 rows=7) (actual time=0.0759..7.86 rows=3000 loops=1);
--    -> Nested loop inner join  (cost=3.4 rows=7) (actual time=0.0706..4.64 rows=3000 loops=1);
--        -> Table scan on view_analyze_profession  (cost=0.95 rows=7) (actual time=0.0319..0.0406 rows=7 loops=1);
--        -> Index lookup on view_analyze_parent using kuso1 (profession_id=view_analyze_profession.prof_id)
--                                                           (cost=0.264 rows=1) (actual time=0.0198..0.637 rows=429 loops=7);
--    -> Single-row index lookup on city using PRIMARY (city_id=view_analyze_parent.city_id)
--                                                     (cost=0.264 rows=1) (actual time=908e-6..930e-6 rows=1 loops=3000);
-- ==============================================
-- View
-- ==============================================
CREATE
OR REPLACE VIEW view_analyze_view_all AS
select
  p.*,
  pref1.city_name as pref1_city,
  pref2.city_name as pref2_city
From
  (
    SELECT
      view_analyze_parent.*,
      view_analyze_profession.*,
      view_analyze_city.city_name
    FROM
      view_analyze_parent,
      view_analyze_profession,
      view_analyze_city
    WHERE
      view_analyze_parent.profession_id = view_analyze_profession.prof_id
      and view_analyze_parent.city_id = view_analyze_city.city_id
  ) p
  left outer join view_analyze_city pref1 on pref1.city_id = p.city_id
  left outer join view_analyze_city pref2 on pref2.city_id = p.city_id;

explain analyze
select
  *
from
  view_analyze_view_all;
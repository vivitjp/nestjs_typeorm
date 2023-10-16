CREATE TABLE general (
  id int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  name varchar(16) NOT NULL COMMENT '名前',
  age int NOT NULL COMMENT '年齢',
  act tinyint NOT NULL COMMENT '有効' DEFAULT 0,
  UNIQUE INDEX IDX_ab9ed1befeea847b85b8a00260 (name),
  PRIMARY KEY (id)
)
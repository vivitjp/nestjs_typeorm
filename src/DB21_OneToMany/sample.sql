CREATE TABLE o2m_ken (
  id int NOT NULL COMMENT '都道府県ID',
  name varchar(10) NOT NULL COMMENT '都道府県Name',
  INDEX IDX_dc57c5e5fd66271601d9054c42 (name),
  PRIMARY KEY (id)
);

CREATE TABLE m2o_city (
  id int NOT NULL COMMENT '市町村ID',
  name varchar(16) NOT NULL COMMENT '市町村Name',
  kenId int NOT NULL COMMENT '都道府県ID',
  INDEX IDX_1cb1d4af24e7f9af9a20a4bb35 (name),
  PRIMARY KEY (id)
);

ALTER TABLE
  m2o_city
ADD
  CONSTRAINT FK_9e192a098069fb894b1e51fc5bf FOREIGN KEY (kenId) REFERENCES o2m_ken(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
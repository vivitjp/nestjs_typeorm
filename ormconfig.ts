// DDL（Data Definition Language）
// PATH は relative 必須(tsconfigのpathsが適用されない)!!!

import { DataSource, DataSourceOptions } from 'typeorm';
import { DataGeneral } from './src/DB11_General/general.entity';
import { O2O_Person } from './src/DB51_OneToOne_Person/oneToOnePerson.entity';
import { O2O_Profile } from './src/DB52_OneToOne_Profile/oneToOneProfile.entity';
import { DataCompany } from './src/DB12_Company/company.entity';
import { M2OCity } from './src/DB22_ManyToOne/M2OCity.entity';
import { O2MKen } from './src/DB21_OneToMany/O2MKen.entity';
import { O2O_Main } from './src/DB53_OneToOne_Main/oneToOneMain.entity';
import { O2O_Sub } from './src/DB54_OneToOne_Sub/oneToOneSub.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'pukamaro',
  database: 'mydb',
  //entities: ['src/**/*.entity.ts'],
  entities: [
    DataGeneral,
    DataCompany,
    O2O_Person,
    O2O_Profile,
    M2OCity,
    O2MKen,
    O2O_Main,
    O2O_Sub,
  ],
  migrations: ['src/migration/*.ts'], //出力先
  synchronize: false,
  //true では migration の出力が不必要(npm run start:devで即DBをシンクロする)
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

export const Manager = dataSource.manager;

// entities: [DataA, DataB, OO_Person, OO_City, MM_Person, MM_Section], //個別ファイルの実行
//[X] entities: ['./entities/*.entity.ts'], //DIR 単位での実行時 -> ERROR(使用不可);
//Error: Unable to open file: "B:\@Nestjs\day09-typeorm\src\ormconfig.ts".
// Class extends value undefined is not a constructor or null
//[X] entities: [path.join(__dirname, '**/*.entity.ts')],

//【DDL空テンプレ作成】migration:create (ems/commonjs)
// up/down の空Class のみ作成
//npx typeorm-ts-node-esm migration:create src/migration/migration

//【DDL自動作成】migration:generate(ems/commonjs)
// 差分SQLを込みで作成
//npx typeorm-ts-node-esm migration:generate src/migration/migration -d ormconfig.ts

//【DDL実行】migration:run(ems/commonjs)
//npx typeorm-ts-node-esm migration:run -d ./ormconfig.ts

//【DDL実行】migration:revert(ems/commonjs)
//npx typeorm-ts-node-esm migration:revert -d ./ormconfig.ts

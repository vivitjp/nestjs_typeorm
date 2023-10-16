import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataGeneral } from './DB11_General/general.entity';
import { DataGeneralModule } from './DB11_General/general.module';
import { O2O_PersonModule } from './DB51_OneToOne_Person/oneToOnePerson.module';
import { O2O_ProfileModule } from './DB52_OneToOne_Profile/oneToOneProfile.module';
import { O2O_Person } from './DB51_OneToOne_Person/oneToOnePerson.entity';
import { O2O_Profile } from './DB52_OneToOne_Profile/oneToOneProfile.entity';
import { DataCompany } from './DB12_Company/company.entity';
import { CompanyModule } from './DB12_Company/company.module';
import { O2MKen } from './DB21_OneToMany/O2MKen.entity';
import { M2OCity } from './DB22_ManyToOne/M2OCity.entity';
import { M2OCityModule } from './DB22_ManyToOne/M2OCity.module';
import { O2MKenModule } from './DB21_OneToMany/O2MKen.module';
import { O2O_Main } from './DB53_OneToOne_Main/oneToOneMain.entity';
import { O2O_Sub } from './DB54_OneToOne_Sub/oneToOneSub.entity';
import { O2O_MainModule } from './DB53_OneToOne_Main/oneToOneMain.module';
import { O2O_SubModule } from './DB54_OneToOne_Sub/oneToOneSub.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pukamaro',
      database: 'mydb',
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
      synchronize: false,
      autoLoadEntities: true,
      //logging: true,
    }),
    DataGeneralModule,
    M2OCityModule,
    O2MKenModule,
    O2O_PersonModule,
    O2O_ProfileModule,
    CompanyModule,
    O2O_MainModule,
    O2O_SubModule,
  ],
  providers: [],
})
export class AppModule {}

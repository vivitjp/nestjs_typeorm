import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataGeneral } from './general.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, InsertResult, Repository } from 'typeorm';

//-------------------------------------------
// Deprecated
//-------------------------------------------
//await getConnection(); Deprecated
//await getManager();    Deprecated
//await getRepository(); Deprecated
//-------------------------------------------

@Injectable()
export class DataGeneralService {
  constructor(
    @InjectRepository(DataGeneral)
    private readonly repoGeneral: Repository<DataGeneral>,
  ) {}

  //---------------------------------------------
  // Query: find(),findONe()
  //---------------------------------------------
  //find:all
  async findAll(): Promise<DataGeneral[]> {
    const Option: FindManyOptions = {
      select: { name: true },
      //where: { name: 'John' },
      //where: { age: MoreThan(20) },
      where: { name: In(['John', 'Steve']) },
      order: { name: 'ASC' },
      //skip: 5, //offset 5
      //take: 10, //limit 10
    };
    return await this.repoGeneral.find(Option);
  }

  //【QB】find:all
  //createQueryBuilder('general') パラメタはOptional
  async findAll_QB(): Promise<DataGeneral[]> {
    //return await

    const query = this.repoGeneral.createQueryBuilder('gen');
    //.select(['gen.name', 'gen.age']);
    //.where('gen.age > :ageMoreThen')
    //.where('gen.age > :ageMoreThen', { ageMoreThen: 20 });
    //.andWhere('age < :ageLessThan', { ageLessThan: 40 });
    // .orderBy('name')
    // .limit(5)
    // .offset(0);

    //別パラメタ設定方法
    //query.setParameters({ ageMoreThen: 30 });

    //要注意:SQLにパラメタ値は現れない！
    // console.log(query.getSql()); // パラメタ以外のSQL
    // console.log(query.getParameters()); //パラメタのみ
    // console.log(query.getQueryAndParameters()); //両方
    // [
    //   'SELECT `gen`.`name` AS `gen_name`, `gen`.`age` AS `gen_age` FROM `general` `gen` WHERE `gen`.`age` > ? AND age < ?',
    //   [ 30, 40 ]
    // ]
    return await query.getMany().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //find:one
  //文字列は Case Insensitive
  async getByName(name: string): Promise<DataGeneral | null> {
    return await this.repoGeneral.findOne({ where: { name } }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //find:one
  async getByID(id: number): Promise<DataGeneral | null> {
    return await this.repoGeneral.findOne({ where: { id } }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //【QB】find:one
  async getByID_QB(id: number): Promise<DataGeneral | null> {
    return await this.repoGeneral
      .createQueryBuilder()
      .where('id=:id', { id })
      .getOne()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  //---------------------------------------------
  // Query: Join
  // この JOIN は oneToMany の関係が宣言されていないくても動作
  // 普通に QUERY を作成して SQL SERVER に投げる
  //---------------------------------------------
  //【QB】find:one
  async getAllJoinedBySQL1() {
    //Table にスキーマ名(mydb.)がなくてもQuery可能
    return await this.repoGeneral
      .query(
        `SELECT id,name,age,compName FROM general 
      LEFT JOIN 
      (SELECT generalId, name as compName FROM company) comp
      on general.id=comp.generalId`,
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  async getAllJoinedBySQL2() {
    return await this.repoGeneral
      .query(
        `SELECT gen.id, gen.age, comp.name as cname
      FROM mydb.general gen, mydb.company comp
      WHERE gen.id = comp.generalId`,
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  async getAllJoined_QB() {
    return await this.repoGeneral
      .createQueryBuilder('gen')
      .select(['gen.id', 'gen.name', 'gen.age', 'company.name']) //'company.name'無効
      //.leftJoinAndSelect(DataCompany, 'company', 'gen.id=company.generalId') //Entity
      .leftJoinAndSelect('company', 'company', 'gen.id=company.generalId')
      .where('gen.id>=2')
      .getMany()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  //---------------------------------------------
  // insert
  //---------------------------------------------
  async insert1Insert(
    data: Partial<DataGeneral> | Partial<DataGeneral>[],
  ): Promise<boolean> {
    //const result: InsertResult =
    await this.repoGeneral.insert(data).catch(e => {
      throw new InternalServerErrorException(e.message);
    });

    //console.log(result);
    //if (!result?.raw?.affectedRows) throw Error('Insert 失敗');
    return true; //!!result?.raw?.affectedRows; true しか返さない
  }

  async insert2Save(data: Partial<DataGeneral>[]): Promise<boolean> {
    await this.repoGeneral.save(data).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  async insert3Create(data: Partial<DataGeneral>[]): Promise<boolean> {
    const general = this.repoGeneral.create(data);
    await this.repoGeneral.save(general).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  // InsertResult {
  //   identifiers: [ { id: 4 } ],
  //   generatedMaps: [
  //     {
  //       id: 4,
  //       created_at: 2023-09-21T22:47:30.725Z,
  //       updated_at: 2023-09-21T22:47:30.725Z,
  //       act: false
  //     }
  //   ],
  //   raw: ResultSetHeader {
  //     fieldCount: 0,
  //     affectedRows: 1,
  //     insertId: 4,
  //     info: '',
  //     serverStatus: 2,
  //     warningStatus: 0,
  //     changedRows: 0
  //   }
  // }

  //【QB】
  async insert_QB(
    data: Partial<DataGeneral> | Partial<DataGeneral>[],
  ): Promise<boolean> {
    //const result: InsertResult =
    await this.repoGeneral
      .createQueryBuilder()
      .insert()
      .into(DataGeneral)
      .values(data) //配列もOK , act: false
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    //console.log(result);
    //if (!result?.raw?.affectedRows) throw Error('Insert 失敗');
    return true; //!!result?.raw?.affectedRows; true しか返さない
  }

  //---------------------------------------------
  // update
  //---------------------------------------------
  async update(name: string, data: Partial<DataGeneral>): Promise<boolean> {
    //const result: UpdateResult =
    await this.repoGeneral
      .update(
        { name }, //SQL:where
        { ...data }, //SQL:values
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    //console.log(result);
    //if (!result.affected) throw Error('Update 失敗');
    return true; //!!result.affected; true しか返さない
  }

  //UpdateResult { generatedMaps: [], raw: [], affected: 1 } 成功
  //UpdateResult { generatedMaps: [], raw: [], affected: 0 } 失敗

  //【QB】
  async update_QB(name: string, data: Partial<DataGeneral>): Promise<boolean> {
    //const result: UpdateResult =
    await this.repoGeneral
      .createQueryBuilder()
      .update(DataGeneral)
      .set(data)
      .where('name=:name', { name })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
    //console.log(result);

    //if (!result.affected) throw Error('Update 失敗');
    return true; //!!result.affected; true しか返さない
  }

  //---------------------------------------------
  // upsert
  //---------------------------------------------
  async upsert(data: Partial<DataGeneral>): Promise<boolean> {
    const result: InsertResult = await this.repoGeneral
      .upsert(
        { ...data }, //SQL:values
        { conflictPaths: ['name'] }, //重複チェックカラム **Unique Index化必須!
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    console.log(result);
    //if (!result?.raw?.affectedRows) throw Error('Upsert 失敗');

    return true; //!!result?.raw?.affectedRows; true しか返さない
  }
  /** executes
   *  INSERT INTO user
   *  VALUES
   *      (externalId = abc123, firstName = Rizzrak),
   *      (externalId = cba321, firstName = Karzzir),
   *  ON CONFLICT (externalId) DO UPDATE firstName = EXCLUDED.firstName
   **/

  async upsert_QB(data: Partial<DataGeneral>): Promise<boolean> {
    await this.repoGeneral
      .createQueryBuilder()
      .insert()
      .into(DataGeneral)
      .values(data)
      .orUpdate(['name', 'age'], ['name']) //([update対象カラム,...],[重複チェックカラム])
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }
  //---------------------------------------------
  // delete
  //---------------------------------------------
  async delete(name: string): Promise<boolean> {
    //const result: DeleteResult =
    await this.repoGeneral.delete({ name }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    //console.log(result);

    //if (!result.affected) throw Error('Delete 失敗');
    return true; //!!result.affected; true しか返さない
  }

  //DeleteResult { raw: [], affected: 1 } 成功
  //DeleteResult { raw: [], affected: 0 } 失敗

  //QueryBuilder: delete
  async delete_QB(name: string): Promise<boolean> {
    //const result: DeleteResult =
    await this.repoGeneral
      .createQueryBuilder()
      .delete()
      .from(DataGeneral)
      .where('name=:name', { name })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    //console.log(result);
    //if (!result.affected) throw Error('Delete 失敗');
    return true; //!!result.affected; true しか返さない
  }
}

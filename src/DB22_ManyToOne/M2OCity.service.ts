import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M2OCity } from './M2OCity.entity';
import { O2MKen } from '../DB21_OneToMany/O2MKen.entity';

@Injectable()
export class M2OCityService {
  constructor(
    @InjectRepository(M2OCity)
    private readonly repoCity: Repository<M2OCity>,
    @InjectRepository(O2MKen)
    private readonly repoKen: Repository<O2MKen>,
  ) {}

  async findAll(): Promise<M2OCity[]> {
    const res = await this.repoCity.find().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return res;
  }

  //隠れカラム表示方法 Query (Error は Runtime!)
  async findAllHidden(): Promise<M2OCity[]> {
    return await this.repoCity
      .query(`SELECT id,name,kenId FROM m2o_city`)
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  //Query結果: cityId,cityName,kenName (Left Join)
  async getAllJoinedBySQL1() {
    return await this.repoCity.query(
      `SELECT id as cityId, name as cityName, ken.kenName FROM m2o_city 
      LEFT JOIN 
      (SELECT id as kenId, name as kenName FROM o2m_ken) ken
      on m2o_city.kenId=ken.kenId`,
    );
  }

  //Query結果: id, cityName, kenName (Join)
  async getAllJoinedBySQL2() {
    return await this.repoCity
      .query(
        `SELECT city.id, city.name as cityName, ken.name as kenName
      FROM m2o_city city, o2m_ken ken
      WHERE city.kenId = ken.id`,
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  //Query結果: id,name,city:{id,name}[] (オブジェクト構造を維持した Left Join) 下層に子
  async getAllJoinedMapByKen() {
    return await this.repoKen //OneToMany コネクタ
      .createQueryBuilder('ken')
      .leftJoinAndMapMany(
        //leftJoinAndMapMany() or leftJoinAndMapOne()
        'ken.city', //OneToMany コネクタ
        M2OCity, //Many2One LeftJoin Schema
        'city', //M2OCity の別名
        'ken.id=city.kenId',
      )
      .getMany()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  //Query結果: id,name,ken:{id,name} (オブジェクト構造を維持した Left Join) 下層に親
  async getAllJoinedMapByCity() {
    return await this.repoCity //Many2One コネクタ
      .createQueryBuilder('city')
      .leftJoinAndMapMany(
        //親は常に1つなので実質同じ: leftJoinAndMapMany() or leftJoinAndMapOne()
        //子の戻り値が配列かの違い
        'city.ken', //Many2One コネクタ
        O2MKen, //OneToMany LeftJoin Schema
        'ken', //O2MKen の別名
        'ken.id=city.kenId',
      )
      .getMany()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  //id, name
  async getAllJoined_QB1() {
    return await this.repoCity
      .createQueryBuilder('city')
      .select()
      .leftJoinAndSelect('o2m_ken', 'ken', 'city.kenId=ken.id')
      .getMany()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  //Error
  async getAllJoined_QB2() {
    return await this.repoCity
      .createQueryBuilder()
      .select('id')
      .leftJoinAndSelect('o2m_ken', 'ken')
      .getMany();
  }

  async insert(kenId: number, data: Partial<M2OCity>): Promise<boolean> {
    const ken = await this.repoKen.findOne({ where: { id: kenId } });
    if (!ken) throw Error('都道府県IDが存在しましせん');
    await this.repoCity.insert({ ...data, ken }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  async update(id: number, data: Partial<M2OCity>): Promise<boolean> {
    await this.repoCity.update({ id }, { ...data }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.repoCity.delete({ id }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }
}

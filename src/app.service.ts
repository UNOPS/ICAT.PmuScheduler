import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Applicability } from './entity/applicability.entity';
import { Country } from './entity/contry.entity';
import { MethodologyData } from './entity/methodology-data.entity';
import { Methodology } from './entity/methodology.entity';
import { MitigationAction } from './entity/mitigation-action.entity';
import { Sector } from './entity/sector.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly calculationEngineBaseURl = process.env.CAL_ENGINE_BASE_URL;


  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,

    @InjectRepository(MitigationAction)
    private readonly mitidationActionRepository: Repository<MitigationAction>,

    @InjectRepository(Applicability)
    private readonly applicabilityRepository: Repository<Applicability>,
    
    @InjectRepository(MethodologyData)
    private readonly methodologyDataRepository: Repository<MethodologyData>,

    private httpService: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('20 * * * * *')
  async handleCron() {
    this.logger.debug('Called when the current second is 20');
    await this.syncApplicability();
    await this.syncMAction();
    await this.syncCountry();
    await this.syncSector();
    await this.syncMethodologyData();
  }

  async syncCountry(){
    let localMCountry = await this.countryRepository.find();
    await this.getCountryFromServer('country').subscribe(async (m) => {
      m.data.map((me) => {
        if (me.uniqueIdentification) {
          let exsistingItem = localMCountry.find(
            (a) => a.uniqueIdentification === me.uniqueIdentification,
          );

          if (!exsistingItem) {

            this.countryRepository.save(me);
          } else {
            this.countryRepository.save(me);
          }
        }
      });
    });
  }

  async syncMethodologyData(){
    let localMCountry = await this.methodologyDataRepository.find();
    await this.getCountryFromServer('methodology-data').subscribe(async (m) => {
      m.data.map((me) => {

        if (me.uniqueIdentification) {
          let exsistingItem = localMCountry.find(
            (a) => a.uniqueIdentification === me.uniqueIdentification,
          );

          if (!exsistingItem) {
            this.methodologyDataRepository.save(me);
          } else {
            this.methodologyDataRepository.save(me);
          }
        }
      });
    });
  }

  async syncSector(){
    let localMCountry = await this.sectorRepository.find();
    await this.getCountryFromServer('sector').subscribe(async (m) => {
      m.data.map((me) => {
        if (me.uniqueIdentification) {
          let exsistingItem = localMCountry.find(
            (a) => a.uniqueIdentification === me.uniqueIdentification,
          );

          if (!exsistingItem) {
            this.sectorRepository.save(me);
          } else {
            this.sectorRepository.save(me);
          }
        }
      });
    });
  }

  async syncApplicability(){
    let localMCountry = await this.applicabilityRepository.find();
    await this.getCountryFromServer('applicability').subscribe(async (m) => {
      m.data.map((me) => {
        if (me.uniqueIdentification) {
          let exsistingItem = localMCountry.find(
            (a) => a.uniqueIdentification === me.uniqueIdentification,
          );

          if (!exsistingItem) {
            this.applicabilityRepository.save(me);
          } else {
            this.applicabilityRepository.save(me);
          }
        }
      });
    });
  }

  async syncMAction(){
    let localMCountry = await this.mitidationActionRepository.find();
    await this.getCountryFromServer('mitigation-action').subscribe(async (m) => {
      m.data.map((me) => {
        if (me.uniqueIdentification) {
          let exsistingItem = localMCountry.find(
            (a) => a.uniqueIdentification === me.uniqueIdentification,
          );

          if (!exsistingItem) {

            this.mitidationActionRepository.save(me);
          } else {
            this.mitidationActionRepository.save(me);
          }
        }
      });
    });
  }



  getCountryFromServer(name:string): Observable<AxiosResponse<any>> {
    try {
      let countryURL = this.calculationEngineBaseURl + name;
      return this.httpService.get(countryURL);
    } catch (e) {
    }
  }
}

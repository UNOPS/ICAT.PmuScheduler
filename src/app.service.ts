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
  private readonly calculationEngineBaseURl = 'http://35.154.205.109:3600/';
  // private readonly pmuBaseURl = 'http://35.154.205.109:7081/';

  /**
   *
   */
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
    // await this.syncMethodology();
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
            //item not found Insert
            console.log('Insert country');

            this.countryRepository.save(me);
          } else {
            //item found Update;
            console.log('Update country');
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
            //item not found Insert
            console.log('Insert country');

            this.methodologyDataRepository.save(me);
          } else {
            //item found Update;
            console.log('Update country');
            // console.log(me);
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
            //item not found Insert
            console.log('Insert sector');

            this.sectorRepository.save(me);
          } else {
            //item found Update;
            console.log('Update sector');
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
            //item not found Insert
            console.log('Insert applicability');

            this.applicabilityRepository.save(me);
          } else {
            //item found Update;
            console.log('Update applicability');
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
            //item not found Insert
            console.log('Insert mitigation-action');

            this.mitidationActionRepository.save(me);
          } else {
            //item found Update;
            console.log('Update mitigation-action');
            this.mitidationActionRepository.save(me);
          }
        }
      });
    });
  }


  // async syncMethodology() {
  //   let localMethodology = await this.methodologyRepository.find();
  //   await this.getMetodlogyFromServer().subscribe(async (m) => {
  //     m.data.map((me) => {
  //       if (me.uniqueIdentification) {
  //         let exsistingItem = localMethodology.find(
  //           (a) => a.uniqueIdentification === me.uniqueIdentification,
  //         );

  //         if (!exsistingItem) {
  //           //item not found Insert
  //           console.log('Insert');

  //           this.methodologyRepository.insert(me);
  //         } else {
  //           //item found Update;
  //           console.log('Update');
  //           this.methodologyRepository.save(me);
  //         }
  //       }
  //     });
  //   });
  // }

  // getMetodlogyFromServer(): Observable<AxiosResponse<any>> {
  //   try {
  //     let methodologuURL = this.calculationEngineBaseURl + 'methodology';
  //     return this.httpService.get(methodologuURL);
  //   } catch (e) {
  //     console.log('calculation Engine error', e);
  //   }
  // }

  getCountryFromServer(name:string): Observable<AxiosResponse<any>> {
    try {
      let countryURL = this.calculationEngineBaseURl + name;
      console.log(countryURL)
      return this.httpService.get(countryURL);
    } catch (e) {
      console.log('calculation Engine error', e);
    }
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Applicability } from './entity/applicability.entity';
import { Country } from './entity/contry.entity';
import { Methodology } from './entity/methodology.entity';
import { MitigationAction } from './entity/mitigation-action.entity';
import { Sector } from './entity/sector.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly calculationEngineBaseURl = process.env.CAL_ENGINE_BASE_URL;

  constructor(
    @InjectRepository(Methodology)
    private readonly methodologyRepository: Repository<Methodology>,

    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,

    @InjectRepository(MitigationAction)
    private readonly mitidationActionRepository: Repository<MitigationAction>,

    @InjectRepository(Applicability)
    private readonly applicabilityRepository: Repository<Applicability>,

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
    await this.syncMethodology();
  }

  async syncCountry() {
    const localMCountry = await this.countryRepository.find();
    await this.getCountryFromServer('country').subscribe(async (m) => {
      m.data.map((me) => {
        if (me.uniqueIdentification) {
          const exsistingItem = localMCountry.find(
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

  async syncSector() {
    const localMCountry = await this.sectorRepository.find();
    await this.getCountryFromServer('sector').subscribe(async (m) => {
      m.data.map((me) => {
        if (me.uniqueIdentification) {
          const exsistingItem = localMCountry.find(
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

  async syncApplicability() {
    const localMCountry = await this.applicabilityRepository.find();
    await this.getCountryFromServer('applicability').subscribe(async (m) => {
      m.data.map((me) => {
        if (me.uniqueIdentification) {
          const exsistingItem = localMCountry.find(
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

  async syncMAction() {
    const localMCountry = await this.mitidationActionRepository.find();
    await this.getCountryFromServer('mitigation-action').subscribe(
      async (m) => {
        m.data.map((me) => {
          if (me.uniqueIdentification) {
            const exsistingItem = localMCountry.find(
              (a) => a.uniqueIdentification === me.uniqueIdentification,
            );

            if (!exsistingItem) {
              this.mitidationActionRepository.save(me);
            } else {
              this.mitidationActionRepository.save(me);
            }
          }
        });
      },
    );
  }

  async syncMethodology() {
    const localMethodology = await this.methodologyRepository.find();
    await this.getMetodlogyFromServer().subscribe(async (m) => {
      m.data.map((me) => {
        if (me.uniqueIdentification) {
          const exsistingItem = localMethodology.find(
            (a) => a.uniqueIdentification === me.uniqueIdentification,
          );

          if (!exsistingItem) {
            this.methodologyRepository.insert(me);
          } else {
            this.methodologyRepository.save(me);
          }
        }
      });
    });
  }

  getMetodlogyFromServer(): Observable<AxiosResponse<any>> {
    try {
      const methodologuURL = this.calculationEngineBaseURl + 'methodology';
      return this.httpService.get(methodologuURL);
    } catch (e) {}
  }

  getCountryFromServer(name: string): Observable<AxiosResponse<any>> {
    try {
      const countryURL = this.calculationEngineBaseURl + name;
      return this.httpService.get(countryURL);
    } catch (e) {}
  }
}

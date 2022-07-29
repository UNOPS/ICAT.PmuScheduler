import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Applicability } from './entity/applicability.entity';
import { Country } from './entity/contry.entity';
import { MethodologyData } from './entity/methodology-data.entity';
import { Methodology } from './entity/methodology.entity';
import { MitigationAction } from './entity/mitigation-action.entity';
import { Sector } from './entity/sector.entity';

// https://docs.nestjs.com/techniques/task-scheduling

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      // username: 'root',
      // password: 'password',
      //database: 'nccdsndb',
      username: 'root',
      password: '',
      database: 'icat_pmu',
      entities: [Applicability,
        Country,
        Methodology,
        MitigationAction,
        Sector,
        MethodologyData,
      ],

      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Applicability,
      Country,
      Methodology,
      MitigationAction,
      Sector,
      MethodologyData
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

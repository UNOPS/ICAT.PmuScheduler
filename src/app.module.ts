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

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      socketPath: process.env.SOCKET_PATH,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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

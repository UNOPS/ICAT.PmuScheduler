
import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm';
import { BaseTrackingEntity } from './base/base.tracking.entity';
import { countryStatus } from './country-status.entity';

@Entity({name: 'country'})
export class Country extends BaseTrackingEntity{

  constructor() {
    super();
    this.createdBy = '';
    this.editedBy = '';
  }
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  code: string;

  @Column({ default: null })
  code_extended: string;

  @Column({ default: null })
  name: string;

  @Column({ length: 300, default: null })
  description: string;

  @Column({ default: 1 })
  sortOrder: number;

  // @Column()
  // submissions: string; // add as string for document upload 

  // @Column({ default: null })
  // emissionSummary: string;

  // @Column({ default: null })
  // ndcDocuments: string;

  @Column({ default: null })
  isSystemUse: boolean;

  @Column({ default: null })
  isCA: boolean;

  @Column({ default: null })
  flagPath: string;

  @Column({ default: null })
  registeredDate: Date;

  
  @Column({ default: null })
  isMember: boolean;

  @Column({ default: null }) 
  countryStatus: countryStatus;

  @Column({ default: null })
  region: string;

  @Column({ default: null })
  uniqueIdentification: string;

  @Column({ default: null })
  institutionId: string;

  @Column({ default: null })
  climateActionModule: boolean;

  @Column({ default: null })
  ghgModule: boolean;

  @Column({ default: null })
  macModule: boolean;

  @Column({ default: null })
  dataCollectionModule: boolean;
}

import { Column, Entity } from 'typeorm';
import { MasterData } from './base/master.data.entity';

@Entity('mitigationActionType')
export class MitigationAction extends MasterData {
  @Column({ default: null })
  uniqueIdentification: string;
}

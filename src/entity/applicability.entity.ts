import { Column, Entity} from 'typeorm';
import { MasterData } from './base/master.data.entity';

@Entity('applicability')
export class Applicability extends MasterData {

  @Column({ default: null })
  uniqueIdentification: string;
}
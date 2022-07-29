
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Applicability } from './applicability.entity';

import { BaseTrackingEntity } from './base/base.tracking.entity';
import { Country } from './contry.entity';
import { MitigationAction } from './mitigation-action.entity';
import { Sector } from './sector.entity';

@Entity()
export class MethodologyData extends BaseTrackingEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: string;

    @Column()
    name: string;

    @Column({ default: null })
    displayName: string;

    @Column()
    developedBy: string;

    @Column({ default: null })
    parentId: number;

    @Column({ default: null })
    applicableSector: string;

    @Column()
    documents: string;

    @Column({ default: null })
    easenessOfDataCollection: string;

    @Column({ default: null })
    transportSubSector: string;

    @Column({ default: null })
    upstream_downstream: string;

    @Column({ default: null })
    ghgIncluded: string;

    @Column({ default: null })
    uniqueIdentification: string;

    @ManyToOne((type) => Sector, { cascade: false })
    @JoinColumn({ name: 'sectorId' })
    sector?: Sector;

    @ManyToOne((type) => MitigationAction, { cascade: false })
    @JoinColumn({ name: 'mitigationActionTypeId' })
    mitigationActionType?: MitigationAction;

    @ManyToOne((type) => Applicability, { cascade: false })
    @JoinColumn({ name: 'applicabilityId' })
    applicability?: Applicability;

}
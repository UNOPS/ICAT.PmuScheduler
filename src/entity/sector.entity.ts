import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';
import { BaseTrackingEntity } from "./base/base.tracking.entity";

@Entity({ name: 'sector' })
export class Sector extends BaseTrackingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    name: string;

    @Column({ length: 300, default: null })
    description: string;

    @Column({ default: 1 })
    sortOrder: number;


    @Column({ default: null })
    uniqueIdentification: string;
}





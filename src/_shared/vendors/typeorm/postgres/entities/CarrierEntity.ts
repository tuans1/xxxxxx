import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'local_carrier_master_data', name: 'carrier' })
export class CarrierEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column()
    code: string;

    @Column()
    name: string;
}

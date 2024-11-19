import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'local_service_lane_master_data', name: 'service_lane' })
export class ServiceLaneEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({ name: 'feeder_trunk' })
    feederTrunk: string;

    @Column({ name: 'sap_crt_code' })
    sapCrtCode: string;

    @Column({ name: 'effective_date' })
    effectiveDate: string;

    @Column({ name: 'status' })
    status: string;
}

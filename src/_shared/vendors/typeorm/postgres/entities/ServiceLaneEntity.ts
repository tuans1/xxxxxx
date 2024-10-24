import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'local_service_lane_master_data', name: 'service_lane' })
export class ServiceLaneEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column()
    code: string;

    @Column()
    name: string;
}

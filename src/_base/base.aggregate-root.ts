import { Entity } from './base.entity';
import { Event } from './base.event';

export abstract class AggregateRoot<
    TId,
    TProps,
    TEvent extends Event<any>
> extends Entity<TId, TProps> {
    protected _events: TEvent[];

    protected constructor(id: TId, props: TProps) {
        super(id, props);
        this._events = [];
    }

    public get events() {
        return this._events;
    }
}

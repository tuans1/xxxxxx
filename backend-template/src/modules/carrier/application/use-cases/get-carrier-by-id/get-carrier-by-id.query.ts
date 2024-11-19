type Args = {
    carrierId: string;
};

export class GetCarrierByIdQuery {
    private readonly _args: Args;

    constructor(args: Args) {
        this._args = args;
    }

    public get args() {
        return this._args;
    }
}

type Args = {
    carrierCode: string;
    carrierName: string;
};

export class CreateCarrierCommand {
    private readonly _args: Args;

    constructor(args: Args) {
        this._args = args;
    }

    public get args() {
        return this._args;
    }
}

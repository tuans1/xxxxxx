type Args = {
    slCode: string;
    slName: string;
};

export class CreateServiceLaneCommand {
    private readonly _args: Args;

    constructor(args: Args) {
        this._args = args;
    }

    public get args() {
        return this._args;
    }
}

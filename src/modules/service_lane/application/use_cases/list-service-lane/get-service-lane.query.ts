type Args = unknown;

export class GetListServiceLaneQuery {
    private readonly _args: Args;

    constructor(args: Args) {
        this._args = args;
    }

    public get args() {
        return this._args;
    }
}

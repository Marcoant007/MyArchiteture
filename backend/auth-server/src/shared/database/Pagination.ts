export class Pagination {
    private _limit?: number;
    private _page?: number;

    constructor(limit?: any, page?: any) {
        if (limit) {
            this._limit = +limit;
        }

        if (page) {
            this._page = +page;
        }
    }

    public offset(): number {
        if (!this._page || !this._limit) {
            return 0;
        }
        return (this._page - 1) * this._limit;
    }

    public limit(): number {
        if (this._limit) {
            return this._limit;
        }
        return 10;
    }

    public page(): number {
        if (this._page) {
            return this._page;
        }
        return 1;
    }
}
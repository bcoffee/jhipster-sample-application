export interface IUserOption {
    id?: number;
    name?: string;
    value?: string;
    category?: string;
}

export class UserOption implements IUserOption {
    constructor(public id?: number, public name?: string, public value?: string, public category?: string) {}
}

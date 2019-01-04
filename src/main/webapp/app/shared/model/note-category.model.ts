export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH'
}

export interface INoteCategory {
    id?: number;
    name?: string;
    language?: Language;
    message?: string;
}

export class NoteCategory implements INoteCategory {
    constructor(public id?: number, public name?: string, public language?: Language, public message?: string) {}
}

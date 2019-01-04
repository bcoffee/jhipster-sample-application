import { IUser } from 'app/core/user/user.model';
import { INote } from 'app/shared/model//note.model';
import { INoteCategory } from 'app/shared/model//note-category.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH'
}

export interface INote {
    id?: number;
    name?: string;
    language?: Language;
    message?: string;
    cycleId?: string;
    noteUser?: IUser;
    parentNote?: INote;
    noteCategory?: INoteCategory;
}

export class Note implements INote {
    constructor(
        public id?: number,
        public name?: string,
        public language?: Language,
        public message?: string,
        public cycleId?: string,
        public noteUser?: IUser,
        public parentNote?: INote,
        public noteCategory?: INoteCategory
    ) {}
}

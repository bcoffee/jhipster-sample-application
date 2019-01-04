import { IMessageType } from 'app/shared/model//message-type.model';
import { IEnObject } from 'app/shared/model//en-object.model';

export interface IMessageMap {
    id?: number;
    message?: string;
    bit?: number;
    isActive?: boolean;
    ioe?: string;
    cipAddress?: string;
    messageType?: IMessageType;
    messageObjects?: IEnObject[];
}

export class MessageMap implements IMessageMap {
    constructor(
        public id?: number,
        public message?: string,
        public bit?: number,
        public isActive?: boolean,
        public ioe?: string,
        public cipAddress?: string,
        public messageType?: IMessageType,
        public messageObjects?: IEnObject[]
    ) {
        this.isActive = this.isActive || false;
    }
}

import { IMessageType } from 'app/shared/model//message-type.model';

export interface IMessageMap {
    id?: number;
    message?: string;
    bit?: number;
    isActive?: boolean;
    ioe?: string;
    cipAddress?: string;
    messageType?: IMessageType;
}

export class MessageMap implements IMessageMap {
    constructor(
        public id?: number,
        public message?: string,
        public bit?: number,
        public isActive?: boolean,
        public ioe?: string,
        public cipAddress?: string,
        public messageType?: IMessageType
    ) {
        this.isActive = this.isActive || false;
    }
}

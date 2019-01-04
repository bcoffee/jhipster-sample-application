export interface IMessageType {
    id?: number;
    code?: string;
    description?: string;
    definition?: string;
    isProductionStop?: boolean;
}

export class MessageType implements IMessageType {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public definition?: string,
        public isProductionStop?: boolean
    ) {
        this.isProductionStop = this.isProductionStop || false;
    }
}

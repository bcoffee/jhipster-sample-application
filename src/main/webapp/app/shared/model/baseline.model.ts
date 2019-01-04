import { IModel } from 'app/shared/model//model.model';
import { IModelCode } from 'app/shared/model//model-code.model';

export interface IBaseline {
    id?: number;
    cycleLength?: number;
    minTolerance?: number;
    maxTolerance?: number;
    minNormalTolerance?: number;
    maxNormalTolerance?: number;
    baselineModel?: IModel;
    baselineCode?: IModelCode;
}

export class Baseline implements IBaseline {
    constructor(
        public id?: number,
        public cycleLength?: number,
        public minTolerance?: number,
        public maxTolerance?: number,
        public minNormalTolerance?: number,
        public maxNormalTolerance?: number,
        public baselineModel?: IModel,
        public baselineCode?: IModelCode
    ) {}
}

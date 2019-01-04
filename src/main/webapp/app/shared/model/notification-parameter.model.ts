import { Moment } from 'moment';

export interface INotificationParameter {
    id?: number;
    measure?: string;
    duration?: number;
    durationTrack?: number;
    count?: number;
    countTrack?: number;
    scaneDate?: Moment;
}

export class NotificationParameter implements INotificationParameter {
    constructor(
        public id?: number,
        public measure?: string,
        public duration?: number,
        public durationTrack?: number,
        public count?: number,
        public countTrack?: number,
        public scaneDate?: Moment
    ) {}
}

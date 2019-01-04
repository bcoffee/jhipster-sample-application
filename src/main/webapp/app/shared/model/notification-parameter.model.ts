import { Moment } from 'moment';
import { INotification } from 'app/shared/model//notification.model';

export interface INotificationParameter {
    id?: number;
    measure?: string;
    duration?: number;
    durationTrack?: number;
    count?: number;
    countTrack?: number;
    scaneDate?: Moment;
    notification?: INotification;
}

export class NotificationParameter implements INotificationParameter {
    constructor(
        public id?: number,
        public measure?: string,
        public duration?: number,
        public durationTrack?: number,
        public count?: number,
        public countTrack?: number,
        public scaneDate?: Moment,
        public notification?: INotification
    ) {}
}

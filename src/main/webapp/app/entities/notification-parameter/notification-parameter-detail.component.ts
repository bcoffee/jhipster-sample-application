import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotificationParameter } from 'app/shared/model/notification-parameter.model';

@Component({
    selector: 'jhi-notification-parameter-detail',
    templateUrl: './notification-parameter-detail.component.html'
})
export class NotificationParameterDetailComponent implements OnInit {
    notificationParameter: INotificationParameter;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ notificationParameter }) => {
            this.notificationParameter = notificationParameter;
        });
    }

    previousState() {
        window.history.back();
    }
}

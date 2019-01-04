import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { INotificationParameter } from 'app/shared/model/notification-parameter.model';
import { NotificationParameterService } from './notification-parameter.service';
import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from 'app/entities/notification';

@Component({
    selector: 'jhi-notification-parameter-update',
    templateUrl: './notification-parameter-update.component.html'
})
export class NotificationParameterUpdateComponent implements OnInit {
    notificationParameter: INotificationParameter;
    isSaving: boolean;

    notifications: INotification[];
    scaneDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected notificationParameterService: NotificationParameterService,
        protected notificationService: NotificationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ notificationParameter }) => {
            this.notificationParameter = notificationParameter;
        });
        this.notificationService.query().subscribe(
            (res: HttpResponse<INotification[]>) => {
                this.notifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.notificationParameter.id !== undefined) {
            this.subscribeToSaveResponse(this.notificationParameterService.update(this.notificationParameter));
        } else {
            this.subscribeToSaveResponse(this.notificationParameterService.create(this.notificationParameter));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INotificationParameter>>) {
        result.subscribe(
            (res: HttpResponse<INotificationParameter>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackNotificationById(index: number, item: INotification) {
        return item.id;
    }
}

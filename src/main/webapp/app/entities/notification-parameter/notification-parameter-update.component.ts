import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { INotificationParameter } from 'app/shared/model/notification-parameter.model';
import { NotificationParameterService } from './notification-parameter.service';

@Component({
    selector: 'jhi-notification-parameter-update',
    templateUrl: './notification-parameter-update.component.html'
})
export class NotificationParameterUpdateComponent implements OnInit {
    notificationParameter: INotificationParameter;
    isSaving: boolean;
    scaneDateDp: any;

    constructor(protected notificationParameterService: NotificationParameterService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ notificationParameter }) => {
            this.notificationParameter = notificationParameter;
        });
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
}

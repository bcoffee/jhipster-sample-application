import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INotificationParameter } from 'app/shared/model/notification-parameter.model';
import { AccountService } from 'app/core';
import { NotificationParameterService } from './notification-parameter.service';

@Component({
    selector: 'jhi-notification-parameter',
    templateUrl: './notification-parameter.component.html'
})
export class NotificationParameterComponent implements OnInit, OnDestroy {
    notificationParameters: INotificationParameter[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected notificationParameterService: NotificationParameterService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.notificationParameterService.query().subscribe(
            (res: HttpResponse<INotificationParameter[]>) => {
                this.notificationParameters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNotificationParameters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INotificationParameter) {
        return item.id;
    }

    registerChangeInNotificationParameters() {
        this.eventSubscriber = this.eventManager.subscribe('notificationParameterListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

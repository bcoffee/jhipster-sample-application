import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReportSubscription } from 'app/shared/model/report-subscription.model';
import { AccountService } from 'app/core';
import { ReportSubscriptionService } from './report-subscription.service';

@Component({
    selector: 'jhi-report-subscription',
    templateUrl: './report-subscription.component.html'
})
export class ReportSubscriptionComponent implements OnInit, OnDestroy {
    reportSubscriptions: IReportSubscription[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected reportSubscriptionService: ReportSubscriptionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.reportSubscriptionService.query().subscribe(
            (res: HttpResponse<IReportSubscription[]>) => {
                this.reportSubscriptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReportSubscriptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReportSubscription) {
        return item.id;
    }

    registerChangeInReportSubscriptions() {
        this.eventSubscriber = this.eventManager.subscribe('reportSubscriptionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

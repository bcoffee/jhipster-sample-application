import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReportType } from 'app/shared/model/report-type.model';
import { AccountService } from 'app/core';
import { ReportTypeService } from './report-type.service';

@Component({
    selector: 'jhi-report-type',
    templateUrl: './report-type.component.html'
})
export class ReportTypeComponent implements OnInit, OnDestroy {
    reportTypes: IReportType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected reportTypeService: ReportTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.reportTypeService.query().subscribe(
            (res: HttpResponse<IReportType[]>) => {
                this.reportTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReportTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReportType) {
        return item.id;
    }

    registerChangeInReportTypes() {
        this.eventSubscriber = this.eventManager.subscribe('reportTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

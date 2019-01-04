import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReportCategory } from 'app/shared/model/report-category.model';
import { AccountService } from 'app/core';
import { ReportCategoryService } from './report-category.service';

@Component({
    selector: 'jhi-report-category',
    templateUrl: './report-category.component.html'
})
export class ReportCategoryComponent implements OnInit, OnDestroy {
    reportCategories: IReportCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected reportCategoryService: ReportCategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.reportCategoryService.query().subscribe(
            (res: HttpResponse<IReportCategory[]>) => {
                this.reportCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReportCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReportCategory) {
        return item.id;
    }

    registerChangeInReportCategories() {
        this.eventSubscriber = this.eventManager.subscribe('reportCategoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

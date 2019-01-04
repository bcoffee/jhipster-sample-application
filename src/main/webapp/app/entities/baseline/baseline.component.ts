import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBaseline } from 'app/shared/model/baseline.model';
import { AccountService } from 'app/core';
import { BaselineService } from './baseline.service';

@Component({
    selector: 'jhi-baseline',
    templateUrl: './baseline.component.html'
})
export class BaselineComponent implements OnInit, OnDestroy {
    baselines: IBaseline[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected baselineService: BaselineService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.baselineService.query().subscribe(
            (res: HttpResponse<IBaseline[]>) => {
                this.baselines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBaselines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBaseline) {
        return item.id;
    }

    registerChangeInBaselines() {
        this.eventSubscriber = this.eventManager.subscribe('baselineListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDistributionList } from 'app/shared/model/distribution-list.model';
import { AccountService } from 'app/core';
import { DistributionListService } from './distribution-list.service';

@Component({
    selector: 'jhi-distribution-list',
    templateUrl: './distribution-list.component.html'
})
export class DistributionListComponent implements OnInit, OnDestroy {
    distributionLists: IDistributionList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected distributionListService: DistributionListService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.distributionListService.query().subscribe(
            (res: HttpResponse<IDistributionList[]>) => {
                this.distributionLists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDistributionLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDistributionList) {
        return item.id;
    }

    registerChangeInDistributionLists() {
        this.eventSubscriber = this.eventManager.subscribe('distributionListListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IModelCode } from 'app/shared/model/model-code.model';
import { AccountService } from 'app/core';
import { ModelCodeService } from './model-code.service';

@Component({
    selector: 'jhi-model-code',
    templateUrl: './model-code.component.html'
})
export class ModelCodeComponent implements OnInit, OnDestroy {
    modelCodes: IModelCode[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected modelCodeService: ModelCodeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.modelCodeService.query().subscribe(
            (res: HttpResponse<IModelCode[]>) => {
                this.modelCodes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInModelCodes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IModelCode) {
        return item.id;
    }

    registerChangeInModelCodes() {
        this.eventSubscriber = this.eventManager.subscribe('modelCodeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

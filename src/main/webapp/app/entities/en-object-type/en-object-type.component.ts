import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEnObjectType } from 'app/shared/model/en-object-type.model';
import { AccountService } from 'app/core';
import { EnObjectTypeService } from './en-object-type.service';

@Component({
    selector: 'jhi-en-object-type',
    templateUrl: './en-object-type.component.html'
})
export class EnObjectTypeComponent implements OnInit, OnDestroy {
    enObjectTypes: IEnObjectType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected enObjectTypeService: EnObjectTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.enObjectTypeService.query().subscribe(
            (res: HttpResponse<IEnObjectType[]>) => {
                this.enObjectTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEnObjectTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEnObjectType) {
        return item.id;
    }

    registerChangeInEnObjectTypes() {
        this.eventSubscriber = this.eventManager.subscribe('enObjectTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

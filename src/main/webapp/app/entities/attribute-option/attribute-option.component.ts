import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAttributeOption } from 'app/shared/model/attribute-option.model';
import { AccountService } from 'app/core';
import { AttributeOptionService } from './attribute-option.service';

@Component({
    selector: 'jhi-attribute-option',
    templateUrl: './attribute-option.component.html'
})
export class AttributeOptionComponent implements OnInit, OnDestroy {
    attributeOptions: IAttributeOption[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected attributeOptionService: AttributeOptionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.attributeOptionService.query().subscribe(
            (res: HttpResponse<IAttributeOption[]>) => {
                this.attributeOptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAttributeOptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAttributeOption) {
        return item.id;
    }

    registerChangeInAttributeOptions() {
        this.eventSubscriber = this.eventManager.subscribe('attributeOptionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

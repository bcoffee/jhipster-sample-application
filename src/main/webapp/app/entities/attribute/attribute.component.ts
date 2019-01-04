import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAttribute } from 'app/shared/model/attribute.model';
import { AccountService } from 'app/core';
import { AttributeService } from './attribute.service';

@Component({
    selector: 'jhi-attribute',
    templateUrl: './attribute.component.html'
})
export class AttributeComponent implements OnInit, OnDestroy {
    attributes: IAttribute[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected attributeService: AttributeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.attributeService.query().subscribe(
            (res: HttpResponse<IAttribute[]>) => {
                this.attributes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAttributes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAttribute) {
        return item.id;
    }

    registerChangeInAttributes() {
        this.eventSubscriber = this.eventManager.subscribe('attributeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

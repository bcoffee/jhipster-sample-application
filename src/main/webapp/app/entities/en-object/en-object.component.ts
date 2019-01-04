import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEnObject } from 'app/shared/model/en-object.model';
import { AccountService } from 'app/core';
import { EnObjectService } from './en-object.service';

@Component({
    selector: 'jhi-en-object',
    templateUrl: './en-object.component.html'
})
export class EnObjectComponent implements OnInit, OnDestroy {
    enObjects: IEnObject[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected enObjectService: EnObjectService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.enObjectService.query().subscribe(
            (res: HttpResponse<IEnObject[]>) => {
                this.enObjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEnObjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEnObject) {
        return item.id;
    }

    registerChangeInEnObjects() {
        this.eventSubscriber = this.eventManager.subscribe('enObjectListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

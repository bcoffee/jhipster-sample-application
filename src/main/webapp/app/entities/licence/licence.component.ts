import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILicence } from 'app/shared/model/licence.model';
import { AccountService } from 'app/core';
import { LicenceService } from './licence.service';

@Component({
    selector: 'jhi-licence',
    templateUrl: './licence.component.html'
})
export class LicenceComponent implements OnInit, OnDestroy {
    licences: ILicence[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected licenceService: LicenceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.licenceService.query().subscribe(
            (res: HttpResponse<ILicence[]>) => {
                this.licences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLicences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILicence) {
        return item.id;
    }

    registerChangeInLicences() {
        this.eventSubscriber = this.eventManager.subscribe('licenceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

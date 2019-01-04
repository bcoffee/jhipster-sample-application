import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInstallation } from 'app/shared/model/installation.model';
import { AccountService } from 'app/core';
import { InstallationService } from './installation.service';

@Component({
    selector: 'jhi-installation',
    templateUrl: './installation.component.html'
})
export class InstallationComponent implements OnInit, OnDestroy {
    installations: IInstallation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected installationService: InstallationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.installationService.query().subscribe(
            (res: HttpResponse<IInstallation[]>) => {
                this.installations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInstallations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInstallation) {
        return item.id;
    }

    registerChangeInInstallations() {
        this.eventSubscriber = this.eventManager.subscribe('installationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserOption } from 'app/shared/model/user-option.model';
import { AccountService } from 'app/core';
import { UserOptionService } from './user-option.service';

@Component({
    selector: 'jhi-user-option',
    templateUrl: './user-option.component.html'
})
export class UserOptionComponent implements OnInit, OnDestroy {
    userOptions: IUserOption[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userOptionService: UserOptionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userOptionService.query().subscribe(
            (res: HttpResponse<IUserOption[]>) => {
                this.userOptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserOptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserOption) {
        return item.id;
    }

    registerChangeInUserOptions() {
        this.eventSubscriber = this.eventManager.subscribe('userOptionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

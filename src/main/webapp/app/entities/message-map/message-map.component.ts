import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMessageMap } from 'app/shared/model/message-map.model';
import { AccountService } from 'app/core';
import { MessageMapService } from './message-map.service';

@Component({
    selector: 'jhi-message-map',
    templateUrl: './message-map.component.html'
})
export class MessageMapComponent implements OnInit, OnDestroy {
    messageMaps: IMessageMap[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected messageMapService: MessageMapService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.messageMapService.query().subscribe(
            (res: HttpResponse<IMessageMap[]>) => {
                this.messageMaps = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMessageMaps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMessageMap) {
        return item.id;
    }

    registerChangeInMessageMaps() {
        this.eventSubscriber = this.eventManager.subscribe('messageMapListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

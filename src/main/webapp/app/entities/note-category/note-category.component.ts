import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INoteCategory } from 'app/shared/model/note-category.model';
import { AccountService } from 'app/core';
import { NoteCategoryService } from './note-category.service';

@Component({
    selector: 'jhi-note-category',
    templateUrl: './note-category.component.html'
})
export class NoteCategoryComponent implements OnInit, OnDestroy {
    noteCategories: INoteCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected noteCategoryService: NoteCategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.noteCategoryService.query().subscribe(
            (res: HttpResponse<INoteCategory[]>) => {
                this.noteCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNoteCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INoteCategory) {
        return item.id;
    }

    registerChangeInNoteCategories() {
        this.eventSubscriber = this.eventManager.subscribe('noteCategoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

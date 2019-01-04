import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INoteCategory } from 'app/shared/model/note-category.model';
import { NoteCategoryService } from './note-category.service';

@Component({
    selector: 'jhi-note-category-delete-dialog',
    templateUrl: './note-category-delete-dialog.component.html'
})
export class NoteCategoryDeleteDialogComponent {
    noteCategory: INoteCategory;

    constructor(
        protected noteCategoryService: NoteCategoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.noteCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'noteCategoryListModification',
                content: 'Deleted an noteCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-note-category-delete-popup',
    template: ''
})
export class NoteCategoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ noteCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NoteCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.noteCategory = noteCategory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

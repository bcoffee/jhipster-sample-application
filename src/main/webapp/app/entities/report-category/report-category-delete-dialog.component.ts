import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReportCategory } from 'app/shared/model/report-category.model';
import { ReportCategoryService } from './report-category.service';

@Component({
    selector: 'jhi-report-category-delete-dialog',
    templateUrl: './report-category-delete-dialog.component.html'
})
export class ReportCategoryDeleteDialogComponent {
    reportCategory: IReportCategory;

    constructor(
        protected reportCategoryService: ReportCategoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reportCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reportCategoryListModification',
                content: 'Deleted an reportCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-report-category-delete-popup',
    template: ''
})
export class ReportCategoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reportCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReportCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.reportCategory = reportCategory;
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

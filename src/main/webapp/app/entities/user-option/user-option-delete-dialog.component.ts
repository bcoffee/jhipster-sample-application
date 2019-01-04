import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserOption } from 'app/shared/model/user-option.model';
import { UserOptionService } from './user-option.service';

@Component({
    selector: 'jhi-user-option-delete-dialog',
    templateUrl: './user-option-delete-dialog.component.html'
})
export class UserOptionDeleteDialogComponent {
    userOption: IUserOption;

    constructor(
        protected userOptionService: UserOptionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userOptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userOptionListModification',
                content: 'Deleted an userOption'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-option-delete-popup',
    template: ''
})
export class UserOptionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userOption }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserOptionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.userOption = userOption;
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

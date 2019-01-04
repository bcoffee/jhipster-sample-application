import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INotificationParameter } from 'app/shared/model/notification-parameter.model';
import { NotificationParameterService } from './notification-parameter.service';

@Component({
    selector: 'jhi-notification-parameter-delete-dialog',
    templateUrl: './notification-parameter-delete-dialog.component.html'
})
export class NotificationParameterDeleteDialogComponent {
    notificationParameter: INotificationParameter;

    constructor(
        protected notificationParameterService: NotificationParameterService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notificationParameterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'notificationParameterListModification',
                content: 'Deleted an notificationParameter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notification-parameter-delete-popup',
    template: ''
})
export class NotificationParameterDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ notificationParameter }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NotificationParameterDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.notificationParameter = notificationParameter;
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

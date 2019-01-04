import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMessageMap } from 'app/shared/model/message-map.model';
import { MessageMapService } from './message-map.service';

@Component({
    selector: 'jhi-message-map-delete-dialog',
    templateUrl: './message-map-delete-dialog.component.html'
})
export class MessageMapDeleteDialogComponent {
    messageMap: IMessageMap;

    constructor(
        protected messageMapService: MessageMapService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.messageMapService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'messageMapListModification',
                content: 'Deleted an messageMap'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-message-map-delete-popup',
    template: ''
})
export class MessageMapDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ messageMap }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MessageMapDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.messageMap = messageMap;
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

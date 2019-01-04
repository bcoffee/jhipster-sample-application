import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMessageMap } from 'app/shared/model/message-map.model';
import { MessageMapService } from './message-map.service';
import { IMessageType } from 'app/shared/model/message-type.model';
import { MessageTypeService } from 'app/entities/message-type';

@Component({
    selector: 'jhi-message-map-update',
    templateUrl: './message-map-update.component.html'
})
export class MessageMapUpdateComponent implements OnInit {
    messageMap: IMessageMap;
    isSaving: boolean;

    messagetypes: IMessageType[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected messageMapService: MessageMapService,
        protected messageTypeService: MessageTypeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ messageMap }) => {
            this.messageMap = messageMap;
        });
        this.messageTypeService.query({ filter: 'messagemap-is-null' }).subscribe(
            (res: HttpResponse<IMessageType[]>) => {
                if (!this.messageMap.messageType || !this.messageMap.messageType.id) {
                    this.messagetypes = res.body;
                } else {
                    this.messageTypeService.find(this.messageMap.messageType.id).subscribe(
                        (subRes: HttpResponse<IMessageType>) => {
                            this.messagetypes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.messageMap.id !== undefined) {
            this.subscribeToSaveResponse(this.messageMapService.update(this.messageMap));
        } else {
            this.subscribeToSaveResponse(this.messageMapService.create(this.messageMap));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageMap>>) {
        result.subscribe((res: HttpResponse<IMessageMap>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMessageTypeById(index: number, item: IMessageType) {
        return item.id;
    }
}

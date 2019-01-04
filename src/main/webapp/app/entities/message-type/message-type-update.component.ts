import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMessageType } from 'app/shared/model/message-type.model';
import { MessageTypeService } from './message-type.service';

@Component({
    selector: 'jhi-message-type-update',
    templateUrl: './message-type-update.component.html'
})
export class MessageTypeUpdateComponent implements OnInit {
    messageType: IMessageType;
    isSaving: boolean;

    constructor(protected messageTypeService: MessageTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ messageType }) => {
            this.messageType = messageType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.messageType.id !== undefined) {
            this.subscribeToSaveResponse(this.messageTypeService.update(this.messageType));
        } else {
            this.subscribeToSaveResponse(this.messageTypeService.create(this.messageType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageType>>) {
        result.subscribe((res: HttpResponse<IMessageType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

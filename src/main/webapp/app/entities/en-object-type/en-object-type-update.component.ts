import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEnObjectType } from 'app/shared/model/en-object-type.model';
import { EnObjectTypeService } from './en-object-type.service';

@Component({
    selector: 'jhi-en-object-type-update',
    templateUrl: './en-object-type-update.component.html'
})
export class EnObjectTypeUpdateComponent implements OnInit {
    enObjectType: IEnObjectType;
    isSaving: boolean;

    constructor(protected enObjectTypeService: EnObjectTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ enObjectType }) => {
            this.enObjectType = enObjectType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.enObjectType.id !== undefined) {
            this.subscribeToSaveResponse(this.enObjectTypeService.update(this.enObjectType));
        } else {
            this.subscribeToSaveResponse(this.enObjectTypeService.create(this.enObjectType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnObjectType>>) {
        result.subscribe((res: HttpResponse<IEnObjectType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

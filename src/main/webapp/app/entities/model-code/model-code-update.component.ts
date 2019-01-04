import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IModelCode } from 'app/shared/model/model-code.model';
import { ModelCodeService } from './model-code.service';

@Component({
    selector: 'jhi-model-code-update',
    templateUrl: './model-code-update.component.html'
})
export class ModelCodeUpdateComponent implements OnInit {
    modelCode: IModelCode;
    isSaving: boolean;

    constructor(protected modelCodeService: ModelCodeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ modelCode }) => {
            this.modelCode = modelCode;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.modelCode.id !== undefined) {
            this.subscribeToSaveResponse(this.modelCodeService.update(this.modelCode));
        } else {
            this.subscribeToSaveResponse(this.modelCodeService.create(this.modelCode));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IModelCode>>) {
        result.subscribe((res: HttpResponse<IModelCode>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

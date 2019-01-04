import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IModel } from 'app/shared/model/model.model';
import { ModelService } from './model.service';

@Component({
    selector: 'jhi-model-update',
    templateUrl: './model-update.component.html'
})
export class ModelUpdateComponent implements OnInit {
    model: IModel;
    isSaving: boolean;

    constructor(protected modelService: ModelService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ model }) => {
            this.model = model;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.model.id !== undefined) {
            this.subscribeToSaveResponse(this.modelService.update(this.model));
        } else {
            this.subscribeToSaveResponse(this.modelService.create(this.model));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IModel>>) {
        result.subscribe((res: HttpResponse<IModel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

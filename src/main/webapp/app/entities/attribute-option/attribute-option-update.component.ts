import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAttributeOption } from 'app/shared/model/attribute-option.model';
import { AttributeOptionService } from './attribute-option.service';

@Component({
    selector: 'jhi-attribute-option-update',
    templateUrl: './attribute-option-update.component.html'
})
export class AttributeOptionUpdateComponent implements OnInit {
    attributeOption: IAttributeOption;
    isSaving: boolean;

    constructor(protected attributeOptionService: AttributeOptionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ attributeOption }) => {
            this.attributeOption = attributeOption;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.attributeOption.id !== undefined) {
            this.subscribeToSaveResponse(this.attributeOptionService.update(this.attributeOption));
        } else {
            this.subscribeToSaveResponse(this.attributeOptionService.create(this.attributeOption));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttributeOption>>) {
        result.subscribe((res: HttpResponse<IAttributeOption>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

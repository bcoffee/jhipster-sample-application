import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAttribute } from 'app/shared/model/attribute.model';
import { AttributeService } from './attribute.service';
import { IEnObject } from 'app/shared/model/en-object.model';
import { EnObjectService } from 'app/entities/en-object';

@Component({
    selector: 'jhi-attribute-update',
    templateUrl: './attribute-update.component.html'
})
export class AttributeUpdateComponent implements OnInit {
    attribute: IAttribute;
    isSaving: boolean;

    enobjects: IEnObject[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected attributeService: AttributeService,
        protected enObjectService: EnObjectService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ attribute }) => {
            this.attribute = attribute;
        });
        this.enObjectService.query().subscribe(
            (res: HttpResponse<IEnObject[]>) => {
                this.enobjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.attribute.id !== undefined) {
            this.subscribeToSaveResponse(this.attributeService.update(this.attribute));
        } else {
            this.subscribeToSaveResponse(this.attributeService.create(this.attribute));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttribute>>) {
        result.subscribe((res: HttpResponse<IAttribute>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEnObjectById(index: number, item: IEnObject) {
        return item.id;
    }
}

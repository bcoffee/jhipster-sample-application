import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEnObject } from 'app/shared/model/en-object.model';
import { EnObjectService } from './en-object.service';
import { IEnObjectType } from 'app/shared/model/en-object-type.model';
import { EnObjectTypeService } from 'app/entities/en-object-type';

@Component({
    selector: 'jhi-en-object-update',
    templateUrl: './en-object-update.component.html'
})
export class EnObjectUpdateComponent implements OnInit {
    enObject: IEnObject;
    isSaving: boolean;

    objecttypes: IEnObjectType[];

    objectparents: IEnObject[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected enObjectService: EnObjectService,
        protected enObjectTypeService: EnObjectTypeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ enObject }) => {
            this.enObject = enObject;
        });
        this.enObjectTypeService.query({ filter: 'enobject-is-null' }).subscribe(
            (res: HttpResponse<IEnObjectType[]>) => {
                if (!this.enObject.objectType || !this.enObject.objectType.id) {
                    this.objecttypes = res.body;
                } else {
                    this.enObjectTypeService.find(this.enObject.objectType.id).subscribe(
                        (subRes: HttpResponse<IEnObjectType>) => {
                            this.objecttypes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.enObjectService.query({ filter: 'enobject-is-null' }).subscribe(
            (res: HttpResponse<IEnObject[]>) => {
                if (!this.enObject.objectParent || !this.enObject.objectParent.id) {
                    this.objectparents = res.body;
                } else {
                    this.enObjectService.find(this.enObject.objectParent.id).subscribe(
                        (subRes: HttpResponse<IEnObject>) => {
                            this.objectparents = [subRes.body].concat(res.body);
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
        if (this.enObject.id !== undefined) {
            this.subscribeToSaveResponse(this.enObjectService.update(this.enObject));
        } else {
            this.subscribeToSaveResponse(this.enObjectService.create(this.enObject));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnObject>>) {
        result.subscribe((res: HttpResponse<IEnObject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEnObjectTypeById(index: number, item: IEnObjectType) {
        return item.id;
    }

    trackEnObjectById(index: number, item: IEnObject) {
        return item.id;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBaseline } from 'app/shared/model/baseline.model';
import { BaselineService } from './baseline.service';
import { IModel } from 'app/shared/model/model.model';
import { ModelService } from 'app/entities/model';
import { IModelCode } from 'app/shared/model/model-code.model';
import { ModelCodeService } from 'app/entities/model-code';

@Component({
    selector: 'jhi-baseline-update',
    templateUrl: './baseline-update.component.html'
})
export class BaselineUpdateComponent implements OnInit {
    baseline: IBaseline;
    isSaving: boolean;

    baselinemodels: IModel[];

    baselinecodes: IModelCode[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected baselineService: BaselineService,
        protected modelService: ModelService,
        protected modelCodeService: ModelCodeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ baseline }) => {
            this.baseline = baseline;
        });
        this.modelService.query({ filter: 'baseline-is-null' }).subscribe(
            (res: HttpResponse<IModel[]>) => {
                if (!this.baseline.baselineModel || !this.baseline.baselineModel.id) {
                    this.baselinemodels = res.body;
                } else {
                    this.modelService.find(this.baseline.baselineModel.id).subscribe(
                        (subRes: HttpResponse<IModel>) => {
                            this.baselinemodels = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.modelCodeService.query({ filter: 'baseline-is-null' }).subscribe(
            (res: HttpResponse<IModelCode[]>) => {
                if (!this.baseline.baselineCode || !this.baseline.baselineCode.id) {
                    this.baselinecodes = res.body;
                } else {
                    this.modelCodeService.find(this.baseline.baselineCode.id).subscribe(
                        (subRes: HttpResponse<IModelCode>) => {
                            this.baselinecodes = [subRes.body].concat(res.body);
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
        if (this.baseline.id !== undefined) {
            this.subscribeToSaveResponse(this.baselineService.update(this.baseline));
        } else {
            this.subscribeToSaveResponse(this.baselineService.create(this.baseline));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBaseline>>) {
        result.subscribe((res: HttpResponse<IBaseline>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackModelById(index: number, item: IModel) {
        return item.id;
    }

    trackModelCodeById(index: number, item: IModelCode) {
        return item.id;
    }
}

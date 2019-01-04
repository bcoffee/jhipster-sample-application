import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReportType } from 'app/shared/model/report-type.model';
import { ReportTypeService } from './report-type.service';

@Component({
    selector: 'jhi-report-type-update',
    templateUrl: './report-type-update.component.html'
})
export class ReportTypeUpdateComponent implements OnInit {
    reportType: IReportType;
    isSaving: boolean;

    constructor(protected reportTypeService: ReportTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reportType }) => {
            this.reportType = reportType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.reportType.id !== undefined) {
            this.subscribeToSaveResponse(this.reportTypeService.update(this.reportType));
        } else {
            this.subscribeToSaveResponse(this.reportTypeService.create(this.reportType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportType>>) {
        result.subscribe((res: HttpResponse<IReportType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

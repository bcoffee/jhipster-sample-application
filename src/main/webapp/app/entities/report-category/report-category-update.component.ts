import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReportCategory } from 'app/shared/model/report-category.model';
import { ReportCategoryService } from './report-category.service';

@Component({
    selector: 'jhi-report-category-update',
    templateUrl: './report-category-update.component.html'
})
export class ReportCategoryUpdateComponent implements OnInit {
    reportCategory: IReportCategory;
    isSaving: boolean;

    constructor(protected reportCategoryService: ReportCategoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reportCategory }) => {
            this.reportCategory = reportCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.reportCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.reportCategoryService.update(this.reportCategory));
        } else {
            this.subscribeToSaveResponse(this.reportCategoryService.create(this.reportCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportCategory>>) {
        result.subscribe((res: HttpResponse<IReportCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

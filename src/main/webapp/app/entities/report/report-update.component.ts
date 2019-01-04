import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IReport } from 'app/shared/model/report.model';
import { ReportService } from './report.service';
import { IReportType } from 'app/shared/model/report-type.model';
import { ReportTypeService } from 'app/entities/report-type';
import { IUser, UserService } from 'app/core';
import { IReportCategory } from 'app/shared/model/report-category.model';
import { ReportCategoryService } from 'app/entities/report-category';

@Component({
    selector: 'jhi-report-update',
    templateUrl: './report-update.component.html'
})
export class ReportUpdateComponent implements OnInit {
    report: IReport;
    isSaving: boolean;

    reporttypes: IReportType[];

    users: IUser[];

    reportcategories: IReportCategory[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected reportService: ReportService,
        protected reportTypeService: ReportTypeService,
        protected userService: UserService,
        protected reportCategoryService: ReportCategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ report }) => {
            this.report = report;
        });
        this.reportTypeService.query({ filter: 'report-is-null' }).subscribe(
            (res: HttpResponse<IReportType[]>) => {
                if (!this.report.reportType || !this.report.reportType.id) {
                    this.reporttypes = res.body;
                } else {
                    this.reportTypeService.find(this.report.reportType.id).subscribe(
                        (subRes: HttpResponse<IReportType>) => {
                            this.reporttypes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.reportCategoryService.query({ filter: 'report-is-null' }).subscribe(
            (res: HttpResponse<IReportCategory[]>) => {
                if (!this.report.reportCategory || !this.report.reportCategory.id) {
                    this.reportcategories = res.body;
                } else {
                    this.reportCategoryService.find(this.report.reportCategory.id).subscribe(
                        (subRes: HttpResponse<IReportCategory>) => {
                            this.reportcategories = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.report.id !== undefined) {
            this.subscribeToSaveResponse(this.reportService.update(this.report));
        } else {
            this.subscribeToSaveResponse(this.reportService.create(this.report));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReport>>) {
        result.subscribe((res: HttpResponse<IReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReportTypeById(index: number, item: IReportType) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackReportCategoryById(index: number, item: IReportCategory) {
        return item.id;
    }
}

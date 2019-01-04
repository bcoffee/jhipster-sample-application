import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReportCategory } from 'app/shared/model/report-category.model';

@Component({
    selector: 'jhi-report-category-detail',
    templateUrl: './report-category-detail.component.html'
})
export class ReportCategoryDetailComponent implements OnInit {
    reportCategory: IReportCategory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reportCategory }) => {
            this.reportCategory = reportCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}

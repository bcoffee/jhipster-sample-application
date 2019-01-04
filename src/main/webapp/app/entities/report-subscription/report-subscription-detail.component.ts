import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReportSubscription } from 'app/shared/model/report-subscription.model';

@Component({
    selector: 'jhi-report-subscription-detail',
    templateUrl: './report-subscription-detail.component.html'
})
export class ReportSubscriptionDetailComponent implements OnInit {
    reportSubscription: IReportSubscription;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reportSubscription }) => {
            this.reportSubscription = reportSubscription;
        });
    }

    previousState() {
        window.history.back();
    }
}

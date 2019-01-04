import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IReportSubscription } from 'app/shared/model/report-subscription.model';
import { ReportSubscriptionService } from './report-subscription.service';
import { IReport } from 'app/shared/model/report.model';
import { ReportService } from 'app/entities/report';
import { IDistributionList } from 'app/shared/model/distribution-list.model';
import { DistributionListService } from 'app/entities/distribution-list';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-report-subscription-update',
    templateUrl: './report-subscription-update.component.html'
})
export class ReportSubscriptionUpdateComponent implements OnInit {
    reportSubscription: IReportSubscription;
    isSaving: boolean;

    subscriptionreports: IReport[];

    subscriptiondistributionlists: IDistributionList[];

    users: IUser[];
    startDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected reportSubscriptionService: ReportSubscriptionService,
        protected reportService: ReportService,
        protected distributionListService: DistributionListService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reportSubscription }) => {
            this.reportSubscription = reportSubscription;
        });
        this.reportService.query({ filter: 'reportsubscription-is-null' }).subscribe(
            (res: HttpResponse<IReport[]>) => {
                if (!this.reportSubscription.subscriptionReport || !this.reportSubscription.subscriptionReport.id) {
                    this.subscriptionreports = res.body;
                } else {
                    this.reportService.find(this.reportSubscription.subscriptionReport.id).subscribe(
                        (subRes: HttpResponse<IReport>) => {
                            this.subscriptionreports = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.distributionListService.query({ filter: 'reportsubscription-is-null' }).subscribe(
            (res: HttpResponse<IDistributionList[]>) => {
                if (!this.reportSubscription.subscriptionDistributionList || !this.reportSubscription.subscriptionDistributionList.id) {
                    this.subscriptiondistributionlists = res.body;
                } else {
                    this.distributionListService.find(this.reportSubscription.subscriptionDistributionList.id).subscribe(
                        (subRes: HttpResponse<IDistributionList>) => {
                            this.subscriptiondistributionlists = [subRes.body].concat(res.body);
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
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.reportSubscription.id !== undefined) {
            this.subscribeToSaveResponse(this.reportSubscriptionService.update(this.reportSubscription));
        } else {
            this.subscribeToSaveResponse(this.reportSubscriptionService.create(this.reportSubscription));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportSubscription>>) {
        result.subscribe((res: HttpResponse<IReportSubscription>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReportById(index: number, item: IReport) {
        return item.id;
    }

    trackDistributionListById(index: number, item: IDistributionList) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from './notification.service';
import { IDistributionList } from 'app/shared/model/distribution-list.model';
import { DistributionListService } from 'app/entities/distribution-list';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-notification-update',
    templateUrl: './notification-update.component.html'
})
export class NotificationUpdateComponent implements OnInit {
    notification: INotification;
    isSaving: boolean;

    notificationdistributionlists: IDistributionList[];

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected notificationService: NotificationService,
        protected distributionListService: DistributionListService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ notification }) => {
            this.notification = notification;
        });
        this.distributionListService.query({ filter: 'notification-is-null' }).subscribe(
            (res: HttpResponse<IDistributionList[]>) => {
                if (!this.notification.notificationDistributionList || !this.notification.notificationDistributionList.id) {
                    this.notificationdistributionlists = res.body;
                } else {
                    this.distributionListService.find(this.notification.notificationDistributionList.id).subscribe(
                        (subRes: HttpResponse<IDistributionList>) => {
                            this.notificationdistributionlists = [subRes.body].concat(res.body);
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
        if (this.notification.id !== undefined) {
            this.subscribeToSaveResponse(this.notificationService.update(this.notification));
        } else {
            this.subscribeToSaveResponse(this.notificationService.create(this.notification));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>) {
        result.subscribe((res: HttpResponse<INotification>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDistributionListById(index: number, item: IDistributionList) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}

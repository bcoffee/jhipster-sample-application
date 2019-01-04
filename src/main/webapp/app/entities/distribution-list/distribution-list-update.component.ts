import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDistributionList } from 'app/shared/model/distribution-list.model';
import { DistributionListService } from './distribution-list.service';

@Component({
    selector: 'jhi-distribution-list-update',
    templateUrl: './distribution-list-update.component.html'
})
export class DistributionListUpdateComponent implements OnInit {
    distributionList: IDistributionList;
    isSaving: boolean;

    constructor(protected distributionListService: DistributionListService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ distributionList }) => {
            this.distributionList = distributionList;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.distributionList.id !== undefined) {
            this.subscribeToSaveResponse(this.distributionListService.update(this.distributionList));
        } else {
            this.subscribeToSaveResponse(this.distributionListService.create(this.distributionList));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDistributionList>>) {
        result.subscribe((res: HttpResponse<IDistributionList>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

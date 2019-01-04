import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { ILicence } from 'app/shared/model/licence.model';
import { LicenceService } from './licence.service';

@Component({
    selector: 'jhi-licence-update',
    templateUrl: './licence-update.component.html'
})
export class LicenceUpdateComponent implements OnInit {
    licence: ILicence;
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;

    constructor(protected licenceService: LicenceService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ licence }) => {
            this.licence = licence;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.licence.id !== undefined) {
            this.subscribeToSaveResponse(this.licenceService.update(this.licence));
        } else {
            this.subscribeToSaveResponse(this.licenceService.create(this.licence));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILicence>>) {
        result.subscribe((res: HttpResponse<ILicence>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

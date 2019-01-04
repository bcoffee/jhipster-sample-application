import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInstallation } from 'app/shared/model/installation.model';
import { InstallationService } from './installation.service';
import { IEnObject } from 'app/shared/model/en-object.model';
import { EnObjectService } from 'app/entities/en-object';
import { ILicence } from 'app/shared/model/licence.model';
import { LicenceService } from 'app/entities/licence';

@Component({
    selector: 'jhi-installation-update',
    templateUrl: './installation-update.component.html'
})
export class InstallationUpdateComponent implements OnInit {
    installation: IInstallation;
    isSaving: boolean;

    installations: IEnObject[];

    installationlicences: ILicence[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected installationService: InstallationService,
        protected enObjectService: EnObjectService,
        protected licenceService: LicenceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ installation }) => {
            this.installation = installation;
        });
        this.enObjectService.query({ filter: 'installation-is-null' }).subscribe(
            (res: HttpResponse<IEnObject[]>) => {
                if (!this.installation.installation || !this.installation.installation.id) {
                    this.installations = res.body;
                } else {
                    this.enObjectService.find(this.installation.installation.id).subscribe(
                        (subRes: HttpResponse<IEnObject>) => {
                            this.installations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.licenceService.query({ filter: 'installation-is-null' }).subscribe(
            (res: HttpResponse<ILicence[]>) => {
                if (!this.installation.installationLicence || !this.installation.installationLicence.id) {
                    this.installationlicences = res.body;
                } else {
                    this.licenceService.find(this.installation.installationLicence.id).subscribe(
                        (subRes: HttpResponse<ILicence>) => {
                            this.installationlicences = [subRes.body].concat(res.body);
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
        if (this.installation.id !== undefined) {
            this.subscribeToSaveResponse(this.installationService.update(this.installation));
        } else {
            this.subscribeToSaveResponse(this.installationService.create(this.installation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstallation>>) {
        result.subscribe((res: HttpResponse<IInstallation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEnObjectById(index: number, item: IEnObject) {
        return item.id;
    }

    trackLicenceById(index: number, item: ILicence) {
        return item.id;
    }
}

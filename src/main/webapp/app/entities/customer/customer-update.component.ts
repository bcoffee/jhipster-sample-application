import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';
import { IInstallation } from 'app/shared/model/installation.model';
import { InstallationService } from 'app/entities/installation';

@Component({
    selector: 'jhi-customer-update',
    templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent implements OnInit {
    customer: ICustomer;
    isSaving: boolean;

    customerinstallations: IInstallation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected customerService: CustomerService,
        protected installationService: InstallationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
        this.installationService.query({ filter: 'customer-is-null' }).subscribe(
            (res: HttpResponse<IInstallation[]>) => {
                if (!this.customer.customerInstallation || !this.customer.customerInstallation.id) {
                    this.customerinstallations = res.body;
                } else {
                    this.installationService.find(this.customer.customerInstallation.id).subscribe(
                        (subRes: HttpResponse<IInstallation>) => {
                            this.customerinstallations = [subRes.body].concat(res.body);
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
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(this.customerService.create(this.customer));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>) {
        result.subscribe((res: HttpResponse<ICustomer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackInstallationById(index: number, item: IInstallation) {
        return item.id;
    }
}

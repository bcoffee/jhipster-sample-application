import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUserOption } from 'app/shared/model/user-option.model';
import { UserOptionService } from './user-option.service';

@Component({
    selector: 'jhi-user-option-update',
    templateUrl: './user-option-update.component.html'
})
export class UserOptionUpdateComponent implements OnInit {
    userOption: IUserOption;
    isSaving: boolean;

    constructor(protected userOptionService: UserOptionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userOption }) => {
            this.userOption = userOption;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userOption.id !== undefined) {
            this.subscribeToSaveResponse(this.userOptionService.update(this.userOption));
        } else {
            this.subscribeToSaveResponse(this.userOptionService.create(this.userOption));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserOption>>) {
        result.subscribe((res: HttpResponse<IUserOption>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserOption } from 'app/shared/model/user-option.model';

@Component({
    selector: 'jhi-user-option-detail',
    templateUrl: './user-option-detail.component.html'
})
export class UserOptionDetailComponent implements OnInit {
    userOption: IUserOption;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userOption }) => {
            this.userOption = userOption;
        });
    }

    previousState() {
        window.history.back();
    }
}

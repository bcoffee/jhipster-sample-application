import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnObjectType } from 'app/shared/model/en-object-type.model';

@Component({
    selector: 'jhi-en-object-type-detail',
    templateUrl: './en-object-type-detail.component.html'
})
export class EnObjectTypeDetailComponent implements OnInit {
    enObjectType: IEnObjectType;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enObjectType }) => {
            this.enObjectType = enObjectType;
        });
    }

    previousState() {
        window.history.back();
    }
}

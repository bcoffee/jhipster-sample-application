import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnObject } from 'app/shared/model/en-object.model';

@Component({
    selector: 'jhi-en-object-detail',
    templateUrl: './en-object-detail.component.html'
})
export class EnObjectDetailComponent implements OnInit {
    enObject: IEnObject;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enObject }) => {
            this.enObject = enObject;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBaseline } from 'app/shared/model/baseline.model';

@Component({
    selector: 'jhi-baseline-detail',
    templateUrl: './baseline-detail.component.html'
})
export class BaselineDetailComponent implements OnInit {
    baseline: IBaseline;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ baseline }) => {
            this.baseline = baseline;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDistributionList } from 'app/shared/model/distribution-list.model';

@Component({
    selector: 'jhi-distribution-list-detail',
    templateUrl: './distribution-list-detail.component.html'
})
export class DistributionListDetailComponent implements OnInit {
    distributionList: IDistributionList;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ distributionList }) => {
            this.distributionList = distributionList;
        });
    }

    previousState() {
        window.history.back();
    }
}

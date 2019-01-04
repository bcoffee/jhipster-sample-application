import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModelCode } from 'app/shared/model/model-code.model';

@Component({
    selector: 'jhi-model-code-detail',
    templateUrl: './model-code-detail.component.html'
})
export class ModelCodeDetailComponent implements OnInit {
    modelCode: IModelCode;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ modelCode }) => {
            this.modelCode = modelCode;
        });
    }

    previousState() {
        window.history.back();
    }
}

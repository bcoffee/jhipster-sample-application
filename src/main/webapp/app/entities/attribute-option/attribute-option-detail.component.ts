import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAttributeOption } from 'app/shared/model/attribute-option.model';

@Component({
    selector: 'jhi-attribute-option-detail',
    templateUrl: './attribute-option-detail.component.html'
})
export class AttributeOptionDetailComponent implements OnInit {
    attributeOption: IAttributeOption;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ attributeOption }) => {
            this.attributeOption = attributeOption;
        });
    }

    previousState() {
        window.history.back();
    }
}

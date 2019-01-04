import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMessageMap } from 'app/shared/model/message-map.model';

@Component({
    selector: 'jhi-message-map-detail',
    templateUrl: './message-map-detail.component.html'
})
export class MessageMapDetailComponent implements OnInit {
    messageMap: IMessageMap;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ messageMap }) => {
            this.messageMap = messageMap;
        });
    }

    previousState() {
        window.history.back();
    }
}

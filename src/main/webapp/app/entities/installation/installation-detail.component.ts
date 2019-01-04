import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInstallation } from 'app/shared/model/installation.model';

@Component({
    selector: 'jhi-installation-detail',
    templateUrl: './installation-detail.component.html'
})
export class InstallationDetailComponent implements OnInit {
    installation: IInstallation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ installation }) => {
            this.installation = installation;
        });
    }

    previousState() {
        window.history.back();
    }
}

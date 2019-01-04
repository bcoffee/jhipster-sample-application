import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INoteCategory } from 'app/shared/model/note-category.model';

@Component({
    selector: 'jhi-note-category-detail',
    templateUrl: './note-category-detail.component.html'
})
export class NoteCategoryDetailComponent implements OnInit {
    noteCategory: INoteCategory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ noteCategory }) => {
            this.noteCategory = noteCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}

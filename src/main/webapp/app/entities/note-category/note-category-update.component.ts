import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INoteCategory } from 'app/shared/model/note-category.model';
import { NoteCategoryService } from './note-category.service';

@Component({
    selector: 'jhi-note-category-update',
    templateUrl: './note-category-update.component.html'
})
export class NoteCategoryUpdateComponent implements OnInit {
    noteCategory: INoteCategory;
    isSaving: boolean;

    constructor(protected noteCategoryService: NoteCategoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ noteCategory }) => {
            this.noteCategory = noteCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.noteCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.noteCategoryService.update(this.noteCategory));
        } else {
            this.subscribeToSaveResponse(this.noteCategoryService.create(this.noteCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INoteCategory>>) {
        result.subscribe((res: HttpResponse<INoteCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

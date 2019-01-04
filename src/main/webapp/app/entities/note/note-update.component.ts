import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INote } from 'app/shared/model/note.model';
import { NoteService } from './note.service';
import { IUser, UserService } from 'app/core';
import { INoteCategory } from 'app/shared/model/note-category.model';
import { NoteCategoryService } from 'app/entities/note-category';

@Component({
    selector: 'jhi-note-update',
    templateUrl: './note-update.component.html'
})
export class NoteUpdateComponent implements OnInit {
    note: INote;
    isSaving: boolean;

    users: IUser[];

    parentnotes: INote[];

    notecategories: INoteCategory[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected noteService: NoteService,
        protected userService: UserService,
        protected noteCategoryService: NoteCategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ note }) => {
            this.note = note;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.noteService.query({ filter: 'note-is-null' }).subscribe(
            (res: HttpResponse<INote[]>) => {
                if (!this.note.parentNote || !this.note.parentNote.id) {
                    this.parentnotes = res.body;
                } else {
                    this.noteService.find(this.note.parentNote.id).subscribe(
                        (subRes: HttpResponse<INote>) => {
                            this.parentnotes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.noteCategoryService.query({ filter: 'note-is-null' }).subscribe(
            (res: HttpResponse<INoteCategory[]>) => {
                if (!this.note.noteCategory || !this.note.noteCategory.id) {
                    this.notecategories = res.body;
                } else {
                    this.noteCategoryService.find(this.note.noteCategory.id).subscribe(
                        (subRes: HttpResponse<INoteCategory>) => {
                            this.notecategories = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.note.id !== undefined) {
            this.subscribeToSaveResponse(this.noteService.update(this.note));
        } else {
            this.subscribeToSaveResponse(this.noteService.create(this.note));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INote>>) {
        result.subscribe((res: HttpResponse<INote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackNoteById(index: number, item: INote) {
        return item.id;
    }

    trackNoteCategoryById(index: number, item: INoteCategory) {
        return item.id;
    }
}

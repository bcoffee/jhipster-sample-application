/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { NoteCategoryComponent } from 'app/entities/note-category/note-category.component';
import { NoteCategoryService } from 'app/entities/note-category/note-category.service';
import { NoteCategory } from 'app/shared/model/note-category.model';

describe('Component Tests', () => {
    describe('NoteCategory Management Component', () => {
        let comp: NoteCategoryComponent;
        let fixture: ComponentFixture<NoteCategoryComponent>;
        let service: NoteCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [NoteCategoryComponent],
                providers: []
            })
                .overrideTemplate(NoteCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NoteCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoteCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NoteCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.noteCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

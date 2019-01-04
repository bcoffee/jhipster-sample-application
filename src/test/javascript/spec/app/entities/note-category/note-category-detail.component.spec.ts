/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { NoteCategoryDetailComponent } from 'app/entities/note-category/note-category-detail.component';
import { NoteCategory } from 'app/shared/model/note-category.model';

describe('Component Tests', () => {
    describe('NoteCategory Management Detail Component', () => {
        let comp: NoteCategoryDetailComponent;
        let fixture: ComponentFixture<NoteCategoryDetailComponent>;
        const route = ({ data: of({ noteCategory: new NoteCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [NoteCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NoteCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NoteCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.noteCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

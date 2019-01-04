/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { NotificationParameterService } from 'app/entities/notification-parameter/notification-parameter.service';
import { INotificationParameter, NotificationParameter } from 'app/shared/model/notification-parameter.model';

describe('Service Tests', () => {
    describe('NotificationParameter Service', () => {
        let injector: TestBed;
        let service: NotificationParameterService;
        let httpMock: HttpTestingController;
        let elemDefault: INotificationParameter;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(NotificationParameterService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new NotificationParameter(0, 'AAAAAAA', 0, 0, 0, 0, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        scaneDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a NotificationParameter', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        scaneDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        scaneDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new NotificationParameter(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a NotificationParameter', async () => {
                const returnedFromService = Object.assign(
                    {
                        measure: 'BBBBBB',
                        duration: 1,
                        durationTrack: 1,
                        count: 1,
                        countTrack: 1,
                        scaneDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        scaneDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of NotificationParameter', async () => {
                const returnedFromService = Object.assign(
                    {
                        measure: 'BBBBBB',
                        duration: 1,
                        durationTrack: 1,
                        count: 1,
                        countTrack: 1,
                        scaneDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        scaneDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a NotificationParameter', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});

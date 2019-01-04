/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ReportSubscriptionService } from 'app/entities/report-subscription/report-subscription.service';
import { IReportSubscription, ReportSubscription, Language } from 'app/shared/model/report-subscription.model';

describe('Service Tests', () => {
    describe('ReportSubscription Service', () => {
        let injector: TestBed;
        let service: ReportSubscriptionService;
        let httpMock: HttpTestingController;
        let elemDefault: IReportSubscription;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ReportSubscriptionService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new ReportSubscription(0, 'AAAAAAA', 'AAAAAAA', Language.ENGLISH, currentDate, 'AAAAAAA', 0, false, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        startDate: currentDate.format(DATE_FORMAT)
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

            it('should create a ReportSubscription', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        startDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        startDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new ReportSubscription(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ReportSubscription', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        language: 'BBBBBB',
                        startDate: currentDate.format(DATE_FORMAT),
                        range: 'BBBBBB',
                        rangeN: 1,
                        active: true,
                        emailMessage: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        startDate: currentDate
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

            it('should return a list of ReportSubscription', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        language: 'BBBBBB',
                        startDate: currentDate.format(DATE_FORMAT),
                        range: 'BBBBBB',
                        rangeN: 1,
                        active: true,
                        emailMessage: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        startDate: currentDate
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

            it('should delete a ReportSubscription', async () => {
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

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MessageMap } from 'app/shared/model/message-map.model';
import { MessageMapService } from './message-map.service';
import { MessageMapComponent } from './message-map.component';
import { MessageMapDetailComponent } from './message-map-detail.component';
import { MessageMapUpdateComponent } from './message-map-update.component';
import { MessageMapDeletePopupComponent } from './message-map-delete-dialog.component';
import { IMessageMap } from 'app/shared/model/message-map.model';

@Injectable({ providedIn: 'root' })
export class MessageMapResolve implements Resolve<IMessageMap> {
    constructor(private service: MessageMapService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MessageMap> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MessageMap>) => response.ok),
                map((messageMap: HttpResponse<MessageMap>) => messageMap.body)
            );
        }
        return of(new MessageMap());
    }
}

export const messageMapRoute: Routes = [
    {
        path: 'message-map',
        component: MessageMapComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageMaps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'message-map/:id/view',
        component: MessageMapDetailComponent,
        resolve: {
            messageMap: MessageMapResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageMaps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'message-map/new',
        component: MessageMapUpdateComponent,
        resolve: {
            messageMap: MessageMapResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageMaps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'message-map/:id/edit',
        component: MessageMapUpdateComponent,
        resolve: {
            messageMap: MessageMapResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageMaps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messageMapPopupRoute: Routes = [
    {
        path: 'message-map/:id/delete',
        component: MessageMapDeletePopupComponent,
        resolve: {
            messageMap: MessageMapResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageMaps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

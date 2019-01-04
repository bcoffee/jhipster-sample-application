import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MessageType } from 'app/shared/model/message-type.model';
import { MessageTypeService } from './message-type.service';
import { MessageTypeComponent } from './message-type.component';
import { MessageTypeDetailComponent } from './message-type-detail.component';
import { MessageTypeUpdateComponent } from './message-type-update.component';
import { MessageTypeDeletePopupComponent } from './message-type-delete-dialog.component';
import { IMessageType } from 'app/shared/model/message-type.model';

@Injectable({ providedIn: 'root' })
export class MessageTypeResolve implements Resolve<IMessageType> {
    constructor(private service: MessageTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MessageType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MessageType>) => response.ok),
                map((messageType: HttpResponse<MessageType>) => messageType.body)
            );
        }
        return of(new MessageType());
    }
}

export const messageTypeRoute: Routes = [
    {
        path: 'message-type',
        component: MessageTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'message-type/:id/view',
        component: MessageTypeDetailComponent,
        resolve: {
            messageType: MessageTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'message-type/new',
        component: MessageTypeUpdateComponent,
        resolve: {
            messageType: MessageTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'message-type/:id/edit',
        component: MessageTypeUpdateComponent,
        resolve: {
            messageType: MessageTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messageTypePopupRoute: Routes = [
    {
        path: 'message-type/:id/delete',
        component: MessageTypeDeletePopupComponent,
        resolve: {
            messageType: MessageTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MessageTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

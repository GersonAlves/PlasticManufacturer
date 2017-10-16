
import { Routes } from '@angular/router'
import { AppComponent } from './app-component'

import { CategoryListResolver } from './categories/index'

import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventListResolver,
    CreateSessionComponent,
    EventResolver
} from './events/index'

import { Error404Component } from './errors/404.component'
import { CategoryComponent } from './categories/category.component'

export const appRoutes: Routes = [

    { path: 'categories', component: CategoryComponent, resolve: { categories: CategoryListResolver } },
    { path: '404', component: Error404Component }


    //{ path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    //{ path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
    //{ path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver } },
    //{ path: 'events/session/new', component: CreateSessionComponent },
    //{ path: '404', component: Error404Component },
    //{ path: '', redirectTo: '/events', pathMatch: 'full' },
    //{ path: 'user', loadChildren: 'app/user/user.module#UserModule' }
    //{ path: '', component: AppComponent  }

]
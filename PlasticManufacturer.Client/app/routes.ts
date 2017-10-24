﻿
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


import {
    OpacityGuard,
    OpacityComponent,
    OpacityListComponent
} from './opacities/index'

import {
    CarrierGuard,
    CarrierComponent,
    CarrierListComponent
} from './carriers/index'

import {
    PackagingGuard,
    PackagingComponent,
    PackagingListComponent
} from './packagings/index'


import {
    CustomerComponent,
    CustomerGuard
} from './customers/index'




import { Error404Component } from './errors/404.component'
import { CategoryComponent } from './categories/category.component'



export const appRoutes: Routes = [

    { path: 'categories', component: CategoryComponent, resolve: { categories: CategoryListResolver } },
    { path: 'carriers', component: CarrierListComponent },
    { path: 'carriers/:id', canDeactivate: [CarrierGuard], component: CarrierComponent },
    
    { path: 'opacities', component: OpacityListComponent },
    { path: 'opacities/:id', canDeactivate: [OpacityGuard], component: OpacityComponent },

    { path: 'packagings', component: PackagingListComponent },
    { path: 'packagings/:id', canDeactivate: [PackagingGuard], component: PackagingComponent },

    { path: 'customers', component: CustomerComponent },
    { path: 'customers/:id', canDeactivate: [CustomerGuard], component: CustomerComponent },

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
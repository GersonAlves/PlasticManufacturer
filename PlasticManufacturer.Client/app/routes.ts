
import { Routes } from '@angular/router'
import { AppComponent } from './app-component'


import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventListResolver,
    CreateSessionComponent,
    EventResolver
} from './events/index'


import {
    CategoryGuard,
    CategoryComponent,
    CategoryListComponent
} from './Categories/index'


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
    CustomerGuard,
    CustomerListComponent
} from './customers/index'




import { Error404Component } from './errors/404.component'



export const appRoutes: Routes = [

    { path: 'categories', component: CategoryListComponent },
    { path: 'categories/:id', canDeactivate: [CategoryGuard], component: CategoryComponent },

    { path: 'carriers', component: CarrierListComponent },
    { path: 'carriers/:id', canDeactivate: [CarrierGuard], component: CarrierComponent },
    
    { path: 'opacities', component: OpacityListComponent },
    { path: 'opacities/:id', canDeactivate: [OpacityGuard], component: OpacityComponent },

    { path: 'packagings', component: PackagingListComponent },
    { path: 'packagings/:id', canDeactivate: [PackagingGuard], component: PackagingComponent },

    { path: 'customers', component: CustomerListComponent },
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
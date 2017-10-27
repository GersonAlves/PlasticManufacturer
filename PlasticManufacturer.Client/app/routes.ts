
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
    CustomerRatingGuard,
    CustomerRatingComponent,
    CustomerRatingListComponent
} from './customerRatings/index'




import {
    OpacityGuard,
    OpacityComponent,
    OpacityListComponent             
} from './opacities/index'

import {
    MaritalStatuGuard,
    MaritalStatuComponent,
    MaritalStatuListComponent
} from './maritalStatus/index'



import {
    CustomerDefaultGuard,
    CustomerDefaultComponent,
    CustomerDefaultListComponent
} from './customerDefaults/index'

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

import {
    EmployeeComponent,
    EmployeeGuard,
    EmployeeListComponent
} from './employees/index'



import {
    CustomerStatusComponent,
    CustomerStatusListComponent,
    CustomerStatusGuard
} from './customerStatus/index'


import {
    GenderComponent,
    GenderGuard,
    GenderListComponent
} from './genders/index'

import {
    CityComponent,
    CityListComponent,
    CityGuard
} from './cities/index'

import {
    CategoryComponent,
    CategoryListComponent,
    CategoryGuard
} from './categories/index'






import { Error404Component } from './errors/404.component'



export const appRoutes: Routes = [

    { path: 'carriers', component: CarrierListComponent },
    { path: 'carriers/:id', canDeactivate: [CarrierGuard], component: CarrierComponent },

    { path: 'categories', component: CategoryListComponent },
    { path: 'categories/:id', canDeactivate: [CategoryGuard], component: CategoryComponent },
    
    { path: 'customerDefaults', component: CustomerDefaultListComponent },
    { path: 'customerDefaults/:id', canDeactivate: [CustomerDefaultGuard], component: CustomerDefaultComponent },

    { path: 'maritalStatus', component: MaritalStatuComponent },
    { path: 'maritalStatus/:id', canDeactivate: [MaritalStatuGuard], component: MaritalStatuComponent },

    { path: 'opacitys', component: OpacityListComponent },
    { path: 'opacitys/:id', canDeactivate: [OpacityGuard], component: OpacityComponent },

    

    { path: 'customerRatings', component: CustomerRatingListComponent },
    { path: 'customerRatings/:id', canDeactivate: [CustomerRatingGuard], component: CustomerRatingComponent },

    { path: 'employees', component: EmployeeListComponent },
    { path: 'employees/:id', canDeactivate: [EmployeeGuard], component: EmployeeComponent },

    { path: 'packagings', component: PackagingListComponent },
    { path: 'packagings/:id', canDeactivate: [PackagingGuard], component: PackagingComponent },

    { path: 'customers', component: CustomerListComponent },
    { path: 'customers/:id', canDeactivate: [CustomerGuard], component: CustomerComponent },

    { path: 'customerStatus', component: CustomerStatusListComponent },
    { path: 'customerStatus/:id', canDeactivate: [CustomerStatusGuard], component: CustomerStatusComponent },

    { path: 'genders', component: GenderListComponent },
    { path: 'genders/:id', canDeactivate: [GenderGuard], component: GenderComponent },

    { path: 'cities', component: CityListComponent },
    { path: 'cities/:id', canDeactivate: [CityGuard], component: CityComponent },

    

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
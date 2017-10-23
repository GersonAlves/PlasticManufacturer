import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'


//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventResolver,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidatorDirective
} from './events/index'

import { AuthService } from './user/auth.service'
import {
    CategoryComponent,
    CategoryService,
    CategoriesListComponent,
    CategoryListResolver
} from './categories/index'

import {
    CarrierGuard,
    CarrierComponent,
    CarrierListComponent,
    CarrierService
} from './carriers/index'

declare let toastr: Toastr;
declare let jQuery: Object;

import { AppComponent } from './app-component'
import { NavBarComponent } from './nav/navbar.component'

import {
    TOASTR_TOKEN,
    Toastr,
    JQ_TOKEN,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective
} from './common/index'

import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule
    ],

    declarations: [
        AppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        CreateEventComponent,
        CreateSessionComponent,
        Error404Component,
        SessionListComponent,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        LocationValidatorDirective,
        DurationPipe,
        UpvoteComponent,
        CategoryComponent,
        CategoriesListComponent,
        CarrierComponent,
        CarrierListComponent
    ],
    providers: [
        CategoryService,
        CarrierService,
        EventService,
        CarrierGuard,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        EventResolver,
        EventListResolver,
        AuthService,
        VoterService,
        CategoryListResolver,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty)
        return window.confirm('You have not save this event, do you really want to cancel?')
    return true
}
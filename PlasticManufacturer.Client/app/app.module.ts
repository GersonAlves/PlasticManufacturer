import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import 'hammerjs';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule
} from '@angular/material'

import { CdkTableModule } from '@angular/cdk/table'


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
    LocationValidatorDirective
} from './events/index'

import { AuthService } from './user/auth.service'
import { HttpUtilService } from './shared/http-util.service'


import {
    OpacityGuard,
    OpacityComponent,
    OpacityListComponent,
    OpacityService                           
} from './opacities/index'


import {
    AddressTypeGuard,
    AddressTypeComponent,
    AddressTypeListComponent,
    AddressTypeService
} from './addressTypes/index'




import {
    MaritalStatusListComponent,
    MaritalStatusComponent,
    MaritalStatusGuard,
    MaritalStatusService
} from './maritalStatus/index'

import {
    DepartmentComponent,
    DepartmentListComponent,
    DepartmentGuard,
    DepartmentService
} from './departments/index'
import {
    CustomerDefaultGuard,
    CustomerDefaultComponent,
    CustomerDefaultListComponent,
    CustomerDefaultService
} from './customerDefaults/index'

import {
    CdefaultGuard,
    CdefaultComponent,
    CdefaultListComponent,
    CdefaultService
} from './cdefaults/index'

                                                         
import {            
    CustomerRatingGuard,
    CustomerRatingComponent,
    CustomerRatingListComponent,
   CustomerRatingService
} from './customerRatings/index'

import {
    CategoryComponent,
    CategoryListComponent,
    CategoryGuard,
    CategoryService
} from './categories/index'

import {
    MarkupComponent,
    MarkupListComponent,
    MarkupGuard,
    MarkupService
} from './markups/index'



import {
    CarrierGuard,
    CarrierComponent,
    CarrierListComponent,
    CarrierService
} from './carriers/index'


import {
    CustomerComponent,
    CustomerGuard,
    CustomerService,
    CustomerListComponent
} from './customers/index'

import {
    CustomerAddressGuard,
    CustomerAddressComponent,
    CustomerAddressListComponent,
    CustomerAddressService
} from './customerAddresses/index'



import {
    PackagingGuard,
    PackagingComponent,
    PackagingListComponent,
    PackagingService
} from './packagings/index'



import {
    CustomerStatusComponent,
    CustomerStatusListComponent,
    CustomerStatusGuard,
    CustomerStatusService
} from './customerStatus/index'


import {
    EmployeeGuard,
    EmployeeService,
    EmployeeComponent,
    EmployeeListComponent
} from './employees/index'

import {
    GenderComponent,
    GenderListComponent,
    GenderGuard,
    GenderService
    
} from './genders/index'


import {
    CityComponent,
    CityListComponent,
    CityGuard,
    CityService
    
} from './cities/index'


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

import {
    PelletComponent,
    PelletListComponent,
    PelletGuard,
    PelletService   
} from './pellets/index'

import {
    StateComponent,
    StatetListComponent,
    StateGuard,
    StateService
} from './states/index'

import {
    TitleComponent,
    TitleListComponent,
    TitleGuard,
    TitleService
} from './titles/index'

import {
    CustomerContactedComponent,
    CustomerContactedListComponent,
    CustomerContactedGuard,
    CustomerContactedService

} from './customerContacteds/index'

import {
    FreightComponent,
    FreightListComponent,
    FreightGuard,
    FreightService
} from './freights/index'

import {
    SecondLabelComponent,
    SecondLabelListComponent,
    SecondLabelGuard,
    SecondLabelService
} from './secondLabels/index'

import {
    ColorMatchRequestComponent,
    ColorMatchRequestListComponent,
    ColorMatchRequestGuard,
    ColorMatchRequestService
} from './colorMatchRequests/index'

import { CustomerResinComponent, CustomerResinListComponent, CustomerResinService, CustomerResinGuard } from './customerResins/index'
import { TargetTypeComponent, TargetTypeListComponent, TargetTypeService, TargetTypeGuard } from './targetTypes/index'

import { ProductComponent, ProductListComponent, ProductService, ProductGuard } from './products/index'
import { RawMaterialComponent, RawMaterialListComponent, RawMaterialService, RawMaterialGuard } from './rawMaterials/index'

import { OperationTypeComponent, OperationTypeListComponent, OperationTypeService, OperationTypeGuard } from './operationTypes/index'



import {
    FormulaComponent,
    FormulaListComponent,
    FormulaService,
    FormulaGuard
} from './formulas/index'

import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        CdkTableModule
    ],
    declarations: [
        AppComponent,
        StateComponent,
        StatetListComponent,
        TitleComponent,
        TitleListComponent,
        EventsListComponent,
        SecondLabelComponent,
        SecondLabelListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        CustomerContactedComponent,
        CustomerContactedListComponent,
        FreightComponent,
        FreightListComponent,
        FormulaComponent,
        FormulaListComponent,
        NavBarComponent,
        CustomerListComponent,
        CreateEventComponent,
        CreateSessionComponent,
        Error404Component,
        SessionListComponent,
        CollapsibleWellComponent,
        CustomerStatusComponent,
        CustomerStatusListComponent,
        CustomerResinComponent,
        CustomerResinListComponent,
        TargetTypeComponent,
        TargetTypeListComponent,
        PelletComponent,
        PelletListComponent,
        ColorMatchRequestComponent,
        ColorMatchRequestListComponent,
        MarkupComponent,
        MarkupListComponent,
        CategoryComponent,
        CategoryListComponent,
        DepartmentComponent,
        DepartmentListComponent,
        MaritalStatusComponent,
        MaritalStatusListComponent,
        OpacityComponent,
        OpacityListComponent,

        AddressTypeComponent,
        AddressTypeListComponent,

        CustomerComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        LocationValidatorDirective,
        DurationPipe,
        GenderComponent,
        GenderListComponent,
        UpvoteComponent,
        CarrierComponent,
        CarrierListComponent,
        CustomerAddressComponent,
        CustomerAddressListComponent,
        CustomerDefaultComponent,                                    
        CustomerDefaultListComponent,
        CdefaultComponent,
        CdefaultListComponent,                                              
        
        ProductComponent,
        ProductListComponent,
        RawMaterialComponent,
        RawMaterialListComponent,
        OperationTypeComponent,
        OperationTypeListComponent,
        CustomerRatingComponent,
        CustomerRatingListComponent,           
        CityComponent,
        CityListComponent,
        PackagingComponent,
        PackagingListComponent,
        EmployeeComponent,
        EmployeeListComponent
    ],
    providers: [
        CustomerStatusGuard,
        CustomerStatusService,
        CarrierService,     
        HttpUtilService,
        CustomerDefaultService,
        CdefaultService,
        CustomerRatingService,
        DepartmentGuard,
        DepartmentService,
        EventService,
        CarrierGuard,
        FormulaService,
        FormulaGuard,
        PelletGuard,
        PelletService,
        CustomerResinService,
        CustomerResinGuard,
        TargetTypeService,
        TargetTypeGuard,
        ProductGuard,
        ProductService,
        AddressTypeGuard,
        AddressTypeService,
        CustomerGuard,
        CustomerService,
        CustomerAddressGuard,
        CustomerAddressService,
        RawMaterialGuard,
        RawMaterialService,
        OperationTypeGuard,
        OperationTypeService,
        CustomerDefaultGuard,
        CdefaultGuard,
        CustomerRatingGuard,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        EventResolver,
        EventListResolver,
        AuthService,
        PackagingGuard,
        PackagingService,
        ColorMatchRequestGuard,
        ColorMatchRequestService,
        FreightGuard,
        FreightService,
        SecondLabelGuard,
        SecondLabelService,
        CustomerContactedGuard,
        CustomerContactedService,
        EmployeeGuard,
        EmployeeService,
        GenderGuard,
        GenderService,
        CityGuard,
        CityService,
        CategoryGuard,
        CategoryService,  
        MarkupGuard,
        MarkupService,  
        OpacityGuard,
        OpacityService,
        MaritalStatusGuard,
        MaritalStatusService,
        StateGuard,
        StateService,
        TitleGuard,
        TitleService,
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
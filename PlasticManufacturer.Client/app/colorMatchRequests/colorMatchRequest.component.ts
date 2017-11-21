import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IColorMatchRequest } from './colorMatchRequest.model'
import { ColorMatchRequestService } from './colorMatchRequest.service'

import { GenericValidator } from '../shared/generic-validator';

import { IOpacity, OpacityService } from '../opacities/index'
import { ICustomerResin, CustomerResinService } from '../customerResins/index'
import { IPackaging, PackagingService } from '../packagings/index'
import { IPellet, PelletService } from '../Pellets/index'
import { ICarrier, CarrierService } from '../carriers/index'
import { IProduct, ProductService } from '../products/index'


@Component({
    templateUrl: 'app/colorMatchRequests/colorMatchRequest.component.html'
})

export class ColorMatchRequestComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    colorMatchRequestForm: FormGroup;
    colorMatchRequest: IColorMatchRequest;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Color Match Request';


    //Variavel of fill ComboBox
    opacities: IOpacity[];
    customerResins: ICustomerResin[];
    packagings: IPackaging[];
    pellets: IPellet[];
    carriers: ICarrier[];
    products: IProduct[];



    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router,
        private colorMatchRequestService: ColorMatchRequestService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private opacityService: OpacityService,
        private customerResinService: CustomerResinService,
        private packagingService: PackagingService,
        private pelletService: PelletService,
        private carrierService: CarrierService,
        private productService: ProductService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Color Match name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {

        this.colorMatchRequestForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: '',
            loteId: undefined,
            productDescription: '',
            productAplication: '',
            priceQuoteRequired: undefined,
            targetTypeField: '',
            surfaceMatte: undefined,
            surfaceGlossy: undefined,
            surfaceOthers: '',
            wallThickness: '',
            opacity_Id: undefined,
            injection: undefined,
            blow: undefined,
            compression: undefined,
            extrusion: undefined,
            fiberDenier: undefined,
            coEx: undefined,
            meltIndex: '',
            film: undefined,
            sheet: undefined,
            rotational: undefined,
            mfg: '',
            gasAssitInjection: undefined,
            customerResin_Id: undefined,
            exact: undefined,
            commercial: undefined,
            closestSTD: '',
            moreDe: '',
            cieLab: undefined,
            d65: undefined,
            cfw: undefined,
            a: undefined,
            chipsQty: undefined,
            tubeSample: undefined,
            sheetExtrusionSample: undefined,
            requiredCustomerQty: undefined,
            unitQty: undefined,
            packaging_Id: undefined,
            requiredRatio: '',
            carrier_Id: undefined,
            pellet_Id: undefined,
            interior: undefined,
            exterior: undefined,
            lightLastness: '',
            hour: undefined,
            new: undefined,
            reformulation_Id: undefined,
            reason: '',
            uv: undefined,
            uvPackage: '',
            isAntiOxidant: undefined,
            antiOxidant: '',
            isAntiStat: undefined,
            antiStat: '',
            additiveNone: undefined,
            isLubricant: undefined,
            lubricant: '',
            amount: '',
            additiveOther: '',
            bestAdditive: undefined,
            slip: undefined,
            price: undefined,
            accuracy: undefined,
            turnaround: undefined,
            concernNone: undefined,
            concernOther: '',
            fda: undefined,
            nonHm: undefined,
            requirementNone: undefined,
            requirementOther: '',
            maximumHeat: '',
            coa: undefined,
            msds: undefined,
            cie: undefined,
            materiaSeet: undefined,
            fdaLetter: undefined,
            uvLetter: undefined,
            logoChips: undefined,
            customerDueDate: undefined,
            labNotes: '',
            shippingNotes: '',
            label: ''


        });

        // Read the colorMatchRequest Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getcolorMatchRequest(id);
            }
        );

        // loads combobox
        this.loadOpacity();
        this.loadCustomerResin();
        this.loadPackaging();
        this.loadPellet();
        this.loadCarrier();
        this.loadProduct();


    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.colorMatchRequestForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.colorMatchRequestForm);
        });
    }

    getcolorMatchRequest(id: number): void {
        if (id !== 0) {
            this.colorMatchRequestService.getById(id)
                .subscribe(
                (colorMatchRequest: IColorMatchRequest) => this.onCorrierRetrieved(colorMatchRequest),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(colorMatchRequest: IColorMatchRequest): void {
        if (this.colorMatchRequestForm) {
            this.colorMatchRequestForm.reset();
        }
        this.colorMatchRequest = colorMatchRequest;

        if (this.colorMatchRequest.id === 0) {
            this.pageTitle = 'Add colorMatchRequest';
        } else {
            this.pageTitle = `Edit colorMatchRequest  : ${this.colorMatchRequest.name}`;
        }

        // Update the data on the form
        this.colorMatchRequestForm.patchValue({
            id: this.colorMatchRequest.id,
            name: this.colorMatchRequest.name,
            description: this.colorMatchRequest.description,
            loteId: this.colorMatchRequest.loteId,
            productDescription: this.colorMatchRequest.productDescription,
            productAplication: this.colorMatchRequest.productAplication,
            priceQuoteRequired: this.colorMatchRequest.priceQuoteRequired,
            targetTypeField: this.colorMatchRequest.targetTypeField,
            surfaceMatte: this.colorMatchRequest.surfaceMatte,
            surfaceGlossy: this.colorMatchRequest.surfaceGlossy,
            surfaceOthers: this.colorMatchRequest.surfaceOthers,
            wallThickness: this.colorMatchRequest.wallThickness,
            opacity_Id: this.colorMatchRequest.opacity_Id,
            injection: this.colorMatchRequest.injection,
            blow: this.colorMatchRequest.blow,
            compression: this.colorMatchRequest.compression,
            extrusion: this.colorMatchRequest.extrusion,
            fiberDenier: this.colorMatchRequest.fiberDenier,
            coEx: this.colorMatchRequest.coEx,
            meltIndex: this.colorMatchRequest.meltIndex,
            film: this.colorMatchRequest.film,
            sheet: this.colorMatchRequest.sheet,
            rotational: this.colorMatchRequest.rotational,
            mfg: this.colorMatchRequest.mfg,
            gasAssitInjection: this.colorMatchRequest.gasAssitInjection,
            customerResin_Id: this.colorMatchRequest.customerResin_Id,
            exact: this.colorMatchRequest.exact,
            commercial: this.colorMatchRequest.commercial,
            closestSTD: this.colorMatchRequest.closestSTD,
            moreDe: this.colorMatchRequest.moreDe,
            cieLab: this.colorMatchRequest.cieLab,
            d65: this.colorMatchRequest.d65,
            cfw: this.colorMatchRequest.cfw,
            a: this.colorMatchRequest.a,
            chipsQty: this.colorMatchRequest.chipsQty,
            tubeSample: this.colorMatchRequest.tubeSample,
            sheetExtrusionSample: this.colorMatchRequest.sheetExtrusionSample,
            requiredCustomerQty: this.colorMatchRequest.requiredCustomerQty,
            unitQty: this.colorMatchRequest.unitQty,
            packaging_Id: this.colorMatchRequest.packaging_Id,
            requiredRatio: this.colorMatchRequest.requiredRatio,
            carrier_Id: this.colorMatchRequest.carrier_Id,
            pellet_Id: this.colorMatchRequest.pellet_Id,
            interior: this.colorMatchRequest.interior,
            exterior: this.colorMatchRequest.exterior,
            lightLastness: this.colorMatchRequest.lightLastness,
            hour: this.colorMatchRequest.hour,
            new: this.colorMatchRequest.new,
            reformulation_Id: this.colorMatchRequest.reformulation_Id,
            reason: this.colorMatchRequest.reason,
            uv: this.colorMatchRequest.uv,
            uvPackage: this.colorMatchRequest.uvPackage,
            isAntiOxidant: this.colorMatchRequest.isAntiOxidant,
            antiOxidant: this.colorMatchRequest.antiOxidant,
            isAntiStat: this.colorMatchRequest.isAntiStat,
            antiStat: this.colorMatchRequest.antiStat,
            additiveNone: this.colorMatchRequest.additiveNone,
            isLubricant: this.colorMatchRequest.isLubricant,
            lubricant: this.colorMatchRequest.lubricant,
            amount: this.colorMatchRequest.amount,
            additiveOther: this.colorMatchRequest.additiveOther,
            bestAdditive: this.colorMatchRequest.bestAdditive,
            slip: this.colorMatchRequest.slip,
            price: this.colorMatchRequest.price,
            accuracy: this.colorMatchRequest.accuracy,
            turnaround: this.colorMatchRequest.turnaround,
            concernNone: this.colorMatchRequest.concernNone,
            concernOther: this.colorMatchRequest.concernOther,
            fda: this.colorMatchRequest.fda,
            nonHm: this.colorMatchRequest.nonHm,
            requirementNone: this.colorMatchRequest.requirementNone,
            requirementOther: this.colorMatchRequest.requirementOther,
            maximumHeat: this.colorMatchRequest.maximumHeat,
            coa: this.colorMatchRequest.coa,
            msds: this.colorMatchRequest.msds,
            cie: this.colorMatchRequest.cie,
            materiaSeet: this.colorMatchRequest.materiaSeet,
            fdaLetter: this.colorMatchRequest.fdaLetter,
            uvLetter: this.colorMatchRequest.uvLetter,
            logoChips: this.colorMatchRequest.logoChips,
            customerDueDate: this.colorMatchRequest.customerDueDate,
            labNotes: this.colorMatchRequest.labNotes,
            shippingNotes: this.colorMatchRequest.shippingNotes,
            label: this.colorMatchRequest.label
        });
    }

    save(): void {
        if (this.colorMatchRequestForm.dirty && this.colorMatchRequestForm.valid) {
            // Copy the form values over the colorMatchRequest object values
            let c = (<any>Object).assign({}, this.colorMatchRequest, this.colorMatchRequestForm.value);

            this.colorMatchRequestService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.colorMatchRequestForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.colorMatchRequestForm.reset();
        this.router.navigate(['/colorMatchRequests']);
    }


    delete(): void {
        if (this.colorMatchRequest.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.colorMatchRequest.name}?`)) {
                this.colorMatchRequestService.delete(this.colorMatchRequest.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/colorMatchRequests'])
    }

    // Loads
    loadOpacity(): void {
        this.opacityService.getAll()
            .subscribe(opacities => this.opacities = opacities,
            error => this.errorMessage = <any>error);
    }

    loadCustomerResin(): void {
        this.customerResinService.getAll()
            .subscribe(customerResins => this.customerResins = customerResins,
            error => this.errorMessage = <any>error);
    }

    loadPackaging(): void {
        this.packagingService.getAll()
            .subscribe(packagings => this.packagings = packagings,
            error => this.errorMessage = <any>error);
    }

    loadPellet(): void {
        this.pelletService.getAll()
            .subscribe(pellets => this.pellets = pellets,
            error => this.errorMessage = <any>error);
    }

    loadCarrier(): void {
        this.carrierService.getAll()
            .subscribe(carriers => this.carriers = carriers,
            error => this.errorMessage = <any>error);
    }

    loadProduct(): void {
        this.productService.getAll()
            .subscribe(products => this.products = products,
            error => this.errorMessage = <any>error);
    }
}
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


    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router,
        private colorMatchRequestService: ColorMatchRequestService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private opacityService: OpacityService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'carreir name is required.'
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
            blow: undefined
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
            blow: this.colorMatchRequest.blow
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

    //
    loadOpacity(): void {
        this.opacityService.getAll()
            .subscribe(opacities => this.opacities = opacities,
            error => this.errorMessage = <any>error);
    }

}
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IRawMaterial } from './rawMaterial.model'
import { RawMaterialService } from './rawMaterial.service'

import { ICategory, CategoryService } from '../categories/index'
import { IOperationType, OperationTypeService } from '../operationTypes/index'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/rawMaterials/rawMaterial.component.html'
})

export class RawMaterialComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    rawMaterialForm: FormGroup;
    rawMaterial: IRawMaterial;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Raw Material';
    categories: ICategory[];
    operationTypes: IOperationType[];

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router,
        private rawMaterialService: RawMaterialService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private operationTypeService: OperationTypeService
        ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Raw Material name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.rawMaterialForm = this.formBuilder.group({
            id: 0,
            name: '',
            description: '',
            code: '',
            notes: '',
            chemicalName: '',
            mainSupplier: '',
            mainCustomer: '',
            heatStability: '',
            lightSatability: '',
            fda: undefined,
            hbfb: undefined,
            status: undefined,
            qcRequired: undefined,
            category_Id: undefined,
            operationType_Id: undefined,
            barCode:''
        });

        // Read the rawMaterial Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getRawMaterial(id);
            }
        );

        this.loadCategory();
        this.loadOperationType();

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.rawMaterialForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.rawMaterialForm);
        });
    }

    getRawMaterial(id: number): void {
        if (id !== 0) {
            this.rawMaterialService.getById(id)
                .subscribe(
                (rawMaterial: IRawMaterial) => this.onCorrierRetrieved(rawMaterial),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(rawMaterial: IRawMaterial): void {
        if (this.rawMaterialForm) {
            this.rawMaterialForm.reset();
        }
        this.rawMaterial = rawMaterial;

        if (this.rawMaterial.id === 0) {
            this.pageTitle = 'Add RawMaterial';
        } else {
            this.pageTitle = `Edit RawMaterial  : ${this.rawMaterial.name}`;
        }

        // Update the data on the form
        this.rawMaterialForm.patchValue({
            id: this.rawMaterial.id,
            name: this.rawMaterial.name,
            description: this.rawMaterial.description,
            code: this.rawMaterial.code,
            notes: this.rawMaterial.notes,
            chemicalName: this.rawMaterial.chemicalName,
            mainSupplier: this.rawMaterial.mainSupplier,
            mainCustomer: this.rawMaterial.mainCustomer,
            heatStability: this.rawMaterial.heatStability,
            lightSatability: this.rawMaterial.lightSatability,
            fda: this.rawMaterial.fda,
            status: this.rawMaterial.status,
            hbfb: this.rawMaterial.hbfb,
            qcRequired: this.rawMaterial.qcRequired,
            barCode: this.rawMaterial.barCode,
            category_Id: this.rawMaterial.category_Id,
            operationType_Id: this.rawMaterial.operationType_Id

        });
    }

    save(): void {
        if (this.rawMaterialForm.dirty && this.rawMaterialForm.valid) {
            // Copy the form values over the carrier object values
            let c = (<any>Object).assign({}, this.rawMaterial, this.rawMaterialForm.value);

            console.log(c);

            this.rawMaterialService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.rawMaterialForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.rawMaterialForm.reset();
        this.router.navigate(['/rawMaterials']);
    }


    delete(): void {
        if (this.rawMaterial.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.rawMaterial.name}?`)) {
                this.rawMaterialService.delete(this.rawMaterial.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/rawMaterials'])
    }

    loadCategory() {
        this.categoryService.getAll()
            .subscribe(categories => this.categories = categories,
            error => this.errorMessage = <any>error);
    }


    loadOperationType() {
        this.operationTypeService.getAll()
            .subscribe(operationTypes => this.operationTypes =operationTypes,
            error => this.errorMessage = <any>error);
    }



}
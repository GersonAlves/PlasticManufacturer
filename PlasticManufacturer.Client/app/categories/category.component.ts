import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICategory } from './category.model'
import {CategoryService } from './category.service'

import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: 'app/categories/category.component.html'
})

export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    categoryForm: FormGroup;
    category: ICategory;
    private sub: Subscription;
    errorMessage: string;
    pageTitle: string = 'Category';

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private router: Router, private categoryService: CategoryService, private formBuilder: FormBuilder, private route: ActivatedRoute, ) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'category name is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.categoryForm = this.formBuilder.group({
            id: 0,
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            description: ''
        });

        // Read the category Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCategory(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.categoryForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.categoryForm);
        });
    }

    getCategory(id: number): void {
        if (id !== 0) {
            this.categoryService.getById(id)
                .subscribe(
                (category: ICategory) => this.onCorrierRetrieved(category),
                (error: any) => this.errorMessage = <any>error
                );
        }
    }


    onCorrierRetrieved(category: ICategory): void {
        if (this.categoryForm) {
            this.categoryForm.reset();
        }
        this.category = category;

        if (this.category.id === 0) {
            this.pageTitle = 'Add Category';
        } else {
            this.pageTitle = `Edit Category  : ${this.category.name}`;
        }

        // Update the data on the form
        this.categoryForm.patchValue({
            id: this.category.id,
            name: this.category.name,
            description: this.category.description
        });
    }

    save(): void {
        if (this.categoryForm.dirty && this.categoryForm.valid) {
            // Copy the form values over the category object values
            let c = (<any>Object).assign({}, this.category, this.categoryForm.value);

            console.log(c);

            this.categoryService.save(c)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.categoryForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {    
        // Reset the form to clear the flags
        this.categoryForm.reset();
        this.router.navigate(['/categories']);
    }


    delete(): void {
        if (this.category.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.category.name}?`)) {
                this.categoryService.delete(this.category.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }


    cancel() {
        this.router.navigate(['/categories'])
    }


}
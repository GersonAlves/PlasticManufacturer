import { Component, OnInit } from '@angular/core';
import { IProduct } from './product.model';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'product List';
    errorMessage: string;

    products: IProduct[];

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getAll()
            .subscribe(products => this.products = products,
            error => this.errorMessage = <any>error);
    }

}
import { Component, OnInit } from '@angular/core'
import { CategoryService } from './category.service'
import { ActivatedRoute } from '@angular/router'
import { ICategory } from './category.model'


@Component({
    selector: 'categories-list',
    template: `
                <p>
                <div class="panel-container">
                    <table class="table2 gn-table">
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                        </tr>

                        <tr *ngFor="let category of categories">
                            <td>
                                {{category?.name}}
                            </td>
                            <td>
                                {{category?.description}}
                            </td>
                        </tr>
                      </table>
                 </div>
                `
})

export class CategoriesListComponent implements OnInit {
    categories: ICategory[]
    constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.categories = this.route.snapshot.data['categories']
    }
}
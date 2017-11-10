import { Component, OnInit } from '@angular/core';
import { IDepartment } from './department.model';
import { DepartmentService } from './department.service';

@Component({
    templateUrl: 'app/departments/department-list.component.html',
})

export class DepartmentListComponent implements OnInit {
    pageTitle: string = 'Department List';
    errorMessage: string;

    departments: IDepartment[];

    constructor(private departmentService: DepartmentService) { }

    ngOnInit(): void {
        this.departmentService.getAll()
            .subscribe(departments => this.departments = departments,
            error => this.errorMessage = <any>error);
    }

}
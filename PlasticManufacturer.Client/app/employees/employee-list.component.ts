import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
    templateUrl: 'app/employees/employee-list.component.html',
})

export class EmployeeListComponent implements OnInit {
    pageTitle: string = 'Employee List';
    errorMessage: string;

    employees: IEmployee[];

    constructor(private employeeService: EmployeeService) { }

    ngOnInit(): void {
        this.employeeService.getAll()
            .subscribe(employees => this.employees = employees,
            error => this.errorMessage = <any>error);
    }

}
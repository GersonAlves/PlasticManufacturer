import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
    templateUrl: 'app/employees/employee-list.component.html',
})

export class employeeListComponent implements OnInit {
    pageTitle: string = 'employee List';
    errorMessage: string;

    employees: IEmployee[];

    constructor(private employeeService: EmployeeService) { }

    ngOnInit(): void {
        console.log(this.employeeService.getAll());
        this.employeeService.getAll()
            .subscribe(employees => this.employees = employees,
            error => this.errorMessage = <any>error);

        console.log(this.employees);
    }

}
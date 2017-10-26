import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { EmployeeComponent } from './employee.component';

@Injectable()
export class EmployeeGuard implements CanDeactivate<EmployeeComponent> {

    canDeactivate(component: EmployeeComponent): boolean {
        if (component.employeeForm.dirty) {
            let name = component.employeeForm.get('name').value || 'New employee';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
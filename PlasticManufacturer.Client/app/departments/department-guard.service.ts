import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { DepartmentComponent } from './department.component';

@Injectable()
export class DepartmentGuard implements CanDeactivate<DepartmentComponent> {

    canDeactivate(component: DepartmentComponent): boolean {
        if (component.departmentForm.dirty) {
            let name = component.departmentForm.get('name').value || 'New department';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
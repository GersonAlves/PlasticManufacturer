import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { OperationTypeComponent } from './operationType.component';

@Injectable()
export class OperationTypeGuard implements CanDeactivate<OperationTypeComponent> {

    canDeactivate(component: OperationTypeComponent): boolean {
        if (component.operationTypeForm.dirty) {
            let name = component.operationTypeForm.get('name').value || 'New operationType';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
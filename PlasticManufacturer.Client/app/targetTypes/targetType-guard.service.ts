import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { TargetTypeComponent } from './targetType.component';

@Injectable()
export class TargetTypeGuard implements CanDeactivate<TargetTypeComponent> {

    canDeactivate(component: TargetTypeComponent): boolean {
        if (component.targetTypeForm.dirty) {
            let name = component.targetTypeForm.get('name').value || 'New targetType';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { OpacityComponent } from './opacity.component';

@Injectable()
export class OpacityGuard implements CanDeactivate<OpacityComponent> {

    canDeactivate(component: OpacityComponent): boolean {
        if (component.opacityForm.dirty) {
            let name = component.opacityForm.get('name').value || 'New Carrier';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
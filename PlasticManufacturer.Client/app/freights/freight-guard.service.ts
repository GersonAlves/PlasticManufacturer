import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { FreightComponent } from './freight.component';

@Injectable()
export class FreightGuard implements CanDeactivate<FreightComponent> {

    canDeactivate(component: FreightComponent): boolean {
        if (component.freightForm.dirty) {
            let name = component.freightForm.get('name').value || 'New Freight';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
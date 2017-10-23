import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CarrierComponent } from './carrier.component';

@Injectable()
export class CarrierGuard implements CanDeactivate<CarrierComponent> {

    canDeactivate(component: CarrierComponent): boolean {
        if (component.carrierForm.dirty) {
            let name = component.carrierForm.get('name').value || 'New Carrier';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
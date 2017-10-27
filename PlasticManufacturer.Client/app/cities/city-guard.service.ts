import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CityComponent } from './city.component';

@Injectable()
export class CityGuard implements CanDeactivate<CityComponent> {

    canDeactivate(component: CityComponent): boolean {
        if (component.cityForm.dirty) {
            let name = component.cityForm.get('name').value || 'New city';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
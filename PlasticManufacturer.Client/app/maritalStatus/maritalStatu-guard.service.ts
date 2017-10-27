import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { MaritalStatuComponent } from './maritalStatu.component';

@Injectable()
export class MaritalStatuGuard implements CanDeactivate<MaritalStatuComponent> {

    canDeactivate(component: MaritalStatuComponent): boolean {
        if (component.maritalStatuForm.dirty) {
            let name = component.maritalStatuForm.get('name').value || 'New MaritalStatu';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
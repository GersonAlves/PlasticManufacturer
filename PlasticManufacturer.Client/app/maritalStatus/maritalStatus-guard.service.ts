import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { MaritalStatusComponent } from './maritalStatus.component';

@Injectable()
export class MaritalStatusGuard implements CanDeactivate<MaritalStatusComponent> {

    canDeactivate(component: MaritalStatusComponent): boolean {
        if (component.maritalStatusForm.dirty) {
            let name = component.maritalStatusForm.get('name').value || 'New MaritalStatu';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
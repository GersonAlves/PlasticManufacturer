import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { GenderComponent } from './gender.component';

@Injectable()
export class GenderGuard implements CanDeactivate<GenderComponent> {

    canDeactivate(component: GenderComponent): boolean {
        if (component.genderForm.dirty) {
            let name = component.genderForm.get('name').value || 'New gender';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { ColorMatchRequestComponent } from './colorMatchRequest.component';

@Injectable()
export class ColorMatchRequestGuard implements CanDeactivate<ColorMatchRequestComponent> {

    canDeactivate(component: ColorMatchRequestComponent): boolean {
        if (component.colorMatchRequestForm.dirty) {
            let name = component.colorMatchRequestForm.get('name').value || 'New Color Match Request';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
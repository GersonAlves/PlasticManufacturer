import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { PelletComponent } from './pellet.component';

@Injectable()
export class PelletGuard implements CanDeactivate<PelletComponent> {

    canDeactivate(component: PelletComponent): boolean {
        if (component.pelletForm.dirty) {
            let name = component.pelletForm.get('name').value || 'New pellet';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
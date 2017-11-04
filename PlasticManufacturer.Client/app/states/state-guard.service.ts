import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { StateComponent } from './state.component';

@Injectable()
export class StateGuard implements CanDeactivate<StateComponent> {

    canDeactivate(component: StateComponent): boolean {
        if (component.stateForm.dirty) {
            let name = component.stateForm.get('name').value || 'New state';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
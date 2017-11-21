import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { CdefaultComponent } from './cdefault.component';

@Injectable()
export class CdefaultGuard implements CanDeactivate<CdefaultComponent> {

    canDeactivate(component: CdefaultComponent): boolean {
        if (component.cdefaultForm.dirty) {
            let name = component.cdefaultForm.get('name').value || 'New city';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
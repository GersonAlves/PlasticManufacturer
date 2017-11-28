import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { AddressTypeComponent } from './addressType.component';

@Injectable()
export class AddressTypeGuard implements CanDeactivate<AddressTypeComponent> {

    canDeactivate(component: AddressTypeComponent): boolean {
        if (component.addressTypeForm.dirty) {
            let name = component.addressTypeForm.get('name').value || 'New AddressType';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
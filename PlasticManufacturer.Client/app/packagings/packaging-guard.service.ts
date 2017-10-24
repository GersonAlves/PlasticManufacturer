import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { PackagingComponent } from './packaging.component';

@Injectable()
export class PackagingGuard implements CanDeactivate<PackagingComponent> {

    canDeactivate(component: PackagingComponent): boolean {
        if (component.packagingForm.dirty) {
            let name = component.packagingForm.get('name').value || 'New Packaging';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
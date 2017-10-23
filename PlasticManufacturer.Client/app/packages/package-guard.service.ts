import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { PackageComponent } from './Package.component';

@Injectable()
export class PackageGuard implements CanDeactivate<PackageComponent> {

    canDeactivate(component: PackageComponent): boolean {
        if (component.packageForm.dirty) {
            let name = component.packageForm.get('name').value || 'New Package';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
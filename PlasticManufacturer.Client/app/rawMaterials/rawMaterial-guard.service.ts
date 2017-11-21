import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { RawMaterialComponent } from './rawMaterial.component';

@Injectable()
export class RawMaterialGuard implements CanDeactivate<RawMaterialComponent> {

    canDeactivate(component: RawMaterialComponent): boolean {
        if (component.rawMaterialForm.dirty) {
            let name = component.rawMaterialForm.get('name').value || 'New rawMaterial';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
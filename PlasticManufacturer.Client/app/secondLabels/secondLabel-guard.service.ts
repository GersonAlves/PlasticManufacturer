import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { SecondLabelComponent } from './secondLabel.component';

@Injectable()
export class SecondLabelGuard implements CanDeactivate<SecondLabelComponent> {

    canDeactivate(component: SecondLabelComponent): boolean {
        if (component.secondLabelForm.dirty) {
            let name = component.secondLabelForm.get('name').value || 'New SecondLabel';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
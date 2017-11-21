import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { MarkupComponent } from './markup.component';

@Injectable()
export class MarkupGuard implements CanDeactivate<MarkupComponent> {

    canDeactivate(component: MarkupComponent): boolean {
        if (component.markupForm.dirty) {
            let name = component.markupForm.get('name').value || 'New city';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
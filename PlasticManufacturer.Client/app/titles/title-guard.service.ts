import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { TitleComponent } from './title.component';

@Injectable()
export class TitleGuard implements CanDeactivate<TitleComponent> {

    canDeactivate(component: TitleComponent): boolean {
        if (component.titleForm.dirty) {
            let name = component.titleForm.get('name').value || 'New title';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
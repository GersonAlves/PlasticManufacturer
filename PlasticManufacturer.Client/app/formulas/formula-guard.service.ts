import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { FormulaComponent } from './formula.component';

@Injectable()
export class FormulaGuard implements CanDeactivate<FormulaComponent> {

    canDeactivate(component: FormulaComponent): boolean {
        if (component.formulaForm.dirty) {
            let name = component.formulaForm.get('name').value || 'New city';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
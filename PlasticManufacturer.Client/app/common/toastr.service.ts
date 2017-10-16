import {OpaqueToken} from '@angular/core'

//declare let toastr:any

export let TOASTR_TOKEN = new OpaqueToken('Toastr');

export interface Toastr {
    success(msg: string, title?: string): void;
    info(msg: string, title?: string): void;
    warning(msg: string, title?: string): void;
    error(msg: string, title?: string): void;
}
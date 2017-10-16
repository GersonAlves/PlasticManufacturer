﻿import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'

@Component({
    templateUrl: 'app/user/profile.component.html',
    styles: [`
            em { float: right; color:#E05C65; padding-left:10px; }   
            .error input { background-color: #E3C3C5; }
            .error ::-webkit-input-placeholder { color: #999; }
            .error ::-moz-placeholder { color: #999; }
            .error :-moz-placeholder { color: #999; }
            .error :ms-input-placeholder { color: #999; }
        `]
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup
    private firstName: FormControl
    private lastName: FormControl

    constructor(private authSevice: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
    }

    ngOnInit() {
        this.firstName = new FormControl(this.authSevice.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.lastName = new FormControl(this.authSevice.currentUser.lastName, Validators.required)

        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
      
    }

    saveProfile(formValues) {
        if (this.profileForm.valid) {
            this.authSevice.updateCurrentUser(formValues.firstName, formValues.lastName)
            this.toastr.success('Profile Save!', 'User');
        }
    }

    validateLastName() {
        return this.lastName.valid || this.lastName.untouched
    }

    validateFirstName() {
        return this.firstName.valid || this.firstName.untouched
    }

    cancel() {
        this.router.navigate(['events'])
    }
}
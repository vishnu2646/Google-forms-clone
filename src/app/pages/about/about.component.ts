import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        MatButtonModule
    ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    private router = inject(Router);

    public handleCreateForm() {
        console.log('Create Form');
        this.router.navigate(['dashboard']);
    }

    public navigateToAuth() {
        this.router.navigate(['']);
    }
}

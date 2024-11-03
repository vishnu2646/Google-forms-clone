import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

}

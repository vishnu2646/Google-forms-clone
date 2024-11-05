import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule, IconModule } from './sharedComponents/matModules';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        IconModule,
        ButtonModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
}

import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {v4 as uuidv4} from 'uuid';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatMenuModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    private router = inject(Router);

    public options = [
        {
            title: 'Last Opened by me',
            isChecked: true,
        },
        {
            title: 'Last modified by me',
            isChecked: false,
        },
        {
            title: 'Last modified',
            isChecked: false,
        },
        {
            title: 'Title',
            isChecked: false,
        }
    ]

    public selectedListType: String = 'view_list'

    public selectedSortOption = this.options[0];

    public handleUpdateSortOption(title: String) {
        this.options.forEach(option => option.isChecked = false);

        // update selected sort option
        const filtedSort = this.options.filter(option => option.title === title);
        filtedSort[0].isChecked = true;

        this.selectedSortOption = filtedSort[0]
    }

    public handleUpdateViewType(viewType: String) {
        this.selectedListType = viewType;
    }

    public handleCreateForm() {
        let uuid = uuidv4();
        this.router.navigate(['/form'], { queryParams: { id: uuid } });
    }

    public navigateToAuth() {
        this.router.navigate(['']);
    }
}

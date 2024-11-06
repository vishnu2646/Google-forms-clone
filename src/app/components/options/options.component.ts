import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-options',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSelectModule
    ],
    templateUrl: './options.component.html',
    styleUrl: './options.component.scss'
})
export class OptionsComponent {

    @Input()
    public question!: FormGroup;

    @Input()
    public questionType: String = 'text';

    @Input()
    public questionIndex: number | null = null;

    @Output()
    public emittedIndex = new EventEmitter<number | null>();

    public get isCheckBoxOrMultipleChoise(): boolean {
        return this.questionType === 'checkbox' || this.questionType === 'multiple_choice' || this.questionType === 'dropdown';
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['question']) {
            this.question = changes['question']?.currentValue;
        } else if (changes['questionType']) {
            this.questionType = changes['questionType']?.currentValue;
        } else if (changes['questionIndex']) {
            this.questionIndex = changes['questionIndex']?.currentValue;
        }
    }

    public getOptions() {
        const question = this.question.get('options') as FormArray
        return question;
    }

    public createOption(index: number | null): void {
        this.emittedIndex.emit(index);
    }

    public removeOption(optionIndex: number) {
        const options = this.question.get('options') as FormArray; // Cast to FormArray
        options.removeAt(optionIndex);
    }
}

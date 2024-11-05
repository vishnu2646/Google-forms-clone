import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CheckboxModule, IconModule, InputModule, RadioModule, SelectModule } from '../../sharedComponents/matModules';

@Component({
    selector: 'app-options',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputModule,
        IconModule,
        RadioModule,
        CheckboxModule,
        ButtonModule,
        SelectModule
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
            console.log(this.question);
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

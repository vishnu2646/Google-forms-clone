import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Type } from '../../types/types';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OptionsComponent } from '../options/options.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-questioncard',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatRadioModule,
        MatCheckboxModule,
        OptionsComponent,
        MatSelectModule,
        MatSlideToggleModule
    ],
    templateUrl: './questioncard.component.html',
    styleUrl: './questioncard.component.scss'
})
export class QuestioncardComponent {

    @Input()
    public group!: FormGroup

    @Input()
    public question!: FormGroup;

    @Input()
    public index: number | null = null;

    public selectedQuestionType: String = '';

    public types: Type[] = [
        {value: 'text', viewValue: 'Shot Answer'},
        {value: 'textarea', viewValue: 'Paragraph'},
        {value: 'multiple_choice', viewValue: 'Multiple Choices'},
        {value: 'checkbox', viewValue: 'Checkboxes'},
        {value: 'dropdown', viewValue: 'Dropdown'},
        {value: 'file_upload', viewValue: 'File Upload'},
        {value: 'date', viewValue: 'Date'},
        {value: 'time', viewValue: 'Time'},
    ];

    @Output()
    public activeIndex = new EventEmitter<number | null>();

    @Output()
    public activeQuestion = new EventEmitter<FormGroup>();

    @Output()
    public deleteQuestion = new EventEmitter<number | null>();

    @Output()
    public optionIndex = new EventEmitter<number | null>();

    public emitActiveIndex(index: number | null): void {
        this.activeIndex.emit(index);
    }

    public onTypeChange(event: any): void {
        this.selectedQuestionType = event?.value;
    }

    public emitSaveQuestion(question: FormGroup) {
        question.value['isEditing'] = false;
        question.value['isEditingOptions'] = false;
        if(question.value['question_text'] !== '') {
            this.activeQuestion.emit(question);
        } else {
            this.handleEditQuestion(question);
        }
    }

    public emitDeleteQuestion(index: number | null): void {
        this.deleteQuestion.emit(index);
    }

    public handleEditQuestion(question: FormGroup) {
        question.value['isEditing'] = true;
        question.value['isEditingOptions'] = true;
    }

    public newOptions(event: number | null) {
        this.optionIndex.emit(event);
    }

    public toggleRequired(event: MatSlideToggleChange) {
        const questionTextControl = this.question.get('question_text');
        const isRequired = event.checked;

        this.question.get('required')?.setValue(isRequired);

        if (isRequired) {
            questionTextControl?.setValidators(Validators.required);
        } else {
            questionTextControl?.clearValidators();
        }

        questionTextControl?.updateValueAndValidity();
    }
}

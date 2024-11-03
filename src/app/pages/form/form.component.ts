import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../services/formservice/form.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { QuestioncardComponent } from '../../components';

interface Type {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuestioncardComponent,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatMenuModule,
        MatCheckboxModule,
        MatRadioModule
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent {

    public createForm: FormGroup;

    public selectedValue: String = '';

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

    public activeQuestionIndex: number | null = null;

    /**
     * Getter for questions FormArray
     */
    public get questions(): FormArray {
        return this.createForm.get('questions') as FormArray;
    }

    /**
     * Getter for options FormArray
     * @param questionIndex - The index of the question
     * @returns {FormArray}
     */
    public getOptions(questionIndex: number): FormArray {
        const question = this.questions.at(questionIndex);
        return question.get('options') as FormArray;
    }

    constructor(private formService: FormService, private fb: FormBuilder) {
        this.createForm = this.fb.group({
            title: ['Untiled form', Validators.required],
            description: ['Form description'],
            questions: this.fb.array([]) // Initialize as a FormArray
        });
    }

    /**
     * A callback method that is invoked immediately after the default change detector,
     * has checked the directive's data-bound properties for the first time
     */
    public ngOnInit(): void {
        this.addQuestion();
    }

    public setActiveQuestion(index: number): void {
        this.activeQuestionIndex = index;
    }

    public saveQuestion(index: number) {
        const question = this.questions.at(index);
        question.get('isEditing')?.setValue(false);
        this.activeQuestionIndex = null;
    }

    /**
     * Add a new question to the form
     */
    public addQuestion() {
        const questionGroup = this.fb.group({
            question_text: ['', Validators.required],
            question_type: ['text', Validators.required],
            options: this.fb.array([]),
            isEditing: true,
            isEditingOptions: true,
            required: false
        });
        this.questions.push(questionGroup);
        if(this.activeQuestionIndex !== null) {
            this.saveQuestion(this.activeQuestionIndex);
        }
    }

    public onQuestionTypeChange(index: number) {
        const question = this.questions.at(index);
        if (this.isMultipleChoiceOrCheckbox(question.get('question_type')?.value)) {
            this.addOption(index);
            question.get('isEditingOptions')?.setValue(true);
        } else {
            question.get('options')?.reset();
        }
    }

    public isMultipleChoiceOrCheckbox(type: string): boolean {
        return type === 'multiple_choice' || type === 'checkbox';
    }

    public editQuestion(index: number) {
        const question = this.questions.at(index);
        question.get('isEditing')?.setValue(true);
        this.setActiveQuestion(index);
    }

    /**
     * Remove a question
     * @param index The index of the question
     */
    public removeQuestion(index: number) {
        this.questions.removeAt(index);
        this.activeQuestionIndex = null; // Reset active question index

        // If no questions are left, clear the form array explicitly
        if (this.questions.length === 0) {
            this.createForm.setControl('questions', this.fb.array([]));
        }
    }

    /**
     * Add an option to a question
     * @param questionIndex The index of the question
     */
    public addOption(questionIndex: number) {
        const options = this.questions.at(questionIndex).get('options') as FormArray; // Cast to FormArray
        options.push(this.fb.control(''));
    }

    public editOptions(questionIndex: number) {
        const question = this.questions.at(questionIndex);
        question.get('isEditingOptions')?.setValue(true);
    }

    /**
     * Remove an option from a question
     * @param questionIndex index of the question
     * @param optionIndex index of the option
     */
    public removeOption(questionIndex: number, optionIndex: number) {
        const options = this.questions.at(questionIndex).get('options') as FormArray; // Cast to FormArray
        options.removeAt(optionIndex);
    }

    public saveOptions(questionIndex: number) {
        const question = this.questions.at(questionIndex);
        question.get('isEditingOptions')?.setValue(false);
    }

    /**
     * Method to make the question to be required or Answered compulsory
     * @param event Event emitted
     * @param index index of the question
     */
    public toggleRequired(event: any, index: number) {
        const question = this.questions.at(index);
        const questionTextControl = question.get('question_text');
        const isRequired = event.checked;

        question.get('required')?.setValue(isRequired);  // Set required field in form data

        if (isRequired) {
            questionTextControl?.setValidators(Validators.required);
        } else {
            questionTextControl?.clearValidators();
        }
        questionTextControl?.updateValueAndValidity();
    }

    public onSubmit() {
        if (this.createForm.valid) {
            console.log('Submit', this.createForm.value);
            // this.formService.createForm(this.createForm.value).subscribe(res => {
            //     console.log('Form created successfully:', res);
            // }, err => {
            //     console.error('Error creating form:', err);
            // });
        }
    }
}

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
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatMenuModule,
        MatCheckboxModule,
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent {

    public createForm: FormGroup;

    public activeQuestionIndex: number | null = null;

    public question: FormGroup | null = null;

    public newQuestions: any[] = [];

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

    public addOption(event: number | null): void {
        if(event === null) {
            return;
        }
        const options = this.questions.at(event).get('options') as FormArray; // Cast to FormArray
        options.push(this.fb.control(''));
    }

    constructor(private formService: FormService, private fb: FormBuilder) {
        this.createForm = this.fb.group({
            title: ['Untiled form', Validators.required],
            description: ['Form description'],
            questions: this.fb.array([]) // Initialize as a FormArray
        });
    }

    public saveQuestion(question: FormGroup) {
        this.newQuestions.push(question.value);
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
    }

    public getQuestionGroup(index: number): FormGroup {
        return this.questions.at(index) as FormGroup;
    }

    public removeQuestion(event: number | null) {
        this.activeQuestionIndex = event;

        if(this.activeQuestionIndex !== null) {
            this.questions.removeAt(this.activeQuestionIndex)
        }

        this.activeQuestionIndex = null; // Reset active question index

        // If no questions are left, clear the form array explicitly
        if (this.questions.length === 0) {
            this.createForm.setControl('questions', this.fb.array([]));
        }
    }

    public onSubmit() {
        if (this.createForm.valid) {
            console.log('Submit', this.createForm.value);
        }
    }
}

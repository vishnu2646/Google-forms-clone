import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    private apiUrl = 'http://yourapi.com/api/forms'; // Replace with your API URL

    constructor(private http: HttpClient) { }

    public createForm(formData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/create/`, formData);
    }

    // Get form details by ID
    public getForm(formId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${formId}/`);
    }

    // Submit the form response
    public submitResponse(responseData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/responses/submit/`, responseData);
    }
}

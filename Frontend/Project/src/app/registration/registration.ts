import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Student {
  studentId: number;
  studName: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  addressLine1: string;
  addressLine2: string;
}

@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  private readonly apiUrl = 'https://localhost:7104/api/Registration';

  students: Student[] = [];

  formData: Student = this.getEmptyStudent();
  isEditMode = false;
  editIndex: number | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private readonly http: HttpClient) {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<Student[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.students = response ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to connect to API.';
        this.isLoading = false;
      },
    });
  }

  saveStudent(): void {
    this.errorMessage = '';

    if (this.isEditMode) {
      this.http.put<Student>(`${this.apiUrl}/${this.formData.studentId}`, this.formData).subscribe({
        next: () => {
          this.loadStudents();
          this.resetForm();
        },
        error: () => {
          this.errorMessage = 'Update failed';
        },
      });
    } else {
      this.http.post<Student>(this.apiUrl, this.formData).subscribe({
        next: () => {
          this.loadStudents();
          this.resetForm();
        },
        error: () => {
          this.errorMessage = 'Create failed';
        },
      });
    }
  }

  editStudent(index: number): void {
    this.formData = { ...this.students[index] };
    this.isEditMode = true;
    this.editIndex = index;
  }

  deleteStudent(index: number): void {
    const targetId = this.students[index]?.studentId;

    if (!targetId) {
      return;
    }

    this.http.delete(`${this.apiUrl}/${targetId}`).subscribe({
      next: () => {
        this.loadStudents();

        if (this.editIndex === index) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Delete failedd';
      },
    });
  }

  resetForm(): void {
    this.formData = this.getEmptyStudent();
    this.isEditMode = false;
    this.editIndex = null;
  }

  private getEmptyStudent(): Student {
    return {
      studentId: 0,
      studName: '',
      mobileNo: '',
      email: '',
      city: '',
      state: '',
      pincode: '',
      addressLine1: '',
      addressLine2: '',
    };
  }

}

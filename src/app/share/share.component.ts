import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Interface representing a resource submission from the form.
 */
interface ResourceSubmission {
  type: string;
  content: string;
}

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent implements OnInit {
  shareForm!: FormGroup;

  submittedValues: WritableSignal<ResourceSubmission | null> = signal(null);
  isSubmitted: WritableSignal<boolean> = signal(false);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      type: ['text', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.shareForm.valid) {
      const resourceType: string = this.shareForm.get('type')?.value;
      const resourceContent: string = this.shareForm.get('content')?.value;

      // TODO: Replace this with actual submission logic!

      // Store the values for display in the submittedValues Signal
      this.submittedValues.set({
        type: resourceType,
        content: resourceContent,
      });
      this.isSubmitted.set(true);
    } else {
      // Mark all fields as touched to trigger validation visuals
      this.shareForm.markAllAsTouched();
    }
  }
}

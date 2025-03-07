import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShareService } from '../share.service';
import { Link, ResourceUnion, TextSnippet } from '../app.models';

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

  generatedUrl: string | null = null; // i added

  constructor(
    private formBuilder: FormBuilder,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      type: ['text', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.shareForm.valid) {
      let resource: ResourceUnion;

      const resourceType: string = this.shareForm.get('type')?.value;
      const resourceContent: string = this.shareForm.get('content')?.value;

      if (resourceType === 'text') {
        resource = {
          resource_type: 'TextSnippet',
          text_content: resourceContent,
          path: '',
          view_count: 0,
          expiration_date: null,
          vanity_path: null,
        };
      } else if (resourceType === 'url') {
        resource = {
          resource_type: 'Link',
          original_link: resourceContent,
          //shortened_link: null,
          path: '',
          view_count: 0,
          expiration_date: null,
          vanity_path: null,
        };
      } else {
        console.error('Invalid resource type:', resourceType);
        return; // Exit if the resource type is invalid
      }
      // i added this
      this.shareService.createResource(resource).subscribe((url: string) => {
        this.submittedValues.set({
          type: resourceType,
          content: resourceContent,
          //url: response.url, // Store the generated URL ? how to store returned value? should we return anything?
        });

        this.generatedUrl = url;

        this.isSubmitted.set(true);
      });
    } else {
      // Mark all fields as touched to trigger validation visuals
      this.shareForm.markAllAsTouched();
    }
  }
}

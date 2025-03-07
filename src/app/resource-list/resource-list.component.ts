import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ShareService } from '../share.service';
import { ResourceUnion } from '../app.models';
import { GetService } from '../get.service';

@Component({
  selector: 'app-resource-list',
  imports: [],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css',
})
export class ResourceListComponent implements OnInit {
  resources: WritableSignal<ResourceUnion[]> = signal([]);
  apiUrl: string = 'https://ex01-comp590-140-25sp-rileyac.apps.unc.edu';
  constructor(private getService: GetService) {}

  ngOnInit() {
    this.loadResources();
  }

  loadResources(type?: string) {
    this.getService.getResources(type).subscribe((data) => {
      this.resources.set(data); // update the signal with fetched data
    });
  }
  //seperate methods for buttons
  loadTextSnippets() {
    this.loadResources('TextSnippet');
  }

  loadLinks() {
    this.loadResources('Link');
  }

  getFullUrl(path: string): string {
    return `${this.apiUrl}/resources/${path}`;
  }
}

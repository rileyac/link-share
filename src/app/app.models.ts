export interface Resource {
  path: string;
  view_count?: number;
  expiration_date?: string | null;
  vanity_path?: string | null;
  resource_type: 'TextSnippet' | 'Link';
}

export interface TextSnippet extends Resource {
  resource_type: 'TextSnippet';
  text_content: string;
}

export interface Link extends Resource {
  resource_type: 'Link';
  original_link: string;
  shortened_link?: string;
}

export type ResourceUnion = TextSnippet | Link;

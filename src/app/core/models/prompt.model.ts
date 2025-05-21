import { Catalog } from "./catalog.model";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface Prompt extends Catalog {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  dateCreated: Date;
  lastModified: Date;
  authorId: string;
  authorName: string;
  likes: number;
  usageCount: number;
  isFavorite: boolean;
}

export interface PromptCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  iconName: IconProp;
}


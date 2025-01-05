import { Component, input } from '@angular/core';

@Component({
  selector: 'app-category-tag',
  standalone: true,
  imports: [],
  templateUrl: './category-tag.component.html',
  styleUrl: './category-tag.component.scss',
})
export class CategoryTagComponent {
  categoryName = input.required<string>();
  categoryId = input.required<number>();

  getCategoryClass(id: number): string {
    switch (id) {
      case 1:
        return 'tag-color-1';
      case 2:
        return 'tag-color-2';
      case 3:
        return 'tag-color-3';
      default:
        return 'tag-color-default';
    }
  }
}

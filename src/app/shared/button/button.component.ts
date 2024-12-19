import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = 'Button'; // Texte du bouton
  @Input() type: 'primary' | 'secondary' | 'danger' = 'primary'; // Type de bouton
  @Input() disabled: boolean = false; // Désactiver le bouton
  @Input() icon: string | null = null; // Icône optionnelle
  @Input() size: 'small' | 'medium' | 'large' = 'medium'; // Taille du bouton
}

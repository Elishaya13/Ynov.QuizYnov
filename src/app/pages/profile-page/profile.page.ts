import { Component } from '@angular/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
})
export class ProfilePage {
  // User fictif
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
  };
  // Méthode edition du profil
  public editProfile(): void {
    // Code de la méthode editProfile
    console.log('Edition du profil');
  }
}

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public isAuthenticated = true; // vrai pour le moment, changera avec l'authentification

  public toggleAuth(): void {
    this.isAuthenticated = !this.isAuthenticated;
  }
}


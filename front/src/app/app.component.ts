// File: src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthService} from "./auth/services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(private authService: AuthService) {}


}

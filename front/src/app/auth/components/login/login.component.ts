import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  secureTextEntry = true;
  isLoading = false;
  currentLang = 'fr';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private translate: TranslateService,
    private authService: AuthService,
  ) {
    const browserLang = translate.getBrowserLang();
    const savedLang = localStorage.getItem('lang');
    this.currentLang = savedLang || (browserLang?.match(/fr|en/) ? browserLang : 'fr');
    this.translate.use(this.currentLang);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  switchLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  togglePasswordVisibility() {
    this.secureTextEntry = !this.secureTextEntry;
  }

  async handleLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    this.isLoading = true;

    const credentials = this.form.value;

    try {
      const response: any = await this.http.post('http://localhost:8080/api/auth/login', credentials, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).toPromise();

      console.log('Login response:', response);

      if (response.token) {
        this.authService.login(response.token); // <- Save token
        this.router.navigate(['/home'], { replaceUrl: true }); // <- Redirect to /home
      } else {
        alert(this.translate.instant('signinForm.invalidCredentials'));
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(this.translate.instant('signinForm.error'));
    } finally {
      this.isLoading = false;
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}

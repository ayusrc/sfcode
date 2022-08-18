import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  timeout: any;
  userData: any;
  submitElement: HTMLInputElement;
  set: NodeListOf<HTMLInputElement>;

  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required]
    });
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.submitElement = document.getElementById('submit') as HTMLInputElement;
    this.set = document.querySelectorAll('input:not([type=submit])');
    this.set.forEach(item => {
      item.addEventListener('focus', () => {
        item.parentElement.querySelector('label').classList.add('active');
      });
      item.addEventListener('blur', () => {
        if (item.value === '') {
          item.parentElement.querySelector('label').classList.remove('active');
        }
      });
    });
  }

  updateLabels(): void {
    this.set.forEach(item => {
      if (item.value !== '' && item.value !== null) {
        item.parentElement.querySelector('label').classList.add('active');
      } else {
        item.parentElement.querySelector('label').classList.remove('active');
      }
    });
  }

  postData(form: FormGroup): void {
    if (this.submitElement.classList.contains('disabled')) {
      return;
    }
    this.submitElement.classList.add('disabled');

    this.dataService.userLogin(form.value.username, form.value.password)
      .pipe(first())
      .subscribe(data => {
        this.userData = data;
        const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/home';
        this.router.navigate([redirect]).then();
      }, () => {
        this.error('Incorrect username or password.');
        form.get('password').reset();
      });
  }

  error(str: string): void {
    const co = (document.getElementById('cover') as HTMLDivElement);
    const pu = (document.getElementById('error') as HTMLDivElement);
    pu.querySelector('.desc').innerHTML = str;

    co.querySelectorAll('.popup').forEach(item => {
      item.classList.remove('active');
    });

    co.style.display = 'block';
    setTimeout(() => {
      co.classList.add('active');
      pu.classList.add('active');
    }, 100);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      pu.classList.remove('active');
      co.classList.remove('active');

      setTimeout(() => {
        co.style.display = 'none';
        this.submitElement.classList.remove('disabled');
      }, 500);
    }, 3000);
  }

}

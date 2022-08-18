import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  timeout: any;
  set: NodeListOf<HTMLInputElement>;
  submitElement: HTMLInputElement;

  constructor(private fb: FormBuilder, private dataService: ApiService) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9_]+$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get username(): AbstractControl {
    return this.form.get('name');
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

  postData(frm: any): void {

    if (this.submitElement.classList.contains('disabled')) {
      return;
    }
    this.submitElement.classList.add('disabled');

    if (this.form.get('name').invalid) {
      this.error('Invalid name. Please keep it 1 to 50 characters long.');
      return;
    } else if (this.form.get('username').invalid) {
      this.error('Invalid username. Please keep it 5 to 50 characters long with only alphanumeric characters and underscores.');
      return;
    } else if (this.form.get('email').invalid) {
      this.error('Invalid email address. Please recheck.');
      return;
    } else if (this.form.get('password').invalid || this.form.get('confirm_password').invalid) {
      this.error('Invalid password or the passwords don\'t match. Please keep the password at least 8 characters long.');
      this.form.get('password').setValue('');
      this.form.get('confirm_password').setValue('');
      return;
    } else if (this.form.get('password').value !== this.form.get('confirm_password').value) {
      this.error('Passwords don\'t match. Please recheck.');
      this.form.get('password').setValue('');
      this.form.get('confirm_password').setValue('');
      return;
    }

    this.dataService.userReg(frm.value.name, frm.value.email, frm.value.password, frm.value.username)
      .pipe(first())
      .subscribe(
        () => {
          this.success();
        },

        (err: any) => {
          console.log(err);
          this.error('Could not register you. The username or the email ID already exists.');
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

  success(): void {
    const co = (document.getElementById('cover') as HTMLDivElement);
    const pu = (document.getElementById('success') as HTMLDivElement);

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

      this.form.reset();
      this.updateLabels();
    }, 3000);

  }


}

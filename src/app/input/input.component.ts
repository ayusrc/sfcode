import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  isActive = false;
  value: string;
  @Output() valueEmit = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  setState(value: boolean): void {
    const text = document.getElementById('inp') as HTMLTextAreaElement;
    this.isActive = value;
    if (value) {
      text.focus();
    } else {
      this.valueEmit.emit(text.value);
    }
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ide-compile',
  templateUrl: './ide-compile.component.html',
  styleUrls: ['./ide-compile.component.scss']
})
export class IdeCompileComponent implements OnInit {
  @Input() statusVal: string;
  isActive = false;

  constructor() {
  }

  set status(value: string) {
    this.statusVal = value;
  }

  ngOnInit(): void {
  }

  setState(inp: boolean): void {
    this.isActive = inp;
  }
}

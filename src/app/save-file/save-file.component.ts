import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileService} from '../file.service';
import {File} from '../file';
import {Router} from '@angular/router';

@Component({
  selector: 'app-save-file',
  templateUrl: './save-file.component.html',
  styleUrls: ['./save-file.component.scss']
})
export class SaveFileComponent implements OnInit {

  isActive = false;
  @Output() savedFile = new EventEmitter<boolean>();
  @Input() file: File;
  isUploading = false;

  constructor(public fileService: FileService, private router: Router) {
  }

  ngOnInit(): void {
  }

  setState(value: boolean): void {
    const text = document.getElementById('filenameInput') as HTMLTextAreaElement;
    this.isActive = value;
    if (value) {
      text.focus();
    }
  }

  submitFile(): void {
    this.isUploading = true;
    this.fileService.upload(this.file, false)
      .subscribe((response) => {
        this.isUploading = false;
        this.savedFile.emit(true);
        this.isActive = false;
        this.router.navigate(['/arena/file/', this.file.filename + this.file.language]).then();
        console.log(response);
      }, (error) => {
        console.log(error);
        this.isUploading = false;
      });
  }
}

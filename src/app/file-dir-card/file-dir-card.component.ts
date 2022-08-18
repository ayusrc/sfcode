import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {File} from '../file';
import {Directory} from '../directory';
import {FileService} from '../file.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-file-dir-card',
  templateUrl: './file-dir-card.component.html',
  styleUrls: ['./file-dir-card.component.scss']
})
export class FileDirCardComponent implements OnInit {

  @Input() isFile: boolean;
  @Input() level: number;
  @Input() file: File;
  @Input() directory: Directory;
  @Input() trace: number[];
  @Input() isNew: boolean;
  @Input() parentPath: string;
  @Input() noEdits = false;
  @Input() parentDirs: Directory[];
  @Input() parentFiles: File[];

  deleting: boolean;
  isExpanded = false;
  newName = '';
  isErrorDeleting = false;
  isErrorCreating = false;
  creating = false;
  creatingNewSub = 0;
  extensions = ['.cpp', '.py', '.java'];
  lang = 0;
  filenames = [];
  dirnames = [];

  @Output() deleteFile: EventEmitter<any> = new EventEmitter();
  @Output() deleteDir: EventEmitter<any> = new EventEmitter();
  @Output() createDir: EventEmitter<any> = new EventEmitter();
  @Output() createFile: EventEmitter<File> = new EventEmitter();
  @Output() cancelled: EventEmitter<boolean> = new EventEmitter();

  constructor(private fileService: FileService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    if (!this.isFile && !this.isNew) {
      this.filenames = this.directory.files.map(item => item.filename);
      this.dirnames = this.directory.dirs.map(item => item.name);
    }
  }

  onDelete(): void {
    this.deleting = true;
    this.fileService.delete(this.isFile ? this.file : this.directory, this.isFile,
      JSON.parse(this.apiService.getToken()).username, this.isFile ? 0 : this.countFiles(this.directory)).subscribe(
      data => {
        console.log(data);
        if (this.isFile) {
          this.deleteFile.emit(this.file);
        } else {
          this.deleteDir.emit(this.directory);
        }
        this.deleting = false;
      }, error => {
        console.log(error);
      }
    );
  }

  addToTraceDir(dir: Directory): number[] {
    const arr = JSON.parse(JSON.stringify(this.trace));
    arr.push(this.directory.dirs.indexOf(dir));
    return arr;
  }

  addToTraceFile(file: File): number[] {
    const arr = JSON.parse(JSON.stringify(this.trace));
    arr.push(this.directory.files.indexOf(file));
    return arr;
  }

  deleteFileExec($event: any): void {
    const index = this.directory.files.indexOf($event, 0);
    if (index > -1) {
      this.directory.files.splice(index, 1);
    }
  }

  deleteDirExec($event: any): void {
    const index = this.directory.dirs.indexOf($event, 0);
    if (index > -1) {
      this.directory.dirs.splice(index, 1);
    }
  }

  onCreateDir(): void {
    this.creating = true;
    this.fileService.createDirectory(JSON.parse(this.apiService.getToken()).username, this.newName, this.parentPath)
      .subscribe(data => {
        if (data === '0') {
          this.creating = false;
          this.isErrorCreating = true;
        } else {
          this.createDir.emit(this.newName);
        }
      });
  }

  getRouterLink(): string {
    return '/arena/file/' + encodeURIComponent(this.file.path + '/' + this.file.filename + this.file.language);
  }

  onCreateFile(): void {
    this.creating = true;
    const file: File = {
      username: JSON.parse(this.apiService.getToken()).username,
      filename: this.newName,
      language: this.extensions[this.lang],
      text: '',
      path: this.parentPath
    };
    this.fileService.upload(file, false).subscribe(data => {
      if (data === '1') {
        console.log(data);
        this.createFile.emit(file);
      } else {
        console.log(data);
        this.creating = false;
        this.isErrorCreating = true;
      }
    });
  }

  createFileExec(file: File): void {
    this.directory.files.push(file);
    this.creatingNewSub = 0;
  }

  createDirExec(name: string): void {
    this.directory.dirs.push({
      name,
      dirs: [],
      files: [],
      path: this.directory.path + this.directory.name + '/',
    });
    this.creatingNewSub = 0;
  }

  private countFiles(directory: Directory): number {
    let count = directory.files.length;
    for (const dir of directory.dirs) {
      count += this.countFiles(dir);
    }
    return count;
  }

  present(newName: string): boolean {
    if (this.isFile) {
      return this.parentFiles.map(item => item.filename + item.language).includes(newName + this.extensions[this.lang]);
    } else {
      return this.parentDirs.map(item => item.name).includes(newName);
    }
  }
}

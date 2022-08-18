import {Component, OnInit} from '@angular/core';
import {File} from '../file';
import {FileService} from '../file.service';
import {ApiService} from '../api.service';
import {User} from '../user';
import {Directory} from '../directory';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  user: User;
  mainDir: Directory = {
    name: '',
    files: [],
    dirs: [],
    path: '/'
  };
  shortLink = '';
  loading = false; // Flag variable
  deleting = false; // Flag variable
  fileToUpload: File = null;
  creatingNew = 0;

  constructor(private fileService: FileService,
              private dataService: ApiService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(this.dataService.getToken());
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFileList(this.user.username)
      .subscribe(data => {
        this.mainDir = this.toDirectory('', data, '/');
        console.log(this.mainDir);
      });
  }

  onChange(event): void {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
  }

  onUpload(): void {

    if ((document.getElementById('file-upload-input') as HTMLInputElement).value === '') {
      return;
    }

    this.loading = true;
    console.log(this.fileToUpload);

    this.fileService.upload2(this.fileToUpload).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.fileToUpload = null;
          (document.getElementById('file-upload-input') as HTMLInputElement).value = '';
          this.shortLink = event.link;
          this.loading = false;
        }
      }
    );
  }

  toDirectory(name: string, obj: any, path: string): Directory {
    const ret: Directory = {
      name,
      dirs: [],
      files: [],
      path: path === '/' ? path : path + '/'
    };

    for (const file of obj.files) {
      const sp = file.split('.');
      const f: File = {
        username: this.user.username,
        filename: file.replace(/\.[^/.]+$/, ''),
        language: '.' + sp[sp.length - 1],
        text: '',
        path: path + '/' + name
      };
      ret.files.push(f);
    }

    for (const dir in obj.dirs) {
      if (obj.dirs.hasOwnProperty(dir)) {
        ret.dirs.push(this.toDirectory(dir, obj.dirs[dir], ret.path + name));
      }
    }

    return ret;
  }

  deleteFileExec($event: any): void {
    const index = this.mainDir.files.indexOf($event, 0);
    if (index > -1) {
      this.mainDir.files.splice(index, 1);
    }
  }

  deleteDirExec($event: any): void {
    const index = this.mainDir.dirs.indexOf($event, 0);
    if (index > -1) {
      this.mainDir.dirs.splice(index, 1);
    }
  }

  createFileExec(file: File): void {
    this.mainDir.files.push(file);
    this.creatingNew = 0;
  }

  createDirExec(name: string): void {
    this.mainDir.dirs.push({
      name,
      dirs: [],
      files: [],
      path: '/'
    });
    this.creatingNew = 0;
  }

  public countFiles(directory: Directory): number {
    let count = directory.files.length;
    for (const dir of directory.dirs) {
      count += this.countFiles(dir);
    }
    return count;
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InputComponent} from '../input/input.component';
import {IdeCompileComponent} from '../ide-compile/ide-compile.component';
import {RunCodeService} from '../run-code.service';
import {SaveFileComponent} from '../save-file/save-file.component';
import {File} from '../file';
import {FileService} from '../file.service';
import {ApiService} from '../api.service';

declare const CodeMirror: any;

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {

  inp = '';
  extensions = ['.cpp', '.py', '.java'];
  loadingFile = false;
  isSaved = false;
  isUploading = false;
  isCompiling = false;
  isError = false;
  isUpToDate = false;
  file: File = {
    filename: 'Untitled',
    language: '.cpp',
    text: '',
    username: JSON.parse(this.apiService.getToken()).username,
    path: '/'
  };
  @ViewChild(InputComponent) inputField;
  @ViewChild(IdeCompileComponent) runField;
  @ViewChild(SaveFileComponent) saveField;

  constructor(public route: ActivatedRoute, public runCodeService: RunCodeService, private fileService: FileService,
              private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    const filepath = decodeURIComponent(this.route.snapshot.params.filepath);
    const editorArea = document.getElementById('editor');
    const editor = CodeMirror.fromTextArea(editorArea as HTMLTextAreaElement, {
      lineNumbers: true,
      theme: 'material-ocean',
      mode: 'text/x-c++src',
      autoCloseBrackets: true,
      matchBrackets: true
    });
    editor.setSize('auto', '70vh');
    Object.assign((document.getElementsByClassName('CodeMirror')[0] as HTMLTextAreaElement).style, {
      borderBottom: '1px solid #ddf',
      padding: '20px',
      fontFamily: '"Anonymous Pro", monospace',
    });

    let activeLang = 0;
    const langs = ['C++', 'Python', 'Java'];
    const langsMime = ['text/x-c++src', 'text/x-python', 'text/x-java'];
    const code = [`#include <iostream>
using namespace std;

int main() {
  cout << "Hello World!\\n";
  return 0;
}`, `print("Hello World!")`, `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`];

    editor.setValue(code[activeLang]);
    this.file.text = code[activeLang];
    const tl = document.getElementById('toggle-lang') as HTMLDivElement;
    tl.onclick = () => {
      if (this.isSaved) {
        return;
      }
      activeLang = (activeLang + 1) % 3;
      this.file.language = this.extensions[activeLang];
      tl.innerHTML = langs[activeLang];
      editor.setValue(code[activeLang]);
      editor.setOption('mode', langsMime[activeLang]);
    };

    editor.on('update', () => {
      if (!this.isUploading) {
        this.isUpToDate = false;
        document.getElementById('saveBtn').innerHTML = 'Save File';
      }
      code[activeLang] = editor.getValue();
      this.file.text = editor.getValue();
    });

    if (filepath !== 'new') {
      const arr = filepath.split('.');
      if (!(['cpp', 'py', 'java']).includes(arr[arr.length - 1])) {
        this.router.navigate(['arena/file/new']).then(() => window.location.reload());
      }
      const arrf = filepath.split('/');
      const arrg = arrf.pop().split('.');
      arrg.pop();
      this.file.filename = arrg.join('.');
      this.file.path = arrf.join('/');
      this.file.language = '.' + arr[arr.length - 1];
      tl.innerHTML = langs[this.extensions.indexOf(this.file.language)];
      this.fileService.getFileContent(this.file.username, filepath)
        .subscribe(data => {
          editor.setValue(data);
          this.isSaved = true;
          this.isUpToDate = true;
          this.loadingFile = false;
          console.log(this.file);
        }, error => {
          this.router.navigate(['arena/file/new']).then(() => window.location.reload());
        });
    } else {
      this.loadingFile = false;
    }

  }

  updateInput(val: string): void {
    this.inp = val;
  }

  updateFile(): void {
    const btn = document.getElementById('saveBtn') as HTMLButtonElement;
    if (btn.classList.contains('disabled')) {
      return;
    }
    this.isUploading = true;
    btn.innerHTML = 'Saving...';
    this.fileService.upload(this.file, false)
      .subscribe(data => {
        btn.innerHTML = 'Saved';
        this.isUploading = false;
        this.isUpToDate = true;
        console.log(data);
      }, error => {
        console.log(error);
        this.isUploading = false;
        btn.innerHTML = 'Save File';
      });
  }

  runFile(): void {
    const btn = document.getElementById('runBtn');
    if (btn.classList.contains('disabled')) {
      return;
    }
    this.isCompiling = true;
    this.runCodeService.compileFile(this.file)
      .subscribe(data => {
        this.runCodeService.executeFile(this.file, this.inp)
          .subscribe(d => {
            console.log(d);
            this.runField.status = '<div class="code">' + d + '</div>';
            this.runField.setState(true);
            this.isCompiling = false;
          }, err => {
            console.log(err);
            this.isCompiling = false;
            this.isError = true;
            this.runField.status = '<div class="error">Runtime Error!</div>';
            this.runField.setState(true);
            setTimeout(() => {
              this.isError = false;
            }, 3000);
          });
      }, error => {
        console.log(error);
        this.isCompiling = false;
        this.isError = true;
        this.runField.status = '<div class="error">Compilation Error!</div>';
        this.runField.setState(true);
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      });
  }

  optimizeURI(uri: string): string {
    const ret: string[] = [];
    for (const c of uri.split('/')) {
      if (c === '' || c === '.') {
      } else if (c === '..') {
        ret.pop();
      } else {
        ret.push(c);
      }
    }
    return ret.join('') === '' ? '/' : '/' + ret.join('/') + '/';
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

// import {Problem} from '../problem';
// import {ProblemService} from '../problem.service';
import {ApiService} from '../api.service';
import {InputComponent} from '../input/input.component';
import {SubmitTryCodeComponent} from '../submit-try-code/submit-try-code.component';
import {RunCodeService} from '../run-code.service';
import {Question} from '../question';
import {QuestionService} from '../question.service';
import {FileService} from '../file.service';
import {File} from '../file';

declare const CodeMirror: any;

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  title: string;
  question: Question;
  language: string;
  code: string[] = [`#include <iostream>
  using namespace std;

  int main() {
    cout << "Hello World!\\n";
    return 0;
  }`, `print("Hello World!")`, `class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`];

  customInput = '';
  compilationError = false;
  isCompiling = false;

  @ViewChild(InputComponent) inputField: InputComponent;
  @ViewChild(SubmitTryCodeComponent) submitField: SubmitTryCodeComponent;

  constructor(public router: Router, private apiService: ApiService,
              private runCodeService: RunCodeService,
              private questionService: QuestionService,
              private fileService: FileService) {
  }

  ngOnInit(): void {

    this.title = this.router.url.split('/')[3];
    this.getQuestion();

    const editorArea = document.getElementById('editor');
    const editor = CodeMirror.fromTextArea(editorArea as HTMLTextAreaElement, {
      lineNumbers: true,
      theme: 'material-ocean',
      mode: 'text/x-c++src',
      autoCloseBrackets: true,
      matchBrackets: true
    });

    editor.setSize('auto', '70vh');
    editor.setValue(this.code[0]);
    Object.assign((document.getElementsByClassName('CodeMirror')[0] as HTMLTextAreaElement).style, {
      borderBottom: '1px solid #ddf',
      padding: '20px',
      fontFamily: '"Anonymous Pro", monospace',
    });

    let activeLang = 0;
    const langs = ['C++', 'Python', 'Java'];
    const extensions = ['.cpp', '.py', '.java'];
    const langsMime = ['text/x-c++src', 'text/x-python', 'text/x-java'];

    this.language = extensions[activeLang];

    const th = document.getElementById('toggle-lang') as HTMLDivElement;
    th.onclick = () => {
      activeLang = (activeLang + 1) % 3;
      this.language = extensions[activeLang];
      th.innerHTML = langs[activeLang];
      editor.setValue(this.code[activeLang]);
      editor.setOption('mode', langsMime[activeLang]);
    };

    editor.on('update', () => {
      this.code[activeLang] = editor.getValue();
    });

  }

  // getProblem(): void {
  //   this.problemService.getProblems()
  //     .subscribe(problems => {
  //       this.problem = problems.find(i => i.id === this.id);
  //     });
  // }

  tryCode(c): void {
    // if (document.getElementById('try').classList.contains('disabled')) {
    //   return;
    // }
    this.isCompiling = true;
    const file: File = {
      username: JSON.parse(this.apiService.getToken()).username,
      filename: this.question.title,
      language: this.language,
      text: this.code[(['.cpp', '.py', '.java']).indexOf(this.language)],
      path: 'attempts/'
    };
    console.log(file);
    this.fileService.upload(file, true).subscribe(data1 => {
      console.log(data1);
      this.runCodeService.compileFile(file).subscribe(data2 => {
        console.log(data2);
        this.submitField.submitting = c;
        this.submitField.reset(file, [this.question.tc1, this.question.tc2]);
        this.submitField.isActive = true;
        this.isCompiling = false;
      }, error => {
        this.isCompiling = false;
        this.compilationError = true;
        setTimeout(() => {
          this.compilationError = false;
        }, 3000);
      });
    }, error => {
      this.isCompiling = false;
      this.compilationError = true;
      setTimeout(() => {
        this.compilationError = false;
      }, 3000);
    });
  }

  getQuestion(): void {
    this.questionService.getQues()
      .subscribe(questions => {
        this.question = questions.find(i => i.title === this.title);
        document.getElementById('p_s').innerHTML = this.question.statement;
      });
  }

}

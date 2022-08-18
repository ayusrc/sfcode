import {Component, OnInit} from '@angular/core';
// import {ProblemService} from '../problem.service';
import { ApiService } from '../api.service';
// import {Problem} from '../problem';
import { User } from '../user';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  // problems: Problem[];
  questiontoPost: Question = {
    title: "",
    username: "",
    statement: "",
    tc1: "",
    out1: "",
    tc2: "",
    out2: "",
    stime: "",
    etime: ""
  };

  questions: Question[];
  ques_final: Question[] = [];
  errorMessage: any;

  constructor(private dataService: ApiService,
    private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(this.dataService.getToken());
    this.questiontoPost.username = this.user.username;
    // this.getProblems();

    this.questionService.getQues()
      .subscribe(data => {
        this.questions = data;
        // console.log(this.questions);
        this.organizeQues();
      },
      error => this.errorMessage = <any>error
    );
  }

  organizeQues(): void {
    this.questions.forEach(element => {
      let d = new Date();
      let s = new Date(element.stime);
      let e = new Date(element.etime);
      if(s < d && e > d) {
        this.ques_final.push(element);
      }
    });

    // console.log(this.ques_final);
  }

  // getProblems(): void {
  //   this.problemService.getProblems()
  //     .subscribe(problems => this.problems = problems);
  // }

  openForm(): void {
    document.getElementById('popupForm').style.display = 'block';
  }

  closeForm(): void {
    document.getElementById('popupForm').style.display = 'none';
  }

  resetForm(): void {
    this.questiontoPost = {
      title: "",
      username: this.user.username,
      statement: "",
      tc1: "",
      out1: "",
      tc2: "",
      out2: "",
      stime: "",
      etime: ""
    };
  }

  submitForm() {
    this.questiontoPost.stime = this.questiontoPost.stime.split('T').join(' ');
    this.questiontoPost.etime = this.questiontoPost.etime.split('T').join(' ');
    this.questionService.uploadQues(this.questiontoPost).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.questiontoPost = null;
          (document.getElementById('quesform') as HTMLInputElement).value = '';
        }
        let s = new Date(this.questiontoPost.stime);
        let d = new Date();
        console.log(d);
        let e = new Date(this.questiontoPost.etime);
        if(s < d && d < e) {
          this.ques_final.push(this.questiontoPost);
        }
        this.resetForm();
        this.closeForm();
      },
      (err) => {
        alert("Question Already exists!");
      }
    );
    
  }
}

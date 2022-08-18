import {Component, Input, OnInit} from '@angular/core';
// import {Problem} from '../problem';
import {RunCodeService} from '../run-code.service';
import {Question} from '../question';
import {FileService} from '../file.service';
import {ApiService} from '../api.service';
import {File} from '../file';

@Component({
  selector: 'app-submit-try-code',
  templateUrl: './submit-try-code.component.html',
  styleUrls: ['./submit-try-code.component.scss']
})
export class SubmitTryCodeComponent implements OnInit {

  isActive = false;
  nts: number[];
  status: number[];
  @Input() question: Question;
  submitting = 0;

  constructor(public runCodeService: RunCodeService, private fileService: FileService, private apiService: ApiService) { }

  ngOnInit(): void { }

  reset(file: File, testcases: string[]): void {
    console.log(file, testcases);
    this.nts = [0, 1]; // Array(this.problem.n_testcases[this.submitting]).fill(1).map((x, i) => i);
    this.status = [0, 0]; // Array(this.problem.n_testcases[this.submitting]).fill(0);

    for (const i of this.nts) {
      this.runCodeService.executeFile(file, testcases[i])
        .subscribe(ret => {
          console.log(ret);
          let nc = 0;
          this.runCodeService.verifyTestcase(file, ret, i, this.submitting)
            .subscribe(data => {
              this.status[i] = data === 1 ? 1 : -1;
              nc += data === 1 ? 1 : 0;

              if (nc === 2) {
                this.runCodeService.update(true);
              } else if (i === 1) {
                this.runCodeService.update(false);
              }
            });
        });
    }
  }

}

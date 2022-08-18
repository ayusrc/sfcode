/*! \file
This service file is used to compile and execute file, and also to compile, execute and verify the code
written by user for  compettition questions for correctness.
*/

import {Injectable} from '@angular/core';
// import {Problem} from './problem';
import {Question} from './question';
import {File} from './file';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RunCodeService {

  runStatus = 'Compiling...';
  result = 0;
  private baseUrl = 'http://localhost/sfcode/backend/';

  constructor(private httpClient: HttpClient) {
  }

  /*! \brief 
    This function is used to post the file data for compilation.
  */

  compileFile(file: File): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'compile.php', file);
  }

  /*! \brief
    This function is used to post the file data and custom input for execution.
  */

  executeFile(file: File, input: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'execute.php', {
      file,
      input_data: input
    });
  }

  /*! \brief
    This function is used to verify the testcases while posting the file data and other relaated parameters to the backend.
  */

  verifyTestcase(file: File, out: string, ind: number, isSubmit: number): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'questions/check_output.php', {
      title: file.filename,
      username: file.username,
      out,
      ind,
      isSubmit
    });
  }

  /*! \brief 
    This function is used to update the server about the result of user attempt to the question by a boolean.
  */

  update(b: boolean): Observable<any> {
    return this.httpClient.put(this.baseUrl + 'update_correct.php', {b});
  }

  /*! \brief
    This function is for debugging purposes.
  */

  compileQuestionFile(ques: Question, code: string[]): Observable<any> {
    if (Math.floor(Math.random() * 2) === 1) {return of('done'); }
    else {return throwError('error'); }
  }
}

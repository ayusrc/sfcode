/*! \file
This service file is used to upload and get questions from the database.
*/

import {EventEmitter, Injectable, Output} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  uploadUrl = "http://localhost/sfcode/backend/questions/question_save.php";
  getUrl = "http://localhost/sfcode/backend/questions/get_questions.php";

  constructor(private http: HttpClient) { }

  /*! \brief
  This function is used to upload question from each user to database.
  */
  uploadQues(ques: Question): Observable<any> {
    return this.http.post(this.uploadUrl, ques);
  }

  /*! \brief
  This function is used to get questions from all user from database.
  */
  getQues(): Observable<Question[]> {
    return this.http.get<Question[]>(this.getUrl);
  }

}

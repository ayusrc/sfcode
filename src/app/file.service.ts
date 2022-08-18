/*! \file
This service file is used to implement different functionalities of file workspace like upload, save, create and delete
files and directories.
*/

import {Injectable} from '@angular/core';
import {File} from './file';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  /*! \brief
  Url variables to store the backend urls for post and get requests.
  */

  saveUrl = 'http://localhost/sfcode/backend/filesave.php';
  uploadUrl = 'http://localhost/sfcode/backend/fileupload.php';
  fileListUrl = 'http://localhost/sfcode/backend/dir_tree.php';
  deleteUrl = 'http://localhost/sfcode/backend/filedelete.php';
  fileContentUrl = 'http://localhost/sfcode/backend/get_file.php';
  createDirUrl = 'http://localhost/sfcode/backend/newdir.php';

  constructor(private http: HttpClient) {
  }

  /*! \brief
  Temporary function to get files used for debugging.
  */

  getFiles(): Observable<File[]> {

    const ret: File[] = [];
    const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (const item of arr) {
      ret.push({
        username: '',
        filename: 'lambda',
        language: '.cpp',
        text: 'Random Shit',
        path: '/'
      });
    }

    return of(ret);
  }

  /*! \brief
  Function to upload a file to the database using file interface and a boolean whether it is an attempt to a question 
  or created in ide.
  */

  upload(file: File, isAttempt: boolean): Observable<any> {
    return this.http.post(this.saveUrl, {file, isAttempt});
  }

  /*! \brief
  Function to upload a file to the database using upload option, was used for debugging.
  */

  upload2(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.uploadUrl, formData);
  }

  /*! \brief
  Function to delete a file from the database and server, by a post request, posting file, username and number of files .
  */

  delete(file: any, isFile: boolean, username: string, nFiles: number): Observable<any> {
    return this.http.post(this.deleteUrl, {file, isFile, username, nFiles});
  }

  /*! \brief
  Function to get files from the database and server, by a post request, posting username.
  */  
  getFileList(username: string): Observable<any> {
    return this.http.post(this.fileListUrl, {username});
  }

  /*! \brief
  Function to get file's content from the database and server, by a post request, posting username and file's path.
  */  
  getFileContent(username: string, filepath: string): Observable<any> {
    return this.http.post(this.fileContentUrl, {username, file_path: filepath});
  }

  /*! \brief
  Function to create a directory for a particular user on the server while posting username, directory name and it's path.
  */  
  createDirectory(username: string, dirname: string, path: string): Observable<any> {
    console.log(username, dirname, path);
    return this.http.post(this.createDirUrl, {username, dirname, path});
  }

}

/*! \file
 Interface for File having attributes for storing the extensions and contents of the file.
 Used in services and components for storing the ide text and uploading the server, as well as 
 compiling and executing programs.
*/

export interface File {
  username: string;
  filename: string;
  language: string;
  text: string;
  path: string;
}

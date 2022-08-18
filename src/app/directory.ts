/*! \file
 Interface for Directory having attributes for storing it's child directories, files and the path where it is tored in the server.
 Used in File management for providing User a workspace.
*/

import {File} from './file';

export interface Directory {
  name: string;
  dirs: Directory[];
  files: File[];
  path: string;
}

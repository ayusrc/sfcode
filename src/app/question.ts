/*! \file
 Interface for Question which are to be uploaded by different users.
*/

export interface Question {
    title: string;
    username: string;
    statement: string;
    tc1: string;
    out1: string;
    tc2: string;
    out2: string;
    stime: string;
    etime: string;
}

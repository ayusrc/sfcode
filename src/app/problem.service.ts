/*! \file
This service file is used to get problems from a predefined const data structure and is used for debugging purposes only.
*/

import {Injectable} from '@angular/core';
import {Problem} from './problem';
import {Observable, of} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor() {
  }

  /*! \brief
  Function to get temporary problems used for debugging.
  */  
  getProblems(): Observable<Problem[]> {

    const ret: Problem[] = [];

    const arr: number[] = [6164, 6939, 9211, 4162, 7485, 5087, 1025, 4743, 5549, 9743];

    for (const item of arr) {
      ret.push({
        id: item,
        title: 'DSA Problem',
        details: 'You could never solve it unless you invest 60% of your day and 100% of your mind you can. This problem is by our beloved Professor Mr. Ajit Diwan who specializes in posing mindfucking problems.',
        difficulty: 0,
        n_attempts: 0,
        n_correct: 0,
        problem_statement: `Some random <div class="inline-code">ICPC</div> shit sprinkled with probably his personal grudges with students. Providing a lot of hints but about - not the problem, rather its backstage proceedings. Here's a sample code in <div class="inline-code">C++</div>:
        <div class="code">#include &lt;iostream&gt;
using namespace std;

int main() {
  return 0;
}</div>
        Anyways, head on to the right section of the page to take the problem hands on, crack it ruthlessly and destroy the arrogance of the creator!`,
        code: [`#include <iostream>
using namespace std;

int main() {
  cout << "Hello World!\\n";
  return 0;
}`, `print("Hello World!")`, `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`],
        n_testcases: [5, 15]
      });
    }

    return of(ret);
  }

}

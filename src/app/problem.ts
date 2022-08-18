/*! \file
 A temporary Interface for Problem 
*/

export interface Problem {
  id: number;
  title: string;
  details: string;
  difficulty: number;
  n_attempts: number;
  n_correct: number;
  problem_statement: string;
  code: string[];
  n_testcases: number[];
}

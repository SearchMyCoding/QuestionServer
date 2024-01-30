export interface IBaseTestService{
  addQuestionAndAnswers(question: any, answers: any[]): void;
  generateRandomTest(numTests: number): any[];
  calculateResult(choices: any[]): any;
}
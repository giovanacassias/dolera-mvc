export default class MyError extends Error {
  constructor(s: string) {
    super(`meu erro personalizado é: ${s}`);
  }
}

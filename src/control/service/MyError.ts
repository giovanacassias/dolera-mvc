export default class MyError extends Error {
  constructor(message: string) {
    super(`${message}`);
    this.name = "MyError";
  }

  static invalidType() {
    // Retorna um novo erro MyError com mensagem customizada
    return new MyError("O item não é um tipo válido de viagem!");
  }
}

import ExemploJest from "../model/ExemploJest";

const ex: ExemploJest = new ExemploJest();

test("teste do getDouble", () => {
  expect(ex.getDouble(5)).toBe(10);
});

test("testando newString", () => {
  expect(ex.newString("Emerson")).toBe("Emerson Fedechen");
});

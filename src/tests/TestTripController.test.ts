import Router from "../control/Router";

const router: Router = new Router();

test("testando se exclui a viagem correta", () => {
  console.log(router.tripController.getAllTrips());
  expect(router.tripController.deleteTrip(1)).toBe("França");
  expect(router.tripController.getAllTrips().length).toBe(2);
  console.log(router.tripController.getAllTrips());
});

test("Não altera o array caso seja input inválido", () => {
  expect(router.tripController.deleteTrip(4)).toBe(
    "Número inválido! Tente novamente."
  );
});

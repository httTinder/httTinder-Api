import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";

const userData = {
  email: "teste@teste.com.br",
  name: "teste",
  password: "@12Patinhos",
  age: "57",
};

const userDataErrorPassword = {
  email: "teste@teste.com.br",
  name: "teste",
  password: "@12Patinhos",
  age: "57",
};

const loginUser = {
  email: "teste@teste.com.br",
  password: "@12Patinhos",
};

let getUser = {};
let tokenLogin = "";
describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /user - Deve ser capaz de criar um novo usuário", async () => {
    const res = await request(app).post("/user/devcreate").send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  test("POST /user - Deve retornar error caso a senha não seja adequada", async () => {
    const res = await request(app)
      .post("/user/devcreate")
      .send(userDataErrorPassword);

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("status");
  });

  test("POST /session - Deve ser capaz de efetuar o login e retornar o token", async () => {
    const res = await request(app).post("/session").send(loginUser);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    tokenLogin = res.body.accessToken;
  });

  test("GET /user/data - Deve retornar todos os dados do usuário fazendo a requisição", async () => {
    const res = await request(app)
      .get("/user/data")
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    getUser = res.body;
  });

  test("Patch /user/address - Deve ser capaz de cadastrar um address", async () => {
    const address = {
      country: "Brazil",
      city: "Sp",
      state: "Sp",
      zipCode: "12345678",
      distict: "Center",
    };
    const res = await request(app)
      .patch("/user/address/")
      .send(address)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/address - Deve ser capaz de deletar um address", async () => {
    const res = await request(app)
      .delete("/user/address/")
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(204);
  });

  test("Patch /user/profile - Deve ser capaz de cadastrar um profile", async () => {
    const profile = {
      orientation: "hetero",
      gender: "Masculino",
      bio: "Gosto de coisas",
      education: "Faculdade",
      profession: "Estudante",
    };
    const res = await request(app)
      .patch("/user/profile/")
      .send(profile)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/profile - Deve ser capaz de deletar um profile", async () => {
    const res = await request(app)
      .delete("/user/profile/")
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(204);
  });

  test("Patch /user/additional - Deve ser capaz de cadastrar um additional", async () => {
    const additional = {
      zodiac: "peixes",
      drinker: true,
      smoker: true,
      kids: true,
      kidsQnt: 3,
    };
    const res = await request(app)
      .patch("/user/additional/")
      .send(additional)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/additional - Deve ser capaz de deletar um additional", async () => {
    const res = await request(app)
      .delete("/user/additional/")
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(204);
  });
});

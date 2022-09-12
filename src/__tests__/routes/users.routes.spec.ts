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

  test("Patch /user/relationship - Deve ser capaz de cadastrar um relationship", async () => {
    const profile = {
      orientation: "hetero",
      gender: "Masculino",
      bio: "Gosto de coisas",
      education: "Faculdade",
      profession: "Estudante",
    };
    const resAdd = await request(app)
      .patch("/user/profile/")
      .send(profile)
      .set("Authorization", `Bearer ${tokenLogin}`);

    const relationship = {
      friendship: true,
      casual: false,
      serious: false,
    };
    const res = await request(app)
      .patch("/user/relationship/")
      .send(relationship)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/relationship - Deve ser capaz de deletar um relationship", async () => {
    const res = await request(app)
      .delete("/user/relationship/")
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(204);
  });

  test("Patch /user/lookingfor - Deve ser capaz de cadastrar um lookingfor", async () => {
    const lookingfor = {
      age: "18-25",
      gender: "Mulher",
      location: "algo aqui",
    };
    const res = await request(app)
      .patch("/user/lookingfor/")
      .send(lookingfor)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/lookingfor - Deve ser capaz de deletar um lookingfor", async () => {
    const res = await request(app)
      .delete("/user/lookingfor/")
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(204);
  });

  test("Patch /user/hobbies - Deve ser capaz de cadastrar um hobbies", async () => {
    const additional = {
      zodiac: "peixess",
      drinker: true,
      smoker: true,
      kids: true,
      kidsQnt: 3,
    };
    const resAdd = await request(app)
      .patch("/user/additional/")
      .send(additional)
      .set("Authorization", `Bearer ${tokenLogin}`);

    const hobbies = {
      name: "alô bo trabalhar",
    };

    const res = await request(app)
      .patch("/user/hobbies/")
      .send(hobbies)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/hobbies - Deve ser capaz de deletar um hobbies", async () => {
    const resUser = await request(app)
      .get("/user/data")
      .set("Authorization", `Bearer ${tokenLogin}`);

    const id = resUser.body.userAdditionalData.hobbies[0].id;

    const uuid = {
      uuid: id,
    };

    const res = await request(app)
      .delete("/user/hobbies/")
      .send(uuid)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
  });

  test("Patch /user/music - Deve ser capaz de cadastrar um music", async () => {
    const music = {
      music: "alô bo trabalhar",
    };

    const res = await request(app)
      .patch("/user/music/")
      .send(music)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/music - Deve ser capaz de deletar um music", async () => {
    const resUser = await request(app)
      .get("/user/data")
      .set("Authorization", `Bearer ${tokenLogin}`);

    const id = resUser.body.userAdditionalData.userMusicGenre[0].id;

    const uuid = {
      uuid: id,
    };

    const res = await request(app)
      .delete("/user/music/")
      .send(uuid)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
  });

  test("Patch /user/pets - Deve ser capaz de cadastrar um pets", async () => {
    const pets = {
      specie: "alô bo trabalhar",
    };

    const res = await request(app)
      .patch("/user/pets/")
      .send(pets)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/pets - Deve ser capaz de deletar um pets", async () => {
    const resUser = await request(app)
      .get("/user/data")
      .set("Authorization", `Bearer ${tokenLogin}`);

    const id = resUser.body.userAdditionalData.pets[0].id;

    const uuid = {
      uuid: id,
    };

    const res = await request(app)
      .delete("/user/pets/")
      .send(uuid)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
  });

  test("Patch /user/languages - Deve ser capaz de cadastrar um languages", async () => {
    const languages = {
      language: "alô bo trabalhar",
    };

    const res = await request(app)
      .patch("/user/languages/")
      .send(languages)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete /user/languages - Deve ser capaz de deletar um languages", async () => {
    const resUser = await request(app)
      .get("/user/data")
      .set("Authorization", `Bearer ${tokenLogin}`);

    const id = resUser.body.userAdditionalData.userLanguages[0].id;

    const uuid = {
      uuid: id,
    };

    const res = await request(app)
      .delete("/user/languages/")
      .send(uuid)
      .set("Authorization", `Bearer ${tokenLogin}`);

    expect(res.status).toBe(200);
  });
});

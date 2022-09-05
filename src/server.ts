import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Sou rce Initialization", err);
  });
  app.listen(3000, () => {
    console.log("Servidor Executando");
  });
})();

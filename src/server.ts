import app from "./app";

(async () => {
  app.listen(process.env.PORT || 3000, () => console.log("Server is runing "));
})();

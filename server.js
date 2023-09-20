const dotenv = require("dotenv");
dotenv.config();
const app = require("./middleware/app");

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

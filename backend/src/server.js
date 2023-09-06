require("dotenv").config();
import app from "./app";

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

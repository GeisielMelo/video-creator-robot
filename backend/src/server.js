require("dotenv").config();
import app from "./app";

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`\x1b[32mServer started on port \x1b[33m${port}\x1b[0m`);
});

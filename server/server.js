import { app } from "./app.js";
import { dbConnection } from "./Database/dbConnection.js";
app.listen(process.env.PORT, () => {
  dbConnection();
  console.log(`server is listening on port`, process.env.PORT);
});

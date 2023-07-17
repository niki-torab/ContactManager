const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config()
const cors = require('cors');
const cookieParser = require('cookie-parser');


connectDb();
const app = express();
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
app.use(cookieParser());



const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});


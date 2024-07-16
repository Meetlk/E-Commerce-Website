const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8080;

//cookie-parser - what is this and why we need this ?

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000" || 8080,
		credentials: true,
	})
);

require("./config/database").connect();

//route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

app.get('/', (req,res) => {
    res.send("<h1>Welcome to E-Commerce App </h1>")
})

//activate

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})
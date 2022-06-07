import app from "./app.js";
import chalk from "chalk";

const PORT = process.env.PORT;

app.listen(
    PORT,
    console.log(chalk.bold.cyan(`Server is Running on port ${PORT}...`))
);

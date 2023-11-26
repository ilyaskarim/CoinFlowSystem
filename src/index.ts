import express from 'express';
import cors from "cors"
import packageJSON from './../package.json';
import {v1Routes} from "./v1/routes"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
    next();
})

app.get('/', (req, res) => {
    res.status(200).json({
        message: "You are running CoinFlowSystem",
        version: packageJSON.version
    })
});

v1Routes(app)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

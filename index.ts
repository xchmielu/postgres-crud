import express from "express";
import indexRoutes from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
// import request from "request";

const app = express();
// const router = express.Router();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const API_ENDPOINT = "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

app.get("/products", (req, res) => {
  const getProduct = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/products`);
      const json = await response.json();
      res.json(json);
      res.end();
    } catch (error) {
      console.log(error);
    }
  };
  getProduct();
});

app.get("/products/:id", (req, res) => {
  const getDetailProduct = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/products/${req.params.id}`);
      const json = await response.json();
      res.json(json);
      res.end();
    } catch (error) {
      console.log(error);
    }
  };
  getDetailProduct();
});

const handleListen = (PORT) => {
  console.log(`Listen on ${PORT} port`);
};

app.listen(PORT, handleListen(PORT));

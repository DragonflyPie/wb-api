const express = require("express");
const { getCardsIds, getStockData } = require("./utils");

const app = express();
const port = 8080;

const storeId = 117986;
const cardUrl =
  "https://basket-10.wbbasket.ru/vol1469/part146972/146972802/info/ru/card.json";

app.get("/", async function (req, res) {
  try {
    const cardsIds = await getCardsIds(cardUrl);
    console.log(cardsIds);
    const stock = await getStockData({ cardsIds, storeId });

    res.send(stock);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port);

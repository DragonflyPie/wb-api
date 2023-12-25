const { getCardsIds, getStockData } = require("./utils");
const storeId = 117986;
const cardUrl =
  "https://basket-10.wbbasket.ru/vol1469/part146972/146972802/info/ru/card.json";

const service = async function () {
  const cardsIds = await getCardsIds(cardUrl);
  const stock = await getStockData({ cardsIds, storeId });

  console.log(stock);
  return stock;
};
service();

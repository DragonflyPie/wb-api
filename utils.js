const getCardsIds = async (url) => {
  const card = await fetch(url);
  const cardData = await card.json();
  const cardsIds = await cardData.colors;

  return cardsIds.join(";");
};

const getStockData = async ({ cardsIds, storeId }) => {
  const fetchProducts = await fetch(
    `https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-1257786&spp=27&nm=${cardsIds}`
  );

  const productsData = await fetchProducts.json();

  const stock = await productsData.data.products.flatMap((product) => {
    const sizeees = product.sizes.reduce((a, b) => {
      const storeStock = b.stocks.find((stock) => stock.wh === storeId);

      if (storeStock) {
        let { origName } = b;
        let { qty } = storeStock;

        return { ...a, [origName]: qty };
      }
    }, {});
    if (!sizeees) {
      return [];
    }
    return { art: product.id, stock: sizeees };
  });

  return stock;
};

module.exports = { getStockData, getCardsIds };

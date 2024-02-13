import CartManager from "../dao/mongomanagers/cartManagerMongo";

const cartManager = new CartManager()

socketClient.on("addProductToCart", (productId) => {
  cartManager.addProductInCart(cid, productId)
    .then((cart) => {
      console.log('Producto agregado al carrito:', cart);

    })
    .catch((err) => {
      console.error('Error al agregar el producto al carrito:', err.message);
    });
  console.log(`Añadiendo producto al carrito: ${productId}`);
});

socketClient.on("deleteProductFromCart", async (productId) => {
  try {

    const cart = await cartModel.findOne({ 'products._id': productId });

    if (!cart) {
      console.log(`El carrito que contiene el producto con ID ${productId} no fue encontrado.`);
      return;
    }

    const productIndex = cart.products.findIndex(product => product._id.toString() === productId);

    if (productIndex === -1) {
      console.log(`El producto con ID ${productId} no fue encontrado en el carrito.`);
      return;
    }

    cart.products.splice(productIndex, 1);

    await cart.save();

    console.log(`Producto con ID ${productId} eliminado del carrito.`);
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error.message);
  }
});

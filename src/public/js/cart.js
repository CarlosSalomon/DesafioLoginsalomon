
document.querySelectorAll('.add-to-cart-button').forEach(button => {
  button.addEventListener('click', async function (event) {
    event.preventDefault();

    const productId = this.dataset.productId;
    const quantity = parseInt(this.parentElement.querySelector('.quantity-input-field').value); // Obtengo la cantidad del campo de entrada

    try {
      const response = await fetch('/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity }) // Incluyo la cantidad en la solicitud
      });

      const data = await response.json();

      if (data.success) {

        Swal.fire('¡Éxito!', data.message, 'success');

      } else {

        Swal.fire('Error', data.message, 'error');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);

      Swal.fire('Error', 'Error al procesar la solicitud', 'error');
    }
  });
});

//boton eliminar del carrito
document.querySelectorAll('.delete-to-cart-button').forEach(button => {
  button.addEventListener('click', async function (event) {
    event.preventDefault();

    const productId = this.dataset.productId;
    console.log(productId)
    try {
      Swal.fire({
        title: "Seguro que quieres eliminar el producto?",
        text: "MB HOMES",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No!"
      }).then(async (result) => {
        if (result.isConfirmed) {

          const response = await fetch('/delete-to-cart', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
          });

          const data = await response.json();
          console.log(data)
          if (data.success) {
            Swal.fire({
              title: "Producto Eliminado!",
              text: "Gracias.",
              icon: "success",
              showConfirmButton: false,
              timer: 3000
            }).then(() => {

              window.location.reload();
            });
          } else {
            Swal.fire('Error', data.message, 'error');
          }
        } else {
          Swal.fire({
            title: "Eliminación cancelada",
            text: "El producto no ha sido eliminado.",
            icon: "info",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      Swal.fire('Error', 'Error al procesar la solicitud', 'error');
    }
  });
});
//boton cantidad

document.querySelectorAll('.quantity-button').forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault();

    const inputField = this.parentElement.querySelector('.quantity-input-field');
    let quantity = parseInt(inputField.value);

    if (this.classList.contains('quantity-up')) {
      quantity++;
    } else if (this.classList.contains('quantity-down')) {
      quantity = Math.max(1, quantity - 1);
    }

    inputField.value = quantity;
  });
});
//total gral
document.addEventListener('DOMContentLoaded', function () {
  const productRows = document.querySelectorAll('#data-product');
  let totalGeneral = 0;

  productRows.forEach(row => {
    const productPrice = parseFloat(row.dataset.productPrice);
    const productQuantity = parseInt(row.dataset.productQuantity);
    const totalPriceProduct = productPrice * productQuantity;
    row.querySelector('td:last-child').textContent = totalPriceProduct;
    totalGeneral += totalPriceProduct;
  });
  document.getElementById('totalGeneral').textContent = totalGeneral;
});
//filtro
const sortForm = document.getElementById('sortForm');

sortForm.addEventListener('change', (event) => {
  const selectedSort = document.querySelector('input[name="exampleRadios"]:checked').value;
  const selectedCategory = document.getElementById('categorySelect').value;
  let newUrl = `/?sort=${selectedSort}&category=${selectedCategory}`;
  console.log(newUrl);
  window.location.href = newUrl;
});
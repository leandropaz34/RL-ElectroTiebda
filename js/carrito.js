document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM (si existen en la página actual)
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  const cantidadElemento = document.getElementById("carrito-cantidad");

  // Obtener carrito desde localStorage o crear uno nuevo vacío
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Actualiza el carrito si hay elementos visibles en el HTML
  actualizarCarrito();

  // Función global para agregar productos desde cualquier página
  window.agregarAlCarrito = function(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarCarrito();
    actualizarCarrito();
  };

  // Función global para vaciar el carrito
  window.vaciarCarrito = function() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  };

  // Función global para enviar el pedido por WhatsApp o Email
  window.enviarPedido = function() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    const detalles = carrito.map(p => `- ${p.nombre}: $${p.precio}`).join("%0A");
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);
    const mensaje = `Hola, quiero hacer un pedido:%0A${detalles}%0ATotal: $${total}`;

    const whatsappURL = `https://wa.me/5491176427262?text=${mensaje}`;
    const mailtoURL = `mailto:rl.electrotienda@gmail.com?subject=Pedido&body=${mensaje}`;

    if (confirm("¿Querés enviar el pedido por WhatsApp? (Cancelar para enviarlo por email)")) {
      window.open(whatsappURL, '_blank');
    } else {
      window.open(mailtoURL);
    }
  };

  // Actualiza la vista del carrito (si los elementos están presentes)
  function actualizarCarrito() {
    // Solo mostrar lista y total si estamos en carrito.html
    if (listaCarrito && totalElemento) {
      listaCarrito.innerHTML = "";
      let total = 0;
      carrito.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        listaCarrito.appendChild(li);
        total += item.precio;
      });
      totalElemento.textContent = total;
    }

    // Siempre que exista el contador en el menú, actualizarlo
    if (cantidadElemento) {
      cantidadElemento.textContent = carrito.length;
    }
  }

  // Guarda el carrito en localStorage
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
});

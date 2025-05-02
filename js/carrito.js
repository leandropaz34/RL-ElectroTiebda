document.addEventListener("DOMContentLoaded", () => {
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();

  window.agregarAlCarrito = function(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarCarrito();
    actualizarCarrito();
  };

  window.vaciarCarrito = function() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  };

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

  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - $${item.precio}`;
      listaCarrito.appendChild(li);
      total += item.precio;
    });
    totalElemento.textContent = total;
  }

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
});

$(document).ready(function() {
    // Mostrar la hora local en el encabezado
    function mostrarHoraLocal() {
        const ahora = new Date();
        const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const horaLocal = ahora.toLocaleTimeString('es-ES', opciones);
        $('#hora-local').text(horaLocal);
    }

    // Actualizar la hora cada segundo
    setInterval(mostrarHoraLocal, 1000);
    mostrarHoraLocal();

    // Manejar la adición de productos al carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    $('.agregar-carrito').on('click', function(e) {
        e.preventDefault();
        const idProducto = $(this).data('id');
        const producto = $(this).closest('.producto');
        const nombreProducto = producto.find('.card-title').text();
        const precioProducto = parseFloat(producto.find('.precio span').text());

        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.id === idProducto);
        if (productoExistente) {
            productoExistente.cantidad += 1; // Incrementar la cantidad
            mostrarMensaje('success', 'Producto actualizado', `${nombreProducto} ahora tiene ${productoExistente.cantidad} en el carrito.`);
        } else {
            carrito.push({ id: idProducto, nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
            mostrarMensaje('success', 'Producto agregado', `${nombreProducto} ha sido agregado al carrito.`);
        }

        // Guardar el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    });

    // Función para mostrar mensajes con SweetAlert
    function mostrarMensaje(icono, titulo, texto) {
        Swal.fire({
            icon: icono,
            title: titulo,
            text: texto,
            confirmButtonText: 'Aceptar'
        });
    }

    // Función para convertir divisas (Ejemplo simple)
    function convertirDivisa(precio, tasaConversion) {
        return (precio * tasaConversion).toFixed(2);
    }

    // Manejar la conversión de divisas al cambiar la selección
    $('#select-divisa').on('change', function() {
        const tasaConversion = parseFloat($(this).val());
        if (!isNaN(tasaConversion)) {
            $('.precio span').each(function() {
                const precioOriginal = parseFloat($(this).data('precio-original'));
                const precioConvertido = convertirDivisa(precioOriginal, tasaConversion);
                $(this).text(precioConvertido);
            });
        }
    });

    // Evento para girar la ruleta
    $('#btn-ruleta').on('click', function() {
        const descuentos = [5, 10, 15, 20, 25];
        const descuento = descuentos[Math.floor(Math.random() * descuentos.length)];
        mostrarMensaje('info', '¡Felicidades!', `Has ganado un descuento del ${descuento}% en tu próxima compra.`);
    });
});

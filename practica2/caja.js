let pedidos = [];
let totalAcumulado = 0;
let contadorPedidos = 1;

function procesarPedido(nombreCliente, items) {
    let itemsDetalle = [];
    let totalPedido = 0;

    for (let item of items) {
        const producto = productos.find(p => p.id === item.productoId);
        if (producto) {
            if (producto.cantidad >= item.cantidad && item.cantidad > 0) {
                producto.cantidad -= item.cantidad;
                const subtotal = producto.precio * item.cantidad;
                itemsDetalle.push({
                    nombre: producto.nombre,
                    cantidad: item.cantidad,
                    subtotal: subtotal
                });
                totalPedido += subtotal;
            } else {
                console.log(`Stock insuficiente para el producto ID ${item.productoId}`);
            }
        } else {
            console.log(`Producto ID ${item.productoId} no encontrado.`);
        }
    }

    if (itemsDetalle.length > 0) {
        const nuevoPedido = {
            id: contadorPedidos++,
            cliente: nombreCliente.trim(),
            items: itemsDetalle,
            total: totalPedido
        };
        pedidos.push(nuevoPedido);
        totalAcumulado += totalPedido;
        console.log(`\nPedido #${nuevoPedido.id} creado con exito.`);
    }
}

async function menuCaja() {
    let salir = false;
    while (!salir) {
        console.log("\n--- MODULO CAJA ---");
        console.log("1. Mostrar inventario");
        console.log("2. Mostrar todos los pedidos");
        console.log("3. Ver total acumulado");
        console.log("4. Regresar al menu principal");
        
        const opcion = await preguntar("\nElige una opcion: ");
        
        switch (opcion.trim()) {
            case '1':
                listarProductos();
                break;
            case '2':
                if (pedidos.length === 0) {
                    console.log("\nNo hay pedidos registrados.");
                } else {
                    console.log("\n--- HISTORIAL DE PEDIDOS ---");
                    pedidos.forEach(pedido => {
                        console.log(`Pedido #${pedido.id} | Cliente: ${pedido.cliente} | Total: $${pedido.total.toFixed(2)}`);
                    });
                }
                break;
            case '3':
                console.log(`\nTotal acumulado en caja: $${totalAcumulado.toFixed(2)}`);
                break;
            case '4':
                salir = true;
                break;
            default:
                console.log("Opcion no valida.");
        }
    }
}
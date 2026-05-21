let pedidos = [];
let totalAcumulado = 0;
let contadorPedidos = 1;

const IVA_RATE = 0.16;

function procesarPedido(nombreCliente, items) {
    let itemsValidos = [];
    
    for (let item of items) {
        const producto = productos.find(p => p.id === item.productoId);
        if (!producto) {
            console.log(`Producto ID ${item.productoId} no encontrado.`);
            continue;
        }
        if (producto.cantidad >= item.cantidad && item.cantidad > 0) {
            producto.cantidad -= item.cantidad;
            const subtotalItem = producto.precio * item.cantidad;
            itemsValidos.push({
                nombre: producto.nombre,
                cantidad: item.cantidad,
                precioUnitario: producto.precio,
                subtotal: subtotalItem
            });
        } else {
            console.log(`Stock insuficiente para ${producto.nombre}. Disponible: ${producto.cantidad}`);
        }
    }
    
    if (itemsValidos.length === 0) {
        console.log("No se pudo procesar el pedido: ningún producto válido.");
        return;
    }
    
    const subtotal = itemsValidos.reduce((acum, item) => acum + item.subtotal, 0);
    
    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;
    
    const nuevoPedido = {
        id: contadorPedidos++,
        cliente: nombreCliente.trim(),
        items: itemsValidos,
        subtotal: subtotal,
        iva: iva,
        total: total
    };
    
    pedidos.push(nuevoPedido);
    totalAcumulado += total;
    
    console.log(`\n Pedido #${nuevoPedido.id} creado con éxito.`);
    console.log(`   Subtotal: $${subtotal.toFixed(2)} | IVA: $${iva.toFixed(2)} | Total: $${total.toFixed(2)}`);
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
                        const { id, cliente, subtotal, iva, total } = pedido;
                        console.log(`Pedido #${id} | ${cliente} | Sub: $${subtotal.toFixed(2)} | IVA: $${iva.toFixed(2)} | Total: $${total.toFixed(2)}`);
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
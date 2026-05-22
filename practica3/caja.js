function procesarPedido(nombreCliente, items) {
    let itemsDetalle = [];

    for (let item of items) {
        const { productoId, cantidad } = item; 
        const producto = productos.find(p => p.id === productoId); 
        
        if (producto) {
            if (producto.cantidad >= cantidad && cantidad > 0) {
                producto.cantidad -= cantidad;
                
                let subtotalItem = producto.precio * cantidad;
                let notaPromo = "";

                if (cantidad === 3) {
                    subtotalItem = producto.precio * 2;
                    notaPromo = ` ${color.verde}[PROMO 3x2]${color.reset}`;
                } else if (cantidad > 3) {
                    subtotalItem = subtotalItem * 0.90;
                    notaPromo = ` ${color.verde}[-10% DESC]${color.reset}`;
                }

                itemsDetalle.push({
                    nombre: producto.nombre + notaPromo,
                    cantidad: cantidad,
                    subtotalItem: subtotalItem
                });
            } else {
                console.log(`${color.rojo}Stock insuficiente para el producto ID ${productoId}${color.reset}`);
            }
        } else {
            console.log(`${color.rojo}Producto ID ${productoId} no encontrado.${color.reset}`);
        }
    }

    if (itemsDetalle.length > 0) {
        const subtotalPedido = itemsDetalle.reduce((acumulador, itemActual) => acumulador + itemActual.subtotalItem, 0);
        const iva = subtotalPedido * 0.16;
        const totalPedido = subtotalPedido + iva;

        const nuevoPedido = {
            id: contadorPedidos++,
            cliente: nombreCliente.trim(),
            items: itemsDetalle,
            subtotal: subtotalPedido,
            iva: iva,
            total: totalPedido
        };
        pedidos.push(nuevoPedido);
        totalAcumulado += totalPedido;
        
        console.log(`\n${color.fondoVerde}${color.blanco} Pedido #${nuevoPedido.id} procesado con exito ${color.reset}`);
        console.log(`Subtotal: $${subtotalPedido.toFixed(2)} | IVA (16%): $${iva.toFixed(2)} | ${color.fondoBlanco}${color.negro} TOTAL: $${totalPedido.toFixed(2)} ${color.reset}`);
        
        mostrarPromociones();
    }
}
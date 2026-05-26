import { preguntar, color, db, listarProductos } from './datos.js';

export function notificarCaja(error, pedido) {
    if (error) {
        console.log(`\n${color.fondoBlanco}${color.rojo}  [CAJA] Notificación: Pedido #${pedido.id} CANCELADO. Motivo: ${error} ${color.reset}`);
    } else {
        console.log(`\n${color.fondoBlanco}${color.verde}  [CAJA] Notificación: Pedido #${pedido.id} LISTO. Total cobrado: $${pedido.total.toFixed(2)} ${color.reset}`);
        db.pedidos.push(pedido);
        db.totalAcumulado += pedido.total;
    }
}

export async function menuCaja() {
    let salir = false;
    while (!salir) {
        console.log(`\n${color.fondoVerde}${color.blanco} --- MODULO CAJA --- ${color.reset}`);
        console.log(`${color.blanco}1. Mostrar inventario${color.reset}`);
        console.log(`${color.blanco}2. Mostrar todos los pedidos${color.reset}`);
        console.log(`${color.blanco}3. Ver total acumulado${color.reset}`);
        console.log(`${color.blanco}4. Regresar al menu principal${color.reset}`);
        
        const opcion = await preguntar(`\n${color.verde}Elige una opcion: ${color.reset}`);
        
        switch (opcion.trim()) {
            case '1':
                listarProductos();
                break;
            case '2':
                if (db.pedidos.length === 0) {
                    console.log(`\n${color.rojo}No hay pedidos registrados.${color.reset}`);
                } else {
                    console.log(`\n${color.fondoBlanco}${color.verde} --- HISTORIAL DE PEDIDOS --- ${color.reset}`);
                    db.pedidos.forEach(pedido => {
                        console.log(`Pedido #${color.verde}${pedido.id}${color.reset} | Cliente: ${color.blanco}${pedido.cliente}${color.reset} | Total: ${color.verde}$${pedido.total.toFixed(2)}${color.reset}`);
                    });
                }
                break;
            case '3':
                console.log(`\n${color.fondoVerde}${color.blanco} Total acumulado en caja: $${db.totalAcumulado.toFixed(2)} ${color.reset}`);
                break;
            case '4':
                salir = true;
                break;
            default:
                console.log(`${color.rojo}Opcion no valida.${color.reset}`);
        }
    }
}
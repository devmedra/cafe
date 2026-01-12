// SIMULACIÓN DE BASE DE DATOS (Editable)
const CAFETERIA_DATA = {
    config: {
        nombre: "Coffee Hub",
        promoActiva: true,
        mensajePromo: "¡2x1 en Cappuccino todos los jueves!",
        horarioApertura: 8, // 8 AM
        horarioCierre: 20   // 8 PM
    },
    menu: [
        { id: 1, nombre: "Espresso", precio: "$2.50", categoria: "Cafe", disponible: true },
        { id: 2, nombre: "Cappuccino", precio: "$3.50", categoria: "Cafe", disponible: true },
        { id: 3, nombre: "Muffin de Arándanos", precio: "$2.00", categoria: "Pastelería", disponible: true },
        { id: 4, nombre: "Tostada Avocado", precio: "$5.00", categoria: "Comida", disponible: false }
    ]
};

// 1. Gestionar Horario Dinámico
function checkHorario() {
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const badge = document.getElementById('status-badge');
    
    if (horaActual >= CAFETERIA_DATA.config.horarioApertura && horaActual < CAFETERIA_DATA.config.horarioCierre) {
        badge.innerText = "● Abierto ahora";
        badge.className = "badge open";
    } else {
        badge.innerText = "● Cerrado por ahora";
        badge.className = "badge closed";
    }
}

// 2. Renderizar Menú Editable
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = CAFETERIA_DATA.menu
        .filter(item => item.disponible) // Solo muestra si está disponible
        .map(item => `
            <div class="menu-item">
                <h4>${item.nombre}</h4>
                <p>${item.categoria}</p>
                <span class="price">${item.precio}</span>
            </div>
        `).join('');
}

// 3. Activar/Desactivar Promociones
function checkPromos() {
    const promoEl = document.getElementById('promos');
    if (CAFETERIA_DATA.config.promoActiva) {
        promoEl.innerHTML = `<p><strong>PROMO:</strong> ${CAFETERIA_DATA.config.mensajePromo}</p>`;
        promoEl.classList.add('promo-active');
    }
}

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    checkHorario();
    renderMenu();
    checkPromos();
});

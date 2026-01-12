const DB = {
    settings: {
        name: "Brew & Co.",
        openHour: 9,
        closeHour: 21,
        promo: {
            active: true,
            text: "☕ HAPPY HOUR: 20% dcto en filtrados de 16:00 a 18:00"
        }
    },
    items: [
        { id: 1, title: "Flat White", price: 3200, cat: "Café", desc: "Doble shot de espresso con leche sedosa." },
        { id: 2, title: "Cold Brew", price: 3500, cat: "Café", desc: "12 horas de extracción en frío." },
        { id: 3, title: "Croissant Almendras", price: 2800, cat: "Repostería", desc: "Mantequilla pura y láminas de almendra tostada." },
        { id: 4, title: "Cheesecake Berries", price: 3800, cat: "Repostería", desc: "Receta artesanal con frutos del bosque." }
    ]
};

function initApp() {
    renderStatus();
    renderPromo();
    renderMenu('Todos');
}

function renderStatus() {
    const now = new Date().getHours();
    const dot = document.getElementById('status-indicator');
    const hoursText = document.getElementById('working-hours');
    
    const isOpen = now >= DB.settings.openHour && now < DB.settings.closeHour;
    
    dot.className = isOpen ? 'status-dot open-bg' : 'status-dot closed-bg';
    hoursText.innerHTML = `
        <p><strong>Estado:</strong> ${isOpen ? 'Abierto' : 'Cerrado'}</p>
        <p>Lunes a Sábado: ${DB.settings.openHour}:00 - ${DB.settings.closeHour}:00</p>
    `;
}

function renderPromo() {
    const banner = document.getElementById('promo-banner');
    if (DB.settings.promo.active) {
        banner.innerHTML = `<p>${DB.settings.promo.text}</p>`;
        banner.style.display = 'block';
    } else {
        document.getElementById('hero-promo-link').style.display = 'none';
    }
}

function renderMenu(category) {
    const grid = document.getElementById('menu-grid');
    const filtered = category === 'Todos' ? DB.items : DB.items.filter(i => i.cat === category);
    
    grid.innerHTML = filtered.map(item => `
        <div class="menu-card">
            <span class="category-tag">${item.cat}</span>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
            <div class="price">$${item.price.toLocaleString('es-CL')}</div>
        </div>
    `).join('');
}

function filterMenu(cat) {
    // Cambiar estado activo de botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText === cat);
    });
    renderMenu(cat);
}

document.addEventListener('DOMContentLoaded', initApp);

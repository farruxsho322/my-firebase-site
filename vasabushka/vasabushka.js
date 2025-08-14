// Загрузка меню с backend
async function loadMenu() {
    const skeleton = document.querySelector('.skeleton');
    const emptyMenu = document.getElementById('empty-menu');
    const menuContainer = document.getElementById('menu-container');

    skeleton.style.display = 'block';
    emptyMenu.style.display = 'none';

    try {
        const response = await fetch('/api/menu');
        const dishes = await response.json();

        if (dishes.length === 0) {
            emptyMenu.style.display = 'block';
        } else {
            menuContainer.innerHTML = dishes.map(d => `
                <div class="dish">
                    <img src="${d.imageUrl}" alt="${d.name}">
                    <h3>${d.name}</h3>
                    <p>${d.description}</p>
                    <p>${d.price} руб.</p>
                    <button onclick="addToCart('${d.id}')">Добавить в корзину</button>
                </div>
            `).join('');
        }
    } catch (error) {
        alert('Ошибка загрузки меню: ' + error.message);
    } finally {
        skeleton.style.display = 'none';
    }
}

loadMenu();

// Валидация формы заказа
function validateOrderForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const orderType = document.querySelector('input[name="order-type"]:checked').value;
    const street = document.getElementById('street').value.trim();

    if (!name || !phone || !email) {
        alert('Заполните имя, телефон и email.');
        return false;
    }
    if (!/^\+7\d{10}$/.test(phone)) {
        alert('Телефон в формате +7XXXXXXXXXX.');
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Некорректный email.');
        return false;
    }
    if (orderType === 'delivery' && !street) {
        alert('Укажите адрес для доставки.');
        return false;
    }
    return true;
}

// Отправка заказа
document.getElementById('submit-order-btn').addEventListener('click', async () => {
    if (!validateOrderForm()) return;

    const orderData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        // Добавьте другие поля, корзину и т.д.
    };

    try {
        await fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderData) });
        alert('Заказ отправлен!');
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});

// Карусель (с проверкой)
const carousel = document.querySelector('.promo-carousel');
if (carousel) {
    // Добавьте логику touch-событий здесь
}

// Функции корзины (пример, доработайте)
let cart = [];
function addToCart(id) {
    cart.push(id);
    document.getElementById('cart-items').innerHTML = cart.length > 0 ? 'Элементы в корзине: ' + cart.length : 'Корзина пуста';
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('order-form').style.display = 'block';
});
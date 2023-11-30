document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('order-form').addEventListener('submit', addToCart);
    document.getElementById('service-type').addEventListener('change', updateOptions);
    updateCartDisplay();
});

function updateOptions() {
    var serviceType = document.getElementById('service-type').value;
    var optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    if (serviceType === 'neural-network') {
        addOptions(['Копатыч', 'Пригожин', 'Илья Шамов'], 'Выберите голос:', optionsContainer);
    } else if (serviceType === 'live-voice') {
        addOptions(['Актер 1', 'Актер 2', 'Актер 3'], 'Выберите актёра:', optionsContainer);
    }
}

function addOptions(optionsArray, labelText, container) {
    var label = document.createElement('label');
    label.textContent = labelText;

    var select = document.createElement('select');
    select.required = true;

    optionsArray.forEach(function (optionText) {
        var option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        select.appendChild(option);
    });

    container.appendChild(label);
    container.appendChild(select);
}

function addToCart(event) {
    event.preventDefault();
    var serviceType = document.getElementById('service-type').value;
    var additionalOption = document.querySelector('#options-container select') ? document.querySelector('#options-container select').value : '';
    var scriptText = document.getElementById('script-text').value;

    var orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({serviceType, additionalOption, scriptText});
    localStorage.setItem('orders', JSON.stringify(orders));

    updateCartDisplay();
}

function updateCartDisplay() {
    var cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    var orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        cartContainer.textContent = 'Ваша корзина пуста.';
        return;
    }

    orders.forEach(function (order, index) {
        var orderElement = document.createElement('div');
        orderElement.classList.add('cart-item');
        orderElement.innerHTML = `
            <p>Услуга: ${order.serviceType === 'neural-network' ? 'Нейросеть' : 'Живой голос'}</p>
            <p>Выбор: ${order.additionalOption}</p>
            <p>Текст: ${order.scriptText}</p>
            <button onclick="removeFromCart(${index})">Удалить из корзины</button>
        `;
        cartContainer.appendChild(orderElement);
    });
}

// Функция для удаления заказа из корзины
window.removeFromCart = function (index) {
    var orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    updateCartDisplay();
}


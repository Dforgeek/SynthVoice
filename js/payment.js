document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Форма отправлена!');
    });

    document.getElementById('service-type').addEventListener('change', updateOptions);
});

function updateOptions() {
    var serviceType = document.getElementById('service-type').value;
    var optionsContainer = document.getElementById('options-container');

    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }

    var optionsArray = serviceType === 'neural-network'
        ? ['Копатыч', 'Пригожин', 'Мориарти']
        : ['Дмитрий Нагиев', 'Огузок', 'Всеволод Кузнецов'];

    if (serviceType) {
        var label = document.createElement('label');
        label.for = 'additional-options';
        label.textContent = serviceType === 'neural-network' ? 'Выберите голос:' : 'Выберите актёра:';

        var select = document.createElement('select');
        select.id = 'additional-options';
        select.name = 'additional-options';
        select.required = true;

        var defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Выберите из списка...';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        optionsArray.forEach(function(optionText) {
            var option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            select.appendChild(option);
        });

        optionsContainer.appendChild(label);
        optionsContainer.appendChild(select);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем корзину при загрузке страницы
    updateCartDisplay();

    document.getElementById('payment-form').addEventListener('submit', function(event) {
        // Обработка формы оплаты
        event.preventDefault();
        alert('Форма оплаты отправлена!');
    });
});

function updateCartDisplay() {
    var cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    // Получаем заказы из LocalStorage
    var orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Если в корзине нет заказов, отображаем сообщение об этом
    if (orders.length === 0) {
        cartContainer.textContent = 'Ваша корзина пуста.';
        return;
    }

    // Создаем и добавляем элементы заказа в корзину
    orders.forEach(function(order, index) {
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

window.removeFromCart = function(index) {
    var orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    updateCartDisplay();
};

(function() {
    let openPageTime = performance.now();

    document.addEventListener('DOMContentLoaded', function() {
        let loadPageTime = performance.now();
        let loadTime = loadPageTime - openPageTime;
        var footer = document.querySelector('footer');
        var statsParagraph = document.createElement('p');
        statsParagraph.textContent = 'Время загрузки страницы: ' + loadTime + ' мс';
        footer.appendChild(statsParagraph);

        var menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(function(item) {
            item.addEventListener('mouseover', function() {
                this.style.backgroundColor = 'lightblue'; // Пример изменения стиля
            });
            item.addEventListener('mouseout', function() {
                this.style.backgroundColor = ''; // Сброс стиля
            });
        });

        var currentPage = document.location.pathname;
        menuItems.forEach(function(item) {
            if (item.href.includes(currentPage)) {
                item.classList.add('active');
            }
        });
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('.navigation-menu ul li a');
    var currentLocation = window.location.pathname.split('/').pop();

    menuItems.forEach(function(item) {
        if (currentLocation === item.getAttribute('href')) {
            item.parentElement.classList.add('active');
        }
    });
});
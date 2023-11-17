document.addEventListener('DOMContentLoaded', function() {
    var buyButton = document.querySelector('.buy-button');
    if (buyButton) {
        buyButton.addEventListener('click', function() {
            window.location.href = 'payment.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('buy-now');
    const paymentSuccess = document.getElementById('payment-success');
    const paymentFailure = document.getElementById('payment-failure');

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to proceed with the checkout.');
        window.location.href = 'login.html';
    }

    // Handle checkout button click
    checkoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        const cardNumber = document.getElementById('cardNumber').value;
        const cardCvv = document.getElementById('cardCvv').value;

        if (cardNumber === '1234 5678 9102 3456' && cardCvv === '123') {
            // Show success message
            paymentFailure.style.display = 'none';
            paymentSuccess.style.display = 'block';

            // Clear cart and update localStorage
            localStorage.setItem('cart', JSON.stringify([]));
        } else {
            // Show failure message
            paymentSuccess.style.display = 'none';
            paymentFailure.style.display = 'block';
        }
    });
});
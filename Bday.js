document.getElementById('birthdayForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Get user input
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // Calculate next birthday
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    const nextBirthday = new Date(today.getFullYear(), month - 1, day);

    // If birthday has already passed this year, set for next year
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    // Calculate the time remaining
    const timeRemaining = nextBirthday - today;
    displayCountdown(timeRemaining);

    // Optionally save the birthdate (e.g., in local storage)
    localStorage.setItem('birthDate', JSON.stringify(birthDate));
});

function displayCountdown(timeRemaining) {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = ` Next birthday: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Update the countdown every second
    setTimeout(function() {
        displayCountdown(timeRemaining - 1000);
    }, 1000);
}

// Example of sending a notification (browser must have permission)
function sendNotification() {
    if (Notification.permission === 'granted') {
        new Notification("Happy Birthday!");
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification("Happy Birthday!");
            }
        });
    }
}

// Example check for notification on birthday
setInterval(() => {
    const today = new Date();
    const birthDate = new Date(JSON.parse(localStorage.getItem('birthDate')));
    if (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()) {
        sendNotification();
    }
}, 60000); // Check every minute

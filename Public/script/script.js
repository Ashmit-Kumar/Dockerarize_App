// Fetch and display users and visitor count on page load
async function fetchUserData() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        
        // Update user list and visitor count
        updateUserList(data.users);
        document.getElementById('visitor-count').innerText = data.visitorCount;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Call fetchUserData when the page loads
window.onload = fetchUserData;

document.getElementById('submit-button').addEventListener('click', async function () {
    const name = document.getElementById('name').value || 'Guest Name';
    const email = document.getElementById('email').value || 'Guest Email';
    const photo = document.getElementById('photo').value;

    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, photo }),
    });

    const data = await response.json();

    // Update displayed user data only if the response is successful
    if (response.ok) {
        // Update displayed user data
        document.getElementById('display-name').innerText = name;
        document.getElementById('display-email').innerText = email;

        // Update user photo
        const userPhoto = document.getElementById('user-photo');
        userPhoto.src = photo || '';
        userPhoto.alt = `${name}'s Profile Photo`;

        // Clear input fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('photo').value = '';

        // Fetch updated user list and visitor count
        const userResponse = await fetch('http://localhost:3000/api/users');
        const userData = await userResponse.json();

        // Update user list and visitor count
        updateUserList(userData.users);
        document.getElementById('visitor-count').innerText = userData.visitorCount-1;
    } else {
        console.error('Failed to add user:', data.message);
    }
});

function updateUserList(users) {
    const usersList = document.getElementById('users');
    usersList.innerHTML = ''; // Clear existing list
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
        usersList.appendChild(userItem);
    });
}

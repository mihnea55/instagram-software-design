const API_BASE_URL = "http://localhost:8080/api/users";

export function getUsers() {
    return fetch(API_BASE_URL).then((response) => response.json());
}

export function getUserById(userId) {
    return fetch(`${API_BASE_URL}/${userId}`).then((response) => response.json());
}

export function getUsersByUsername(username) {
    return fetch(`${API_BASE_URL}/username/${username}`).then((response) => response.json());
}

export function createUser(newUser) {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });
}

export function updateUser(userId, updatedUser) {
    return fetch(`${API_BASE_URL}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
    });
}

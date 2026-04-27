const API_BASE_URL = "http://localhost:8080/api/upload";

export function uploadImage(selectedFile) {
    const formData = new FormData();
    formData.append("image", selectedFile);

    return fetch(API_BASE_URL, {
        method: "POST",
        body: formData,
    }).then((response) => response.text());
}

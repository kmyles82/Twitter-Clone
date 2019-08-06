const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/meows';

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get('name');
    const content = formData.get('content');

    const meow = {
        name,
        content
    }
    loadingElement.style.display = 'block';
    form.style.display = 'none';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(meow),
        headers: {
            'content-type': 'application/json'
        }
    })
})
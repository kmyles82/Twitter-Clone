const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const meowsElement = document.querySelector('.meows');
const API_URL = 'http://localhost:5000/meows';

loadingElement.style.display = '';

listAllMeows();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get('name');
    const content = formData.get('content');

    const meow = {
        name,
        content
    }
    loadingElement.style.display = '';
    form.style.display = 'none';

    //sending data to backend
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(meow),
        headers: {
            'content-type': 'application/json'
        }
    })
    //get back response from backend in json format
    .then(response => response.json())
    //get back access to createdMeow
    .then(createdMeow => {
        console.log(createdMeow)
        form.reset();
        loadingElement.style.display = 'none';
        form.style.display = '';
    })
})

function listAllMeows(){
    fetch(API_URL)
        //get back response from backend in json format
        .then(response => response.json())
        //get back access to createdMeow
        .then(meows => {
            meows.forEach(meow => {
                const div = document.createElement('div');
                
                const header = document.createElement('h3');
                header.textContent = meow.name;
                
                const contents = document.createElement('p');
                contents.textContent = meow.content;

                div.appendChild(header);
                div.appendChild(contents);
                meowsElement.appendChild(div);
            })
            console.log(meows)
    })
}
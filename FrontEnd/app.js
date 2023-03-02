let URLWorks = "http://localhost:5678/api/works";

const gallery = document.querySelector('.gallery')
let galleryIndex = 0;

// Appel à l'API Works
fetch(URLWorks)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        
        // Récuperation des travaux depuis le back-end (gallery)
        for(let i = 0; i < value.length; i++) {
            if (i == 0) {
                gallery.innerHTML += `<figure><img src="${value[0].imageUrl}"><figcaption>${value[0].title}</figcaption></figure>`
            } else {
                gallery.innerHTML += `<figure><img src="${value[i].imageUrl}"><figcaption>${value[i].title}</figcaption></figure>`
            }
        }
    })
const URLWorks = "http://localhost:5678/api/works";

const gallery = document.querySelector('.gallery')
const btns = document.querySelectorAll('.portfolio-btn button')

function filter () {
// Appel à l'API Works
fetch(URLWorks)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        // Récuperation des travaux depuis le back-end (gallery)
        for(let i = 0; i < value.length; i++) {
            if (i == 0) {
                gallery.innerHTML += `<figure class="category${value[0].categoryId}"><img src="${value[0].imageUrl}"><figcaption>${value[0].title}</figcaption></figure>`
            } else {
                gallery.innerHTML += `<figure class="category${value[i].categoryId}"><img src="${value[i].imageUrl}"><figcaption>${value[i].title}</figcaption></figure>`
            }
        }

        let arrayMain = value;
        console.log(arrayMain);

        // Filtrer la Gallerie
        const butonEvery = document.querySelector('#every')
        const butonObjects = document.querySelector('#object')
        const butonAppartements = document.querySelector('#appartement')
        const butonHotelEtRestaurant = document.querySelector('#hotel-restaurant')

        let newArray = [];

        function filteredGallery(e) {
            const filteredId = arrayMain.filter(i => i.categoryId == e)
            newArray = filteredId
            console.log(newArray);
        }

        // Ecouteurs d'événements pour filtrer la Gallerie
        butonEvery.addEventListener('click', function() {
            gallery.innerHTML = ""
            for(let i = 0; i < arrayMain.length; i++) {
                if (i == 0) {
                    gallery.innerHTML += `<figure class="category${arrayMain[0].categoryId}"><img src="${arrayMain[0].imageUrl}"><figcaption>${arrayMain[0].title}</figcaption></figure>`
                } else {
                    gallery.innerHTML += `<figure class="category${arrayMain[i].categoryId}"><img src="${arrayMain[i].imageUrl}"><figcaption>${arrayMain[i].title}</figcaption></figure>`
                }
            }
        })

        butonObjects.addEventListener('click', function() {
            gallery.innerHTML = ""
            filteredGallery(1)
            for(let i = 0; i < newArray.length; i++) {
                gallery.innerHTML += `<figure class="category${newArray[i].categoryId}"><img src="${newArray[i].imageUrl}"><figcaption>${newArray[i].title}</figcaption></figure>`
            }
        })

        butonAppartements.addEventListener('click', function() {
            gallery.innerHTML = ""
            filteredGallery(2)
            for(let i = 0; i < newArray.length; i++) {
                gallery.innerHTML += `<figure class="category${newArray[i].categoryId}"><img src="${newArray[i].imageUrl}"><figcaption>${newArray[i].title}</figcaption></figure>`
            }
        })

        butonHotelEtRestaurant.addEventListener('click', function() {
            gallery.innerHTML = ""
            filteredGallery(3)
            for(let i = 0; i < newArray.length; i++) {
                gallery.innerHTML += `<figure class="category${newArray[i].categoryId}"><img src="${newArray[i].imageUrl}"><figcaption>${newArray[i].title}</figcaption></figure>`
            }
        })
    })
}
filter();

// Vérification de la présence du token et de l'userId dans le stockage local
if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    // Boucle pour faire apparaître tous les éléments avec la classe "display-on-login"
    const displayOnLoginElems = document.querySelectorAll(".display-on-login");
    displayOnLoginElems.forEach(elem => {
        elem.style.display = "flex";
    });
    // Cacher le Login
    const loginLinkElem = document.querySelector(".log");
    loginLinkElem.style.display = "none";

    // Cacher les boutons filtres
    const portfolioBtnElem = document.querySelector(".portfolio-btn");
    portfolioBtnElem.style.display = "none";
}

const logOut = document.querySelector('.logout');

logOut.addEventListener('click', () => {
    // Supprimez les informations de connexion stockées localement
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
    // Redirigez l'utilisateur vers la page de connexion ou la page d'accueil
    window.location.replace('index.html');
  });
    



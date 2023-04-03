const modalWrapper = document.querySelector(".modal-wrapper")
const modalGalery = document.querySelector(".modal-galery")

let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = "flex"
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-delete').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function(e) {
    if(modal === null) {
        return
    }
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-delete').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
    
})

document.querySelector('.js-modal').addEventListener('click', function(){
    modalGalery.innerHTML = ""
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
                modalGalery.innerHTML += 
                    `<figure class="id${value[0].id}">
                        <img src="${value[0].imageUrl}">
                        <div>
                            <i class="fa-solid fa-arrows-up-down-left-right"></i>
                        </div>
                        <button class="delete id-delete">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                        <figcaption>éditer</figcaption>
                    </figure>`
            } else {
                modalGalery.innerHTML += 
                    `<figure class="id${value[i].id}">
                        <img src="${value[i].imageUrl}">
                        <button class="delete id-delete" href="">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                        <figcaption>éditer</figcaption>
                    </figure>`
            }

            modalGalery.addEventListener('click', function(e) {
                if (e.target.classList.contains('fa-trash-can')) {
                    const idToDelete = e.target.closest('figure').classList[0].substring(2); // Récupération de l'id du travail à supprimer
                    fetch(`${URLWorks}/${idToDelete}`, {
                        method: 'DELETE',
                        headers: {
                            'accept': '*/*',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(function(res) {
                        if (res.ok) {
                            // Suppression de l'élément du DOM
                            e.target.closest('figure').remove();
                        }
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
                }
            });
        }
    })
})

window.addEventListener('keydown', function(e) {
    if(e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})




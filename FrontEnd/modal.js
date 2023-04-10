const modalWrapper = document.querySelector(".modal-wrapper");
const modalGalery = document.querySelector(".modal-galery");
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId')

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = "flex";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".modal-delete").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) {
    return;
  }
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modal-delete").removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

document.querySelector(".js-modal").addEventListener("click", function () {
  modalGalery.innerHTML = "";
  fetch(URLWorks)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      // Récuperation des travaux depuis le back-end (gallery)
      for (let i = 0; i < value.length; i++) {
        if (i == 0) {
          modalGalery.innerHTML += `<figure class="id${value[0].id}">
                        <img src="${value[0].imageUrl}">
                        <div>
                            <i class="fa-solid fa-arrows-up-down-left-right"></i>
                        </div>
                        <button class="delete id-delete">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                        <figcaption>éditer</figcaption>
                    </figure>`;
        } else {
          modalGalery.innerHTML += `<figure class="id${value[i].id}">
                        <img src="${value[i].imageUrl}">
                        <button class="delete id-delete" href="">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                        <figcaption>éditer</figcaption>
                    </figure>`;
        }

        modalGalery.addEventListener("click", function (e) {
          if (e.target.classList.contains("fa-trash-can")) {
            const idToDelete = e.target
              .closest("figure")
              .classList[0].substring(2); // Récupération de l'id du travail à supprimer
            fetch(`${URLWorks}/${idToDelete}`, {
              method: "DELETE",
              headers: {
                accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
              .then(function (res) {
                if (res.ok) {
                  // Suppression de l'élément du DOM
                  e.target.closest("figure").remove();
                }
              })
              .catch(function (error) {
                console.error(error);
              });
          }
        });
      }
    });
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// Ajout d'un nouveau projet

const newProject = document.querySelector('.modal-button-follow')
const modalAjout = document.querySelector('.modal-ajout')
const modalSection = document.querySelector('.modal')
let myForm = document.getElementById("myForm");
let myInputTitle = document.getElementById("title");
let myInputCategorie = document.getElementById("categorie");

// Ouverture du Modal nouveau projet
newProject.addEventListener('click', function(e){
    e.preventDefault()
    modalAjout.style.display = "flex"
    modalSection.style.display = "none"
})

// Récupération des éléments HTML
const inputPhoto = document.getElementById("custom-file-input");
const inputTitle = document.getElementById("title");
const selectCategorie = document.getElementById("categorie");
const buttonValider = document.querySelector(".form-button button");

inputPhoto.addEventListener("change", activerValiderBtn);
inputTitle.addEventListener("input", activerValiderBtn);
selectCategorie.addEventListener("change", activerValiderBtn);

function activerValiderBtn() {
  if (inputPhoto.value && inputTitle.value && selectCategorie.value) {
    buttonValider.disabled = false;
    buttonValider.style.backgroundColor = "#1D6154";
  } else {
    buttonValider.disabled = true;
    buttonValider.style.backgroundColor = "grey";
  }
}

// Ajout d'un écouteur d'événement sur le bouton pour l'affichage de la modal d'ajout
document.querySelector("form button[type='submit']").addEventListener("click", () => {
  modalAjout.style.display = "block";
  modalWrapper.setAttribute("aria-hidden", "false");
});

// Ajout d'un écouteur d'événement sur le bouton de fermeture de la modal d'ajout
const closeModal1 = () => {
  modalAjout.style.display = "none";
  modalWrapper.setAttribute("aria-hidden", "true");
};
document.querySelectorAll(".fa-xmark, .fa-arrow-left").forEach((el) => {
  el.addEventListener("click", closeModal1);
});

// Ajout d'un écouteur d'événement sur l'input file pour afficher la photo sélectionnée
inputPhoto.addEventListener("change", () => {
  const photoPreview = document.querySelector(".form-ajout-photo");
  const boutonAjoutPhoto = document.querySelector('.form-ajout-photo-buton')
  const photoPreviewIcon = photoPreview.querySelector(".far.fa-image");
  const paraFormAjoutPhoto = document.querySelector('.form-ajout-photo p')
  photoPreviewIcon.style.display = "none";
  boutonAjoutPhoto.style.display = "none";
  paraFormAjoutPhoto.style.display = "none";

  const photoPreviewImage = document.createElement("img");
  photoPreviewImage.src = URL.createObjectURL(inputPhoto.files[0]);
  photoPreviewImage.style.width = "50%";
  photoPreviewImage.style.height = "100%";
  photoPreviewImage.style.objectFit = "cover";
  photoPreview.appendChild(photoPreviewImage);
});

// Ajout d'un écouteur d'événement sur le bouton de validation pour l'envoi du formulaire
myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Vérification de la validité du formulaire
  if (inputPhoto.value && inputTitle.value && selectCategorie.value) {
    // Création d'un objet FormData pour l'envoi du formulaire
    const formData = new FormData();
    formData.append("image", inputPhoto.files[0], inputPhoto.files[0].name);
    formData.append("title", inputTitle.value);
    formData.append("category", selectCategorie.value);
    console.log(formData.get("image"));
    console.log(formData.get("title"));
    console.log(formData.get("category"));
    // Envoi du formulaire à l'API
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        'accept' : 'application/json', 
        'Authorization' : `Bearer ${token}`, // Ajoute le token dans l'en-tête d'autorisation
      },
      body: formData,
    })
      .then(function(res){
        console.log(res);
      })
      
      .catch((error) => console.error(error));
  } else {
    // Affichage d'un message d'erreur si le formulaire n'est pas correctement rempli
    alert("Veuillez remplir tous les champs du formulaire.");
  }
});


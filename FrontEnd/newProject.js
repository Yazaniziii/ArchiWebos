// Fonction pour ajouter un travail à la galerie
function addWorkToGallery(work) {
    // Créer un nouvel élément figure avec les classes et attributs nécessaires
    const newFigure = document.createElement("figure");
    newFigure.classList.add(`category${work.categoryId}`);
  
    const newImg = document.createElement("img");
    newImg.setAttribute("src", work.imageUrl);
  
    const newCaption = document.createElement("figcaption");
    newCaption.textContent = work.title;
  
    newFigure.appendChild(newImg);
    newFigure.appendChild(newCaption);
  
    // Ajouter le nouvel élément figure au début de la galerie
    const gallery = document.querySelector(".gallery");
    gallery.insertAdjacentElement("afterbegin", newFigure);
  }

  const formData = new FormData();
  

  // Envoi du formulaire à l'API
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête d'autorisation
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Affichage de la réponse de l'API
  
      // Ajouter le nouveau travail à la galerie
      addWorkToGallery(data);
  
      closeModal1(); // Fermeture de la modal d'ajout
    })
    .catch((error) => console.error(error));
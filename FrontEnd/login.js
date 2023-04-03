function connexionListener() {
    const form = document.querySelector('.form');
    form.addEventListener("submit", function(e){
        e.preventDefault()
        const formData = {
            email: e.target.querySelector("[name=email]").value,
            password: e.target.querySelector("[name=password]").value,
        }
        // Convertir les datas récupérées en format json
        const formJson = JSON.stringify(formData)
        console.log(formJson);

        // Appel à l'API Login
        const URLLog = 'http://localhost:5678/api/users/login'
        fetch(URLLog, {
            method: 'POST',
            headers: {
                'accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body: formJson,
        }).then((response) => {
            if (response.ok) {
                // Traitement de la réponse si la connexion a réussi
                console.log("Connexion réussie !");
                return response.json()
            } else {
            // Traitement de la réponse si la connexion a échoué
            console.log("Erreur de connexion");
            const errorMessage = document.querySelector(".error-message");
            errorMessage.textContent = "Erreur de connexion. Veuillez vérifier votre e-mail et votre mot de passe.";
            }
            
        })
        .then((result) => {
        console.log(result);
        //Stocker le token dans le stockage local
        localStorage.setItem('token', result.token)
        localStorage.setItem('userId', result.userId)

        // Rediriger l'utilisateur vers la page principale
        window.location.replace('index.html');
        })

    })
}
connexionListener();






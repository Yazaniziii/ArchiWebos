const modalWrapper = document.querySelector(".modal-wrapper")

const openModal = function (e) {
    e.preventDefault()
}

document.querySelectorAll('.js-modal').forEach(button => {
    button.addEventListener('click', openModal)
})


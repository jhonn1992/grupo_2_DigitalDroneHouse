const btnAbrirModal = document.querySelector("#btn-abrir-modal");
const btnCerraModal = document.querySelector("#btn-cerrar-modal");
const modal = document.querySelector("#modal");

btnAbrirModal.addEventListener("click", ()=> {
    modal.showModal();
})

btnCerraModal.addEventListener("click", ()=>{
    modal.close();
})

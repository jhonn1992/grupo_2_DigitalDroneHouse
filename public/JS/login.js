window. addEventListener("load", function() {

    let form = document.querySelector("form");

    form.addEventListener("submit", function(e) {
        let errors = [];
        let correo = document.querySelector("#correo")
        let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if (correo.value == ""){
            errors.push("Email cannot be empty")
        } else if (!regex.test(correo.value)) {
            errors.push("Must be a valid email")
        }

        let password = document.querySelector("#password")

        if (password.value == ""){
            errors.push("Password cannot be empty")
        }

        if (errors.length > 0 ) {
            e.preventDefault();
            
            let ulErrors =  document.querySelector(".errors ul");
            ulErrors.innerHTML = "";
            for (let i=0; i<errors.length; i++ ) {
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
                ulErrors.style.listStyleType = 'none'
            }
        }
    })
})
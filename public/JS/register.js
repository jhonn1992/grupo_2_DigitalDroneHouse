window.addEventListener("load", function() {

    let form = document.querySelector("form");

    form.addEventListener("submit", function(e) {
       
        let errors = [];

        let userName = document.querySelector("#name")


        if (userName.value == ""){
            errors.push("Name field cannot be empty")
        } else if (userName.value.length <2) {
            errors.push("Name must be at least 2 characters" )
        }

        let userLastName = document.querySelector("#lastName")

        if (userLastName.value == ""){
            errors.push("Last Name field cannot be empty")
        } else if (userLastName.value.length <2) {
            errors.push("Last Name must be at least 2 characters" )
        }


        let userEmail = document.querySelector('#correo')
                
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i/* /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i */;
            
            if (userEmail.value == ""){
                errors.push("Email field cannot be empty")
            } else if (emailRegex.test(userEmail.value) == false) {
                errors.push("You must enter a valid email")}

        let password = document.querySelector('#password-1')
            let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/
            if (password.value == ""){
                errors.push("Password field cannot be empty")
            } else if (passwordRegex.test(password.value)== false) {
                errors.push("The password must have at least 8 characters, a number, an uppercase and a lowercase " )}
       
        let rePassword = document.querySelector('#passwordRepeat')
            if (rePassword.value !== password.value){
                errors.push("Password confirmation must be correct")}

        let rol = document.querySelector('input[name="rol"]:checked')

            if (!rol){
                errors.push("Please choose your purpose")
                } 
                
        let userAvatar = document.querySelector("#avatar");
            let extAllowed = /(.PNG|.JPG|.JPEG|.GIF)$/i;
        
                if (userAvatar.value == "") {
                    errors.push("You must upload a profile image")
                } else if (!extAllowed.exec(userAvatar.value)){
                    errors.push("Sorry, this file type is not allowed.")
                }         
                
        let terms = document.querySelector('input[name="terms-use"]:checked')

                if (!terms){
                    errors.push("You must accept our terms of use")
                } 

        if (errors.length > 0 ) {

            e.preventDefault();
            window.scroll(0, 0);
            
            let ulErrors =  document.querySelector(".errors ul");
            ulErrors.innerHTML = "";
            for (let i=0; i<errors.length; i++ ) {

                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
                ulErrors.style.listStyleType = 'none'
            }
        } else {
            alert("Success")
            form.submit();

        }
    })
})
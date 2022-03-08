function saveEmail() {    
    let newsletterInput = document.getElementById('newsletter1').value;

    if ((newsletterInput == '') || (newsletterInput.indexOf("@") == -1) || (newsletterInput.toLowerCase().indexOf(".com") == -1)) {
        Toastify({
            text: "Error, Check your email and try again",
            duration: 2000,
            style: {background: "#dc3545",}
        }).showToast(); 
    } else {
        emailjs.send("service_iczji5i","template_orjldit",{
            reciever: newsletterInput,
        });
    
        Toastify({
            text: "Email submitted, Thank you!",
            duration: 3000,
            style: {background: "linear-gradient(to right, #00b09b, #96c93d)",}
        }).showToast();
    }

}


function saveEmail() {
    //let newsletter = localStorage.getItem('email') || "";

    //if (newsletter == "") {
    let newsletterInput = document.getElementById('newsletter1').value;

    if (newsletterInput == '') {
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
    
        //localStorage.setItem('email', newsletterInput);
    //} else {
    //     Toastify({
    //         text: "Email already submitted",
    //         duration: 2000,
    //         style: {background: "#dc3545",}
    //     }).showToast();
    // }

}


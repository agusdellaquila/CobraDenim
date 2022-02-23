function saveEmail() {
    let newsletter = localStorage.getItem('email') || "";

    if (newsletter == "") {
        let newsletterInput = document.getElementById('newsletter1').value;
        
        localStorage.setItem('email', newsletterInput);
    } else {
        Toastify({
            text: "Email already submitted",
            duration: 2000,
            style: {background: "#dc3545",}
        }).showToast();
    }

}


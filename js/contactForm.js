function recieveContactEmail(){
    let userName = document.getElementById('contactName').value;
    let userSurname = document.getElementById('contactSurname').value;
    let userPhone = document.getElementById('contactPhone').value;
    let userEmail = document.getElementById('contactEmail').value;
    let userGender = document.getElementById('contactGender').value;
    let userMessage = document.getElementById('contactMessage').value;

    if ((userName == '') || (userSurname == '') || (userPhone == '') || (userEmail == '') || (userGender == '') || (userMessage == '')) {
        Toastify({
            text: "Error sending form. Check your info",
            duration: 2000,
            style: {background: "#dc3545",}
        }).showToast();
    } else {
        emailjs.send("service_iczji5i","template_upmqbhi",{
            user_name: userName,
            user_surname: userSurname,
            user_phone: userPhone,
            user_email: userEmail,
            user_gender: userGender,
            message: userMessage,
        });
    
        Toastify({
            text: "Form submitted, Thank you!",
            duration: 3000,
            style: {background: "linear-gradient(to right, #00b09b, #96c93d)",}
        }).showToast();
    }
}


const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");


const adminEmail = "waronablom15@gmail.com"

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if(!contactForm.checkValidity()){
        contactForm.reportValidity();
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    const namePattern =/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ '\-]*$/;
    const phonePattern = /^\+?[0-9 ()-]{9,20}$/;

    if(!namePattern.test(name)){
        alert("Please enter a valid full name.");
        return;
    }

    if(!phonePattern.test(phone)) {
       alert("Please enter a valid phone number."); 
       return;
    }

    if(message.length < 10){
      alert("Your message must contain at least 10 characters.");
      return;  
    }


    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formStatus.textContent = "Submitting your message...";

    try {

        const response = await fetch(
          "https://formsubmit.co/ajax/" + encodeURIComponent(adminEmail),
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
            body:JSON.stringify({
                name:name,
                email:document.getElementById("email").value.trim(),
                phone: phone,
                subject: document.getElementById("subject").value,
                message: message,
                _subject: "New Website Contact Form Submission",
                _template: "table"
            })
          }  
        );

        const result = await response.json();

        if(
            response.ok &&
            (
                result.success === true ||
                result.success === "true"
            )
        ){
            alert("Your information has been sent Successfully.");

            formStatus.textContent = 
            "Thank you! Your message was submitted successfully.";

            contactForm.requestFullscreen();
        }else {
            throw new Error(
                result.message || "The email service did not confirm submission." 
            );
        }

    }catch (error){
        console.error("Form submission error:", error);

        formStatus.textContent = 
           "Sorry, your message could not be confirmed. Please try again.";

           alert(
            "Message not confirmed. Please check your connection " + 
            "or try again later."
           );
    }finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    }
});
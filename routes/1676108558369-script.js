//  form validation

function verfiy() {}

// password varify : https://www.codingnepalweb.com/password-and-confirm-password-validation-javascript/

function validationAdharNumber() {
  let regexp = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

  let x = document.getElementById("aadhaar").value;
  if (regexp.test(x)) {
    window.alert("Valid Aadhar no.");
  } else {
    window.alert("Invalid Aadhar no.");
  }
}
function phonenumber(inputtxt) {
  let phoneno = /^\d{10}$/;
  if (inputtxt.value.match(phoneno)) {
    return true;
  } else {
    alert("Not a valid Phone Number");
    return false;
  }
}

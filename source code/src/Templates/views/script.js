const dashborad = document.querySelector(".dashborad");
const apk = document.querySelector(".apk");

const dashboradlink = document.querySelector(".dashBorad_link");
const apklink = document.querySelector(".apk_link");

dashboradlink.addEventListener("click", function () {
  apk.classList.add("hidden");
  dashborad.classList.remove("hidden");
});

apklink.addEventListener("click", function () {
  dashborad.classList.add("hidden");
  apk.classList.remove("hidden");
});

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

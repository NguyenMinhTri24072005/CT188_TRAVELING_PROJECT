function signup(event) {
  event.preventDefault();
  var usernameInput = document.getElementById("username");
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("confirmPassword");

  var username = usernameInput.value.trim();
  var email = emailInput.value.trim();
  var password = passwordInput.value;
  var confirmPassword = confirmPasswordInput.value;

  let isValid = true;

  function validateField(input) {
    if (!input.value.trim()) {
      input.classList.add("invalid");
      input.classList.remove("valid");
      isValid = false;
    } else {
      input.classList.add("valid");
      input.classList.remove("invalid");
    }
  }

  validateField(usernameInput);
  validateField(emailInput);
  validateField(passwordInput);
  validateField(confirmPasswordInput);

  if (!isValid) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    passwordInput.classList.add("invalid");
    confirmPasswordInput.classList.add("invalid");
    passwordInput.classList.remove("valid");
    confirmPasswordInput.classList.remove("valid");
    alert("Mật khẩu không khớp. Vui lòng nhập lại!");
    return;
  }
  var check = localStorage.getItem(email);
  if (check !== null) {
    alert("Tài khoản đã tồn tại !");
    usernameInput.classList.add("invalid");
    usernameInput.classList.remove("valid");
    emailInput.classList.add("invalid");
    emailInput.classList.remove("valid");
    return;
  }
  var user = {
    username: username,
    email: email,
    password: password,
  };

  localStorage.setItem(email, JSON.stringify(user));
  alert("Bạn đã đăng ký thành công!");
  window.location.href = "logIn.html";
}


window.onload = function () {

  const savedEmail = localStorage.getItem("rememberedEmail");
  const savedPassword = localStorage.getItem("rememberedPassword");

  if (savedEmail && savedPassword) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("password").value = savedPassword;
    document.getElementById("remember").checked = true;
  }
};

function signin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("remember");

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    if (!email) {
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");
    }
    if (!password) {
      passwordInput.classList.add("invalid");
      passwordInput.classList.remove("valid");
    }
    return;
  }
  const userData = localStorage.getItem(email);
  if (!userData) {
    alert("Tài khoản không tồn tại!");
    emailInput.classList.add("invalid");
    emailInput.classList.remove("valid");
    return;
  }

  const user = JSON.parse(userData);

  if (email === user.email && password === user.password) {
    alert("Đăng nhập thành công!");
    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");
    passwordInput.classList.add("valid");
    passwordInput.classList.remove("invalid");
    localStorage.setItem("loggedInUser", email);
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    window.location.href = "homePage.html";

  } else {
    alert("Sai mật khẩu!");
    passwordInput.classList.add("invalid");
    passwordInput.classList.remove("valid");
  }
}



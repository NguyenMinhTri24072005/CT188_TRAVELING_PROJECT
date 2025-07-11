document.addEventListener('DOMContentLoaded', () => {
 
  const navItems = document.querySelector('.nav-items');
  if (sessionStorage.getItem('isLoggedIn') === 'true') {
    if (navItems) {
      const avatarData = sessionStorage.getItem('avatarData') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
      const profileLink = document.createElement('a');
      profileLink.href = 'inf_profile.html';
      profileLink.innerHTML = `<img src="${avatarData}" alt="avatar" style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;">`;
      profileLink.style.marginLeft = '15px';

      const loginBtn = navItems.querySelector('.btn-login');
      const signupBtn = navItems.querySelector('.btn-signup');
      if (loginBtn) loginBtn.remove();
      if (signupBtn) signupBtn.remove();

      navItems.appendChild(profileLink);
    }
  } else {
    if (navItems) {
      const loginBtn = navItems.querySelector('.btn-login');
      if (loginBtn) {
        loginBtn.addEventListener('click', () => {
          window.location.href = './login.html';
        });
      }
    }
  }

  

  

  if (sessionStorage.getItem('isLoggedIn') === 'true') {
    const nameInput = document.getElementById('input-name');
    const emailInput = document.getElementById('input-email');
    const passInput = document.getElementById('input-passw');
   
    if (nameInput) nameInput.value = sessionStorage.getItem('fullName') || '';
    if (emailInput) emailInput.value = sessionStorage.getItem('email') || '';
    if (passInput) passInput.value = sessionStorage.getItem('passw') || '';
    if (emailEl)  emailEl.textContent= sessionStorage.getItem('email') ||'';
    const toggleBtn = document.getElementById('toggle-pass');
    if (toggleBtn && passInput) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = passInput.type === 'password';
        passInput.type = isHidden ? 'text' : 'password';
        toggleBtn.innerHTML = isHidden
          ? '<i class="fa fa-eye-slash"></i>'
          : '<i class="fa fa-eye"></i>';
      });
    }
  }

  const updateBtn = document.getElementById('update');
  if (updateBtn) {
    let isEditing = false;
    updateBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('input-name');
      const emailInput = document.getElementById('input-email');
      const passInput = document.getElementById('input-passw');

      if (!isEditing) {
        nameInput.disabled = false;
        emailInput.disabled = false;
        passInput.disabled = false;
        updateBtn.textContent = 'Lưu';
      } else {
        nameInput.disabled = true;
        emailInput.disabled = true;
        passInput.disabled = true;

        sessionStorage.setItem('fullName', nameInput.value);
        sessionStorage.setItem('email', emailInput.value);
        sessionStorage.setItem('passw', passInput.value);
        updateBtn.textContent = 'Cập nhật';
      }
      isEditing = !isEditing;
    });
  }

  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  }

  const avatarImg = document.getElementById('avatar-img');
  const avatarUpload = document.getElementById('avatar-upload');
  const changeAvatarBtn = document.getElementById('change-avatar-btn');

  if (sessionStorage.getItem('avatarData')) {
    avatarImg.src = sessionStorage.getItem('avatarData');
  }

  if (changeAvatarBtn) {
    changeAvatarBtn.addEventListener('click', () => {
      avatarUpload.click();
    });
  }

  if (avatarUpload) {
    avatarUpload.addEventListener('change', () => {
      const file = avatarUpload.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        avatarImg.src = imageData;
        sessionStorage.setItem('avatarData', imageData);
      };
      reader.readAsDataURL(file);
    });
  }

  

  
});
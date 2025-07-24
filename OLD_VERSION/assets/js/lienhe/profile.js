// CHUNG TẤN LỢI ** B2306555
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelector('.nav-items');
  const currentEmail = localStorage.getItem('loggedInUser');
  const userData = currentEmail ? JSON.parse(localStorage.getItem(currentEmail)) : null;

  const isLoggedIn = !!userData;

  // Hiển thị avatar nếu đã đăng nhập
  if (isLoggedIn && navItems) {
    const avatarData = userData.avatarData || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    const profileLink = document.createElement('a');
    profileLink.href = 'inf_profile.html';
    profileLink.innerHTML = `<img src="${avatarData}" alt="avatar" style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;">`;
    profileLink.style.marginLeft = '15px';

    navItems.querySelector('.btn-login')?.remove();
    navItems.querySelector('.btn-signup')?.remove();
    navItems.appendChild(profileLink);
  } else if (navItems) {
    const loginBtn = navItems.querySelector('.btn-login');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.location.href = './login.html';
      });
    }
  }

  // Đổ thông tin cá nhân nếu đã đăng nhập
  if (isLoggedIn) {
    const nameInput = document.getElementById('input-name');
    const emailInput = document.getElementById('input-email');
    const passInput = document.getElementById('input-passw');
    const toggleBtn = document.getElementById('toggle-pass');

    if (nameInput) nameInput.value = userData.username || '';
    if (emailInput) emailInput.value = userData.email || '';
    if (passInput) passInput.value = userData.password || '';

    // Toggle hiện/ẩn mật khẩu
    if (toggleBtn && passInput) {
      toggleBtn.addEventListener('click', () => {
        if (passInput.disabled) return;

        const isHidden = passInput.type === 'password';
        passInput.type = isHidden ? 'text' : 'password';
        toggleBtn.innerHTML = isHidden
          ? '<i class="fa fa-eye-slash"></i>'
          : '<i class="fa fa-eye"></i>';
      });
    }
  }

  // Nút cập nhật thông tin
  const updateBtn = document.getElementById('update');
  if (updateBtn) {
    let isEditing = false;
    updateBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('input-name');
      const emailInput = document.getElementById('input-email');
      const passInput = document.getElementById('input-passw');

      if (!nameInput || !emailInput || !passInput) return;

      if (!isEditing) {
        nameInput.disabled = false;
        emailInput.disabled = false;
        passInput.disabled = false;
        updateBtn.textContent = 'Lưu';
      } else {
        nameInput.disabled = true;
        emailInput.disabled = true;
        passInput.disabled = true;

        const updatedUser = {
          ...userData,
          username: nameInput.value,
          email: emailInput.value,
          password: passInput.value
        };

        // Xóa key cũ nếu email bị đổi
        if (emailInput.value !== currentEmail) {
          localStorage.removeItem(currentEmail);
          localStorage.setItem('loggedInUser', emailInput.value);
        }

        localStorage.setItem(emailInput.value, JSON.stringify(updatedUser));
        updateBtn.textContent = 'Cập nhật';
      }

      isEditing = !isEditing;
    });
  }

  // Đăng xuất
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });
  }

  // Xử lý avatar upload
  const avatarImg = document.getElementById('avatar-img');
  const avatarUpload = document.getElementById('avatar-upload');
  const changeAvatarBtn = document.getElementById('change-avatar-btn');

  if (avatarImg && userData?.avatarData) {
    avatarImg.src = userData.avatarData;
  }

  if (changeAvatarBtn && avatarUpload) {
    changeAvatarBtn.addEventListener('click', () => {
      avatarUpload.click();
    });

    avatarUpload.addEventListener('change', () => {
      const file = avatarUpload.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        if (avatarImg) avatarImg.src = imageData;

        const updatedUser = {
          ...userData,
          avatarData: imageData
        };

        localStorage.setItem(currentEmail, JSON.stringify(updatedUser));

        const navAvatarImg = document.querySelector('.nav-items img');
        if (navAvatarImg) {
          navAvatarImg.src = imageData;
        }
      };
      reader.readAsDataURL(file);
    });
  }
});

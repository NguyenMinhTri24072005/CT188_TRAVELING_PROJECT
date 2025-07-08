document.addEventListener('DOMContentLoaded', () => {
  // Kích hoạt mặc định tab support
  const supportTab = document.querySelector('.main-tabs li[data-tab="support"]');
  const supportContent = document.getElementById('support');
  const contactContent = document.getElementById('contact');
  if (supportTab && supportContent && contactContent) {
    supportTab.classList.add('actives');
    supportContent.classList.add('actives');
    contactContent.classList.remove('actives');
  }

  // Tab chuyển nội dung trong .faq-tabs
  const tabs = document.querySelectorAll('.faq-tabs li');
  const lists = document.querySelectorAll('.faq-list');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('actives'));
      lists.forEach(l => l.classList.remove('actives'));
      tab.classList.add('actives');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('actives');
    });
  });

  // Tab chính ở .main-tabs
  const tabs1 = document.querySelectorAll('.main-tabs li');
  const lists2 = document.querySelectorAll('.tab-list');
  tabs1.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs1.forEach(t => t.classList.remove('actives'));
      lists2.forEach(l => l.classList.remove('actives'));
      const target = document.getElementById(tab.dataset.tab);
      if (target) {
        tab.classList.add('actives');
        target.classList.add('actives');
      }
    });
  });

  // Accordion
  const acc = document.querySelectorAll(".faq-item");
  acc.forEach(item => {
    item.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel) {
        panel.style.display = panel.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Hover effects
  document.querySelectorAll('.div__box, .faq-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.05)';
      item.style.transition = 'transform 0.3s ease';
      item.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1)';
      item.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
  });

  document.querySelectorAll('.faq-icon, .div__box-2').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.05)';
      item.style.transition = 'transform 0.3s ease';
      item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1)';
      item.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
    });
  });

  // Giả sử người dùng đã đăng nhập
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('fullName', 'Nguyễn Văn A');
  sessionStorage.setItem('email', 'a@example.com');
  sessionStorage.setItem('phone', '0123456789');

  // Hiển thị thông tin người dùng nếu đã đăng nhập
  if (sessionStorage.getItem('isLoggedIn') === 'true') {

    const nameEl = document.getElementById('display-name');
    const emailEl = document.getElementById('display-email');
    const phoneEl = document.getElementById('display-phone');
    if (nameEl) nameEl.textContent = sessionStorage.getItem('fullName') || '';
    if (emailEl) emailEl.textContent = sessionStorage.getItem('email') || '';
    if (phoneEl) phoneEl.textContent = sessionStorage.getItem('phone') || '';
  }

  // Xử lý gửi form liên hệ
   // Xử lý gửi form liên hệ
  const form = document.querySelector('.contact__form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.submitter && e.submitter.id !== 'final') return;
      if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        alert('Bạn phải đăng nhập trước khi gửi form!');
        return;
      }

      const inputs = form.querySelectorAll("input[type='text'], input.input2, textarea");
      let isValid = true;

      inputs.forEach(input => {
        // Xoá thông báo lỗi cũ nếu có
        
        let errorMsg = input.parentElement.querySelector('.error-msg');
        if (errorMsg) errorMsg.remove();

        if (input.value.trim() === '') {
          input.style.border = "2px solid red";
          isValid = false;

          // Tạo thông báo lỗi
          const error = document.createElement('div');
          error.classList.add('error-msg');
          error.style.color = 'red';
          error.style.fontSize = '13px';
          error.style.marginTop = '4px';
          error.textContent = '*Ô này không thể để trống';
          input.parentElement.appendChild(error);
        } else {
          input.style.border = "";
        }
      });

      if (!isValid) return;

      // Nếu hợp lệ
      const thanksBox = document.querySelector('.thanks__box');
      if (thanksBox) thanksBox.style.display = 'block';
      form.reset();
    });
  }



  // Đóng form cảm ơn
  const thanksCloseBtn = document.querySelector('.thanks__box button');
  if (thanksCloseBtn) {
    thanksCloseBtn.addEventListener('click', () => {
      const thanksBox = document.querySelector('.thanks__box');
      if (thanksBox) thanksBox.style.display = 'none';
    });
  }

  // Chặn link khi chưa đăng nhập
  document.querySelectorAll('a.box__link, .box-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        e.preventDefault();
        const loginFailBox = document.querySelector('.login-fail__box');
        if (loginFailBox) loginFailBox.style.display = 'block';
        else window.location.href = 'login.html';
      }
    });
  });

  // Đóng thông báo login-fail
  const loginFailBtn = document.querySelector('.login-fail__button');
  if (loginFailBtn) {
    loginFailBtn.addEventListener('click', () => {
      const loginFailBox = document.querySelector('.login-fail__box');
      if (loginFailBox) {
        loginFailBox.style.display = 'none';
        window.location.href= 'login.html';
      }
    });
  }
});
// Chon dia chi
 const tinhSelect = document.getElementById('tinh');
    const huyenSelect = document.getElementById('huyen');
    const xaSelect = document.getElementById('xa');

    // Load danh sách tỉnh
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then(res => res.json())
      .then(data => {
        tinhSelect.innerHTML = '<option value="">-- Chọn tỉnh/thành --</option>';
        data.forEach(tinh => {
          const opt = document.createElement('option');
          opt.value = tinh.code;
          opt.textContent = tinh.name;
          tinhSelect.appendChild(opt);
        });
      });

    // Khi chọn tỉnh → load quận/huyện
    tinhSelect.addEventListener('change', () => {
      const code = tinhSelect.value;
      huyenSelect.innerHTML = '<option value="">-- Chọn quận/huyện --</option>';
      xaSelect.innerHTML = '<option value="">-- Chọn phường/xã --</option>';
      if (!code) return;

      fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
        .then(res => res.json())
        .then(data => {
          data.districts.forEach(huyen => {
            const opt = document.createElement('option');
            opt.value = huyen.code;
            opt.textContent = huyen.name;
            huyenSelect.appendChild(opt);
          });
        });
    });

    // Khi chọn huyện → load xã/phường
    huyenSelect.addEventListener('change', () => {
      const code = huyenSelect.value;
      xaSelect.innerHTML = '<option value="">-- Chọn phường/xã --</option>';
      if (!code) return;

      fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
        .then(res => res.json())
        .then(data => {
          data.wards.forEach(xa => {
            const opt = document.createElement('option');
            opt.value = xa.name;
            opt.textContent = xa.name;
            xaSelect.appendChild(opt);
          });
        });
    });

    // Hiển thị địa chỉ
    function hienThiDiaChi() {
      const tinh = tinhSelect.options[tinhSelect.selectedIndex].text;
      const huyen = huyenSelect.options[huyenSelect.selectedIndex].text;
      const xa = xaSelect.options[xaSelect.selectedIndex].text;
      const sonha = document.getElementById("sonha").value;

      if (!tinh || !huyen || !xa || !sonha) {
        document.getElementById("diachi").textContent = "Vui lòng nhập đầy đủ địa chỉ.";
        return;
      }

      document.getElementById("diachi").textContent =
        `Địa chỉ: ${sonha}, ${xa}, ${huyen}, ${tinh}`;
    } 

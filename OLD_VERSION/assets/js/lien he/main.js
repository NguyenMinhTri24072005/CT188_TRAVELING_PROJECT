// CHUNG TẤN LỢI ** B2306555
let tinhSelect, huyenSelect, xaSelect;

document.addEventListener('DOMContentLoaded', () => {
  // ======================= TAB =======================
  const supportTab = document.querySelector('.main-tabs li[data-tab="support"]');
  const supportContent = document.getElementById('support');
  const contactContent = document.getElementById('contact');
  if (supportTab && supportContent && contactContent) {
    supportTab.classList.add('actives');
    supportContent.classList.add('actives');
    contactContent.classList.remove('actives');
  }

  document.querySelectorAll('.faq-tabs li').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.faq-tabs li').forEach(t => t.classList.remove('actives'));
      document.querySelectorAll('.faq-list').forEach(l => l.classList.remove('actives'));
      tab.classList.add('actives');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('actives');
    });
  });

  document.querySelectorAll('.main-tabs li').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.main-tabs li').forEach(t => t.classList.remove('actives'));
      document.querySelectorAll('.tab-list').forEach(l => l.classList.remove('actives'));
      const target = document.getElementById(tab.dataset.tab);
      if (target) {
        tab.classList.add('actives');
        target.classList.add('actives');
      }
    });
  });

  // ======================= ACCORDION =======================
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel) {
        panel.style.display = panel.style.display === "block" ? "none" : "block";
      }
    });
  });

  // ======================= HOVER =======================
  document.querySelectorAll('.div__box, .faq-item, .faq-icon, .div__box-2').forEach(item => {
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

  // ======================= OBSERVER =======================
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const boxes = contactSection.querySelectorAll('.div__box-2');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          boxes.forEach((box, index) => {
            const delay = index * 100;
            setTimeout(() => {
              box.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
            }, delay);
          });
          observer.unobserve(contactSection);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(contactSection);
  }

  // ======================= HIỂN THỊ USER =======================
  const loggedInEmail = localStorage.getItem("loggedInUser");
  const userData = localStorage.getItem(loggedInEmail);
  if (userData) {
    const user = JSON.parse(userData);
    const nameEl = document.getElementById("display-name");
    const emailEl = document.getElementById("display-email");
    if (nameEl) nameEl.textContent = user.username || "";
    if (emailEl) emailEl.textContent = user.email || "";
  } else {
    alert("Không tìm thấy thông tin người dùng!");
  }

  // ======================= FORM LIÊN HỆ =======================
  const form = document.querySelector('.contact__form form');
  if (form) {
    const inputs = form.querySelectorAll("input[type='text'], .input2, textarea");

    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        const errorMsg = input.parentElement.querySelector('.error-msg');
        if (errorMsg) errorMsg.remove();

        if (input.value.trim() === '') {
          input.style.border = "2px solid red";
          const error = document.createElement('div');
          error.className = 'error-msg';
          error.style.color = 'red';
          error.style.fontSize = '13px';
          error.style.marginTop = '4px';
          error.textContent = '*Ô này không thể để trống';
          input.parentElement.appendChild(error);
        } else {
          input.style.border = "";
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Chỉ xử lý khi là nút "Gửi đi"
      if (e.submitter?.id !== 'final') return;

      let hasError = false;
      inputs.forEach(input => {
        if (input.value.trim() === '') {
          hasError = true;
          input.dispatchEvent(new Event('blur'));
        }
      });

      // Nếu có lỗi thì không gửi
      if (hasError) return;

      const thanksBox = document.querySelector('.thanks__box');
      if (thanksBox) thanksBox.style.display = 'block';
      form.reset();
      document.getElementById("diachi").textContent = ''; // reset địa chỉ hiển thị
    });
  }

  // ======================= ĐÓNG THANKS BOX =======================
  const thanksCloseBtn = document.querySelector('.thanks__box button');
  if (thanksCloseBtn) {
    thanksCloseBtn.addEventListener('click', () => {
      document.querySelector('.thanks__box').style.display = 'none';
    });
  }

  // ======================= LINK BẢO VỆ =======================
  document.querySelectorAll('a.box__link, .box-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (!localStorage.getItem('loggedInUser')) {
        e.preventDefault();
        const loginFailBox = document.querySelector('.login-fail__box');
        if (loginFailBox) loginFailBox.style.display = 'block';
        else window.location.href = 'Dangnhap.html';
      }
    });
  });

  const loginFailBtn = document.querySelector('.login-fail__button');
  if (loginFailBtn) {
    loginFailBtn.addEventListener('click', () => {
      const loginFailBox = document.querySelector('.login-fail__box');
      if (loginFailBox) {
        loginFailBox.style.display = 'none';
        window.location.href = 'Dangnhap.html';
      }
    });
  }

  // ======================= TỈNH/HUYỆN/XÃ =======================
  tinhSelect = document.getElementById('tinh');
  huyenSelect = document.getElementById('huyen');
  xaSelect = document.getElementById('xa');

  if (tinhSelect && huyenSelect && xaSelect) {
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

    const sonhaInput = document.getElementById('sonha');
    xaSelect.addEventListener('change', hienThiDiaChi);
    if (sonhaInput) {
      sonhaInput.addEventListener('input', hienThiDiaChi);
    }
  }
});

// ======================= HIỂN THỊ ĐỊA CHỈ =======================
function hienThiDiaChi() {
  const tinh = tinhSelect?.options[tinhSelect.selectedIndex]?.text || '';
  const huyen = huyenSelect?.options[huyenSelect.selectedIndex]?.text || '';
  const xa = xaSelect?.options[xaSelect.selectedIndex]?.text || '';
  const sonha = document.getElementById("sonha")?.value.trim();
  const diachiEl = document.getElementById("diachi");

  if (!tinh || !huyen || !xa || !sonha || tinh.includes('Chọn')) {
    diachiEl.textContent = "Vui lòng nhập đầy đủ địa chỉ.";
    return;
  }

  diachiEl.textContent = `Địa chỉ: ${sonha}, ${xa}, ${huyen}, ${tinh}`;
}

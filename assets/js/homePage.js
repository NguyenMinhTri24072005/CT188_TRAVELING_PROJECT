// Wrap everything in try-catch and ensure DOM is ready
(function () {
  "use strict";

  // Wait for DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }

  function initializeApp() {
    try {
      console.log("Initializing app...");

      // Initialize all components
      initializeSwiper();
      initializeNavigation();
      initializeCountdown();
      initializeSearch();

      console.log("App initialized successfully");
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  }

  function initializeSwiper() {
    try {
      // Wait a bit for DOM to settle
      setTimeout(() => {
        const swiperContainer = document.querySelector(".swiper");
        const swiper2Container = document.querySelector(".swiper2");

        if (!swiperContainer) {
          console.warn("Swiper container not found");
          return;
        }

        if (!swiper2Container) {
          console.warn("Swiper2 container not found");
          return;
        }

        // Check if Swiper is available
        if (typeof Swiper === "undefined") {
          console.error("Swiper library not loaded");
          return;
        }

        // Initialize Swiper 1
        const swiper1 = new Swiper(".swiper", {
          slidesPerView: 3,
          spaceBetween: 20,
          loop: false,
          navigation: {
            nextEl: ".swiper .swiper-button-next",
            prevEl: ".swiper .swiper-button-prev",
          },
          pagination: {
            el: ".swiper .swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
          on: {
            init: function () {
              console.log("Swiper 1 initialized");
              updateNavButtons1(this);
            },
            slideChange: function () {
              updateNavButtons1(this);
            },
          },
        });

        // Initialize Swiper 2
        const swiper2 = new Swiper(".swiper2", {
          slidesPerView: "auto",
          spaceBetween: 20,
          loop: false,
          navigation: {
            nextEl: ".swiper2 .swiper-button-next",
            prevEl: ".swiper2 .swiper-button-prev",
          },
          pagination: {
            el: ".swiper2 .swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
          on: {
            init: function () {
              console.log("Swiper 2 initialized");
              updateNavButtons2(this);
            },
            slideChange: function () {
              updateNavButtons2(this);
            },
          },
        });

        // Update navigation buttons functions
        function updateNavButtons1(swiper) {
          try {
            const prevBtn = document.querySelector(
              ".swiper .swiper-button-prev"
            );
            const nextBtn = document.querySelector(
              ".swiper .swiper-button-next"
            );

            if (!prevBtn || !nextBtn) {
              console.warn("Navigation buttons not found for swiper1");
              return;
            }

            if (swiper.isBeginning) {
              prevBtn.style.display = "none";
            } else {
              prevBtn.style.display = "flex";
            }

            if (swiper.isEnd) {
              nextBtn.style.display = "none";
            } else {
              nextBtn.style.display = "flex";
            }
          } catch (error) {
            console.error("Error updating nav buttons 1:", error);
          }
        }

        function updateNavButtons2(swiper) {
          try {
            const prevBtn = document.querySelector(
              ".swiper2 .swiper-button-prev"
            );
            const nextBtn = document.querySelector(
              ".swiper2 .swiper-button-next"
            );

            if (!prevBtn || !nextBtn) {
              console.warn("Navigation buttons not found for swiper2");
              return;
            }

            if (swiper.isBeginning) {
              prevBtn.style.display = "none";
            } else {
              prevBtn.style.display = "flex";
            }

            if (swiper.isEnd) {
              nextBtn.style.display = "none";
            } else {
              nextBtn.style.display = "flex";
            }
          } catch (error) {
            console.error("Error updating nav buttons 2:", error);
          }
        }
      }, 500); // Wait 500ms for DOM to settle
    } catch (error) {
      console.error("Error in initializeSwiper:", error);
    }
  }

  function initializeNavigation() {
    try {
      const regionData = {
        "mien-bac": [
          {
            name: "Huế",
            image:
              "https://images.unsplash.com/photo-1724533815121-ca09833513ee?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "HÀ GIANG",
            image:
              "https://images.unsplash.com/photo-1591815595153-ace4f4f5464c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "QUẢNG NINH",
            image:
              "https://plus.unsplash.com/premium_photo-1691961827977-88932501fc33?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "Hà Nội",
            image:
              "https://plus.unsplash.com/premium_photo-1690960644830-487c569ca6fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "Sapa",
            image:
              "https://images.unsplash.com/photo-1694083031889-19cbe295035d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "Hội An",
            image:
              "https://images.unsplash.com/photo-1660562925534-3f6948ac654f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "Đà Nẵng",
            image:
              "https://images.unsplash.com/photo-1670993077545-bfeeea1e0b5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "Đà Lạt",
            image:
              "https://images.unsplash.com/photo-1626608017817-211d7c48177d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
        "chau-a": [
          {
            name: "THÁI LAN",
            image:
              "https://images.unsplash.com/photo-1520214572569-0d593dc3f1f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "SINGAPORE",
            image:
              "https://images.unsplash.com/photo-1600664356348-10686526af4f?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "Ấn Độ",
            image:
              "https://plus.unsplash.com/premium_photo-1697729844084-c03db2377161?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "NHẬT BẢN",
            image:
              "https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "HÀN QUỐC",
            image:
              "https://plus.unsplash.com/premium_photo-1661886333708-877148b43ae1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "TRUNG QUỐC",
            image:
              "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "INDONESIA",
            image:
              "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "NEPAL",
            image:
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
        "chau-au": [
          {
            name: "PHÁP",
            image:
              "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "Ý",
            image:
              "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=500&h=200&fit=crop",
          },
          {
            name: "SPAIN",
            image:
              "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&h=200&fit=crop",
          },
          {
            name: "ĐỨC",
            image:
              "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=400&fit=crop",
          },
          {
            name: "ANH",
            image:
              "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop",
          },
          {
            name: "THỤY SĨ",
            image:
              "https://images.unsplash.com/photo-1530841344029-ec3ae0fa4cc4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "GREECE",
            image:
              "https://plus.unsplash.com/premium_photo-1661963145672-a2bd28eba0fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "HOLLAND",
            image:
              "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=500&h=200&fit=crop",
          },
        ],
        "chau-my": [
          {
            name: "HOA KỲ",
            image:
              "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=500&h=400&fit=crop",
          },
          {
            name: "CANADA",
            image:
              "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=500&h=200&fit=crop",
          },
          {
            name: "MEXICO",
            image:
              "https://images.unsplash.com/photo-1504814532849-cff240bbc503?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "BRAZIL",
            image:
              "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&h=400&fit=crop",
          },
          {
            name: "ARGENTINA",
            image:
              "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=500&h=400&fit=crop",
          },
          {
            name: "CHILE",
            image:
              "https://images.unsplash.com/photo-1595113230628-4753b62f4427?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "PERU",
            image:
              "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&h=400&fit=crop",
          },
          {
            name: "COLOMBIA",
            image:
              "https://images.unsplash.com/photo-1534413340928-7bd74b65196f?q=80&w=750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
        "chau-uc": [
          {
            name: "AUSTRALIA",
            image:
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
          },
          {
            name: "NEW ZEALAND",
            image:
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=200&fit=crop",
          },
          {
            name: "FIJI",
            image:
              "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=200&fit=crop",
          },
          {
            name: "PAPUA NEW GUINEA",
            image:
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=400&fit=crop",
          },
          {
            name: "SOLOMON ISLANDS",
            image:
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
          },
          {
            name: "VANUATU",
            image:
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=400&fit=crop",
          },
          {
            name: "SAMOA",
            image:
              "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop",
          },
          {
            name: "TONGA",
            image:
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=200&fit=crop",
          },
        ],
        "chau-phi": [
          {
            name: "NAM PHI",
            image:
              "https://images.unsplash.com/photo-1529528070131-eda9f3e90919?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "MOROCCO",
            image:
              "https://plus.unsplash.com/premium_photo-1673415819362-c2ca640bfafe?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "EGYPT",
            image:
              "https://plus.unsplash.com/premium_photo-1661891622579-bee76e28c304?q=80&w=1181&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "KENYA",
            image:
              "https://plus.unsplash.com/premium_photo-1664304370557-233bccc0ac85?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "TANZANIA",
            image:
              "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "BOTSWANA",
            image:
              "https://images.unsplash.com/photo-1708476002896-8eba434119c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym90c3dhbmF8ZW58MHx8MHx8fDA%3D",
          },
          {
            name: "ZIMBABWE",
            image:
              "https://plus.unsplash.com/premium_photo-1661817083646-cf3a6f24f040?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "MADAGASCAR",
            image:
              "https://images.unsplash.com/photo-1570742544137-3a469196c32b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
      };

      function renderGallery(region) {
        try {
          const gallery = document.getElementById("gallery");

          if (!gallery) {
            console.warn("Gallery element not found");
            return;
          }

          const data = regionData[region];

          if (!data) {
            console.warn("Region data not found:", region);
            return;
          }

          gallery.classList.add("fade-out");

          setTimeout(() => {
            gallery.innerHTML = "";

            data.forEach((location, index) => {
              const galleryItem = document.createElement("div");
              galleryItem.className = `gallery-item item-${index + 1}`;
              galleryItem.innerHTML = `
                <img src="${location.image}" alt="${location.name}" loading="lazy" onerror="this.style.display='none'">
                <div class="overlay"></div>
                <div class="location-name">${location.name}</div>
              `;

              galleryItem.addEventListener("click", function (e) {
                e.preventDefault();
                alert(`Bạn đã chọn: ${location.name}`);
              });

              gallery.appendChild(galleryItem);
            });

            gallery.classList.remove("fade-out");
          }, 150);
        } catch (error) {
          console.error("Error in renderGallery:", error);
        }
      }

      // Initialize navigation
      const navItems = document.querySelectorAll(".nav-item");

      if (navItems.length === 0) {
        console.warn("Navigation items not found");
        return;
      }

      navItems.forEach((item) => {
        item.addEventListener("click", function (e) {
          try {
            e.preventDefault();

            navItems.forEach((nav) => nav.classList.remove("active"));
            this.classList.add("active");

            const region = this.getAttribute("data-region");
            if (region && regionData[region]) {
              renderGallery(region);
            }
          } catch (error) {
            console.error("Error in navigation click:", error);
          }
        });
      });

      // Load initial content
      setTimeout(() => {
        renderGallery("mien-bac");
      }, 100);
    } catch (error) {
      console.error("Error in initializeNavigation:", error);
    }
  }

  function initializeCountdown() {
    try {
      function updateCountdown() {
        try {
          const countdownElements = document.querySelectorAll(".countdown");

          countdownElements.forEach((element) => {
            if (!element || !element.textContent) return;

            let time = element.textContent.split(":");

            if (time.length !== 3) return;

            let hours = parseInt(time[0]) || 0;
            let minutes = parseInt(time[1]) || 0;
            let seconds = parseInt(time[2]) || 0;

            seconds--;
            if (seconds < 0) {
              seconds = 59;
              minutes--;
              if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                  hours = 0;
                  minutes = 0;
                  seconds = 0;
                }
              }
            }

            element.textContent =
              String(hours).padStart(2, "0") +
              ":" +
              String(minutes).padStart(2, "0") +
              ":" +
              String(seconds).padStart(2, "0");
          });
        } catch (error) {
          console.error("Error in updateCountdown:", error);
        }
      }

      // Start countdown
      const countdownInterval = setInterval(updateCountdown, 1000);

      // Store interval ID for cleanup if needed
      window.countdownInterval = countdownInterval;
    } catch (error) {
      console.error("Error in initializeCountdown:", error);
    }
  }

  function initializeSearch() {
    try {
      // Make submitSearch available globally
      window.submitSearch = function () {
        try {
          const input = document.getElementById("searchInput");

          if (!input) {
            console.warn("Search input not found");
            return;
          }

          const value = input.value.trim();

          if (value !== "") {
            alert("Bạn đã tìm: " + value);
          } else {
            alert("Vui lòng nhập điểm đến.");
          }
        } catch (error) {
          console.error("Error in submitSearch:", error);
        }
      };

      // Add enter key support
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            window.submitSearch();
          }
        });
      }
    } catch (error) {
      console.error("Error in initializeSearch:", error);
    }
  }

  // Global error handler
  window.addEventListener("error", function (e) {
    console.error("Global error caught:", e.error);
    return true; // Prevent default browser error handling
  });

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", function (e) {
    console.error("Unhandled promise rejection:", e.reason);
    e.preventDefault();
  });
})();

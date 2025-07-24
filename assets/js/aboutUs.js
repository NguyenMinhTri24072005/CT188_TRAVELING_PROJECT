document
  .querySelectorAll(
    ".whyChoose__container .video-container .controls .control-btn"
  )
  .forEach((btn) => {
    btn.onclick = () => {
      let src = btn.getAttribute("data-src");
      document.querySelector(
        ".whyChoose__container .video-container .video"
      ).src = src;
    };
  });

const swiper = new Swiper(".swiper", {
  loop: true,
});

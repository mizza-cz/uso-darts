const partnersSlider = document.querySelector(".partnersSlider");

if (partnersSlider) {
  new Swiper(partnersSlider, {
    slidesPerView: 2,
    spaceBetween: 24,
    loop: true,
    speed: 500,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    breakpoints: {
      0: { slidesPerView: 2 },
      621: { slidesPerView: 3 },
      741: { slidesPerView: 4 },
      931: { slidesPerView: 5 },
      1200: { slidesPerView: 6 },
    },
  });
}

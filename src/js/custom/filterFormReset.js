document.querySelectorAll(".filterForm").forEach((form) => {
  form.addEventListener("reset", function () {
    setTimeout(() => {
      $(this)
        .find(".js-select")
        .each(function () {
          $(this).prop("selectedIndex", 0).trigger("change");
        });
    }, 0);
  });
});

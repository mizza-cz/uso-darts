(function ($) {
  "use strict";

  const DESKTOP_WIDTH = 1200;

  function bindHamburger() {
    const $body = $("body");
    const $opener = $(".js-header__opener");
    const $close = $(".js-header__close");

    function closeMenu() {
      $opener.removeClass("is-open");
      $body.removeClass("is-nav-open");
    }

    $opener.on("click", function (e) {
      e.stopPropagation();
      $opener.toggleClass("is-open");
      $body.toggleClass("is-nav-open");
    });

    $close.on("click", function (e) {
      e.stopPropagation();
      closeMenu();
    });

    $(document).on("click.headerMenu", function (e) {
      if (
        $body.hasClass("is-nav-open") &&
        !$(e.target).closest(".headerNav__inner, .js-header__opener").length
      ) {
        closeMenu();
      }
    });
  }

  function bindMainMenu() {
    const $menuItems = $(".navbar__menu-item");
    const $menuLists = $(".navbar__menu-list");
    let t;

    function unbindAll() {
      $menuItems.off(".mainMenu");
      $menuLists.off(".mainMenu");
    }

    function bindDesktop() {
      $menuLists
        .on("mouseenter.mainMenu", function () {
          $(this).addClass("active");
        })
        .on("mouseleave.mainMenu", function () {
          $(this).removeClass("active");
        });
    }

    function bindMobile() {
      $menuItems.on("click.mainMenu", function (e) {
        const $cur = $(this).closest(".navbar__menu-list");

        if ($cur.find(".dropdown-menu").length) {
          e.preventDefault();
        }

        $menuLists.not($cur).removeClass("active");
        $cur.toggleClass("active");

        e.stopPropagation();
      });
    }

    function refresh() {
      unbindAll();

      if ($(window).width() >= DESKTOP_WIDTH) {
        bindDesktop();
      } else {
        bindMobile();
      }
    }

    refresh();

    $(window).on("resize.mainMenu", function () {
      clearTimeout(t);
      t = setTimeout(refresh, 200);
    });
  }

  function bindHeaderSearch() {
    const $toggle = $(".js-header-search-toggle");
    const $search = $("#headerSearch");
    const $input = $("#headerSearchInput");

    if (!$toggle.length || !$search.length) return;

    function openSearch() {
      $search.addClass("is-open");
      $toggle.attr("aria-expanded", "true");

      setTimeout(function () {
        $input.trigger("focus");
      }, 300);
    }

    function closeSearch() {
      $search.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
    }

    function toggleSearch() {
      if ($search.hasClass("is-open")) {
        closeSearch();
      } else {
        openSearch();
      }
    }

    $toggle.on("click.headerSearch", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleSearch();
    });

    $search.on("click.headerSearch", function (e) {
      e.stopPropagation();
    });

    $(document).on("click.headerSearch", function () {
      closeSearch();
    });

    $(document).on("keydown.headerSearch", function (e) {
      if (e.key === "Escape") {
        closeSearch();
        $toggle.trigger("focus");
      }
    });
  }

  $(function () {
    bindHamburger();
    bindMainMenu();
    bindHeaderSearch();
  });
})(jQuery);

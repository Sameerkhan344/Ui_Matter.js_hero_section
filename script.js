// Initialize Lenis for smooth scrolling
// const lenis = new Lenis({
//   duration: 0.2, // Example duration for scroll animation
//   easing: (t) => t, // Example easing function
// });
// const lenis = new Lenis({
//   duration: 0.2,
// });

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
  duration: 0.2,
  easing: (t) => t,
  orientation: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Animation frame for Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//** 100vh height fixes **/
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);

//** Scroll helper script **/
function scrollHelper() {
  const selectAll = (e) => document.querySelectorAll(e);
  const scrollbar = selectAll(".c-scrollbar");

  if (scrollbar.length > 1) {
    scrollbar[0].remove();
  }
}
//** Initialize script **/

// scrollHelper();
function initScript() {
  navHandler();
  mobileNavHandler();
  customCursor();
  introNav();
  // initsitescrollprogress();
  // pageTitle();
  // initoTalic();
  // sfIntro();
  // initsfTab();
  // initScrollTextAnim();
  // initBrandScroll();
  // initZoomOnScroll();
  // sfMobileScroll();
  // studioHandler();
  mobileParallax();
}

//** Site scroll progress **/
function initsitescrollprogress() {
  const bar = document.querySelector(".scrollProgress");

  // Update the scroll progress bar on scroll
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY; // Current scroll position
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight; // Total scrollable height
    const progress = (scrollTop / windowHeight) * 100; // Calculate scroll progress

    bar.style.height = progress + "vh"; // Update the height of the progress bar
  });
}

let splitText = document.querySelector(".cursor__text");
//** Custom cursor**/
function customCursor() {
  var cursor = document.querySelector(".cursor");

  document.body.addEventListener("mousemove", onMouseMove);

  let cursorMoved = false;
  function onMouseMove(e) {
    if (!cursorMoved) {
      let tl = gsap.timeline();
      tl.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });

      tl.to(cursor, {
        opacity: 1,
        duration: 0.3,
      });

      cursorMoved = true;
    } else {
      gsap.to(cursor, 0.2, {
        x: e.clientX,
        y: e.clientY,
      });
    }

    if (splitText.children.length > 0) {
      gsap.to(".cursor__text span", {
        x: e.clientX,
        y: e.clientY,
        // stagger: .01
      });
    }
  }

  document.body.addEventListener("mouseleave", function () {
    cursor.classList.add("hide");
    splitText.classList.add("hide");
  });

  document.body.addEventListener("mouseenter", function () {
    cursor.classList.remove("hide");
    splitText.classList.remove("hide");
  });

  const actionbtn = document.querySelectorAll("a, button");
  actionbtn.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      cursor.classList.add("in");
    });
    btn.addEventListener("mouseleave", function () {
      cursor.classList.remove("in");
    });
  });
}

//** Navugation handler **/
function navHandler() {
  if (window.innerWidth > 768) {
    const navbar = document.querySelector(".navbar");

    const navItems = document.querySelectorAll(
      ".nav_link:not(.brandsInfo__textBlock--btn)"
    );

    const navText = document.querySelectorAll(".nav_text");

    var timeout;
    const navtl = gsap.timeline();

    CustomEase.create("easeNavbar", ".075, .82, .165, 1");

    navItems.forEach((btn, index) => {
      btn.addEventListener("mouseenter", () => {
        if (timeout != null) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          // Use navbar directly instead of getElementsByClassName
          if (
            !navbar.classList.contains("anim_going") &&
            !navbar.classList.contains("refresh")
          ) {
            navbar.classList.add("hover_in");

            navtl.to(".heroBanner__container", {
              y: 90,
              scaleX: 0.97,
              borderRadius: "+20px",
              duration: 1.2,
              ease: "Expo.easeInOut",
            });

            if (!navbar.classList.contains("refresh")) {
              navtl.to(
                navText[index],
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.5,
                  ease: "Expo.easeInOut",
                },
                ">-.6"
              );
            }

            setTimeout(() => {
              navbar.classList.add("anim_going");
            }, 300);
          } else {
            navtl.to(navText[index], {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "Expo.easeInOut",
            });
          }

          if (!navbar.classList.contains("refresh")) {
            btn.classList.add("active");
          }
        }, 300);
      });

      btn.addEventListener("mouseleave", function () {
        if (timeout != null) {
          clearTimeout(timeout);

          timeout = null;
        }
        // herocon.classList.remove('nav_open')
        btn.classList.remove("active");
        navtl.to(navText[index], {
          y: 10,
          autoAlpha: 0,
          duration: 0.5,
          ease: "Expo.easeInOut",
        });

        // navText[index].classList.remove('show')
      });
      btn.addEventListener("click", function () {
        navbar.classList.add("refresh");
        btn.classList.remove("active");
        navbar.classList.remove("hover_in");

        navtl.to(navText[index], {
          y: 10,
          autoAlpha: 0,
          duration: 0.3,
        });
      });
    });
    navbar.addEventListener("mouseleave", function () {
      navbar.classList.remove("anim_going");
      navbar.classList.remove("hover_in");
      navtl.to(".heroBanner__container", {
        y: 0,
        scale: 1,
        borderRadius: "0",
        duration: 1.2,
        ease: "Expo.easeInOut",
      });
    });
    // lenis.on("scroll", (args) => {
    // Ensure args.delta.y exists
    // if (args.delta && args.delta.y > 50) {
    //     gsap.to(".navbar", {
    //       autoAlpha: 0,
    //       duration: 0.3, // Optional: add a duration for smoothness
    //     });
    //   } else {
    // gsap.to(".navbar", {
    //   autoAlpha: 1,
    //   duration: 0.3, // Optional: add a duration for smoothness
    // });
  }
  // });
}
// }

//** Mobile Navugation handler **/
function mobileNavHandler() {
  const app = document.querySelector("body");
  const navopenbtn = document.querySelector(".mobilenavbar__togglebtn");
  const navclsebtn = document.querySelector(".mobilenavbar__content--close");
  const nav = document.querySelector(".mobilenavbar__content");
  const navitem = document.querySelectorAll(".mobilenavbar__content ul li");
  const navitemlink = document.querySelectorAll(
    ".mobilenavbar__content ul li a"
  );

  // Event listener for opening the navbar
  navopenbtn.addEventListener("click", (event) => {
    event.preventDefault();
    nav.classList.add("show");
    app.classList.add("fixed");
  });

  // Event listener for closing the navbar
  navclsebtn.addEventListener("click", (event) => {
    event.preventDefault();
    nav.classList.remove("show");
    app.classList.remove("fixed");
  });

  // Close the navbar when any link is clicked
  navitemlink.forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("show");
      app.classList.remove("fixed");
    });
  });

  // Activate the correct menu item based on the URL
  const menuItems = document.getElementsByClassName(
    "mobilenavbar__content--menu--item"
  );

  if (window.location.href.includes("studio")) {
    menuItems[2]?.classList.add("active"); // 3rd item (index 2)
  } else if (window.location.href.includes("collective")) {
    menuItems[3]?.classList.add("active"); // 4th item (index 3)
  } else if (window.location.href.includes("savoir")) {
    menuItems[1]?.classList.add("active"); // 2nd item (index 1)
  } else {
    menuItems[0]?.classList.add("active"); // 1st item (index 0)
  }
}
//** Make all "O" letter italic **/
function initoTalic() {
  const items = document.querySelectorAll(".o_italic");
  const oldlinks = document.querySelectorAll(".o_italic a");
  const oldimg = document.querySelectorAll(".o_italic img");

  items.forEach((item, index) => {
    item.innerHTML = item.innerHTML.replace(/\o/g, "<i>O</i>");
  });
  items.forEach((item, index) => {
    item.innerHTML = item.innerHTML.replace(/\O/g, "<i>O</i>");
  });

  // Reset all links and image src
  setTimeout(() => {
    const newlinks = document.querySelectorAll(".o_italic a");
    newlinks.forEach((link, index) => {
      link.href = oldlinks[index].href;
    });
    const newimg = document.querySelectorAll(".o_italic img");
    newimg.forEach((img, index) => {
      img.src = oldimg[index].src;
    });
  }, 500);
}

// ** SF Tab handler ** /
function initsfTab() {
  if (document.getElementsByClassName("sfimpact__tab").length > 0) {
    let nextButton1 = document.querySelector(".ts1next");
    let prevButton1 = document.querySelector(".ts1prev");
    let nextButton2 = document.querySelector(".ts2next");
    let prevButton2 = document.querySelector(".ts2prev");
    let saftabimg1 = document.querySelector(".sfimpact__banner--img--img1");
    let saftabimg2 = document.querySelector(".sfimpact__banner--img--img2");
    document.getElementsByClassName("tabSlider1").slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 800,
      fade: true,
      nextArrow: nextButton1,
      prevArrow: prevButton1,
    });
    var status = document.getElementsByClassName("pagingInfo");
    var slickElement = document.getElementsByClassName("tabSlider1");
    slickElement.on(
      "init reInit afterChange",
      function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        status.text("0" + i + " / " + "0" + slick.slideCount);
      }
    );
    document.getElementsByClassName("tabSlider2").slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 800,
      fade: true,
      nextArrow: nextButton2,
      prevArrow: prevButton2,
    });
    var status2 = document.getElementsByClassName("pagingInfo2");
    var slickElement2 = document.getElementsByClassName("tabSlider2");

    slickElement2.on(
      "init reInit afterChange",
      function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        status2.text("0" + i + " / " + "0" + slick.slideCount);
      }
    );

    let tabbtn1 = document.querySelector(".tab-nav1");
    let tabbtn2 = document.querySelector(".tab-nav2");
    let tab1 = document.querySelector(".tabcontent1");
    let tab2 = document.querySelector(".tabcontent2");
    let line = document.querySelector(".line");

    saftabimg2.classList.add("hide");
    tabbtn1.addEventListener("click", function (event) {
      event.preventDefault();
      if (tab2.classList.contains("active")) {
        tab1.classList.add("active");
        tab2.classList.remove("active");
        tabbtn2.classList.remove("active");
        tabbtn1.classList.add("active");
        saftabimg2.classList.add("hide");
        saftabimg1.classList.remove("hide");
      }
    });
    tabbtn2.addEventListener("click", function (event) {
      event.preventDefault();
      if (tab1.classList.contains("active")) {
        tab2.classList.add("active");
        tab1.classList.remove("active");
        tabbtn2.classList.add("active");
        tabbtn1.classList.remove("active");
        saftabimg2.classList.remove("hide");
        saftabimg1.classList.add("hide");
      }
    });

    // Social icon hover
    if (
      !document
        .getElementsByClassName("navbar")
        .classList.contains("anim_going") &&
      !document.getElementsByClassName("navbar").classList.contains("refresh")
    )
      "li.sfsocial__content--links--item".hover(
        function () {
          document
            .getElementsByClassName("li.sfsocial__content--links--item")
            .classList.add("hover");
          document.getElementsByClassName(this).classList.remove("hover");
        },
        function () {
          document
            .getElementsByClassName("li.sfsocial__content--links--item")
            .classList.remove("hover");
        }
      );
  }
}

function introNav() {
  CustomEase.create("easeNav", ".075, .82, .165, 1");

  gsap.to(".navbar--menu--item a", {
    y: 0,
    stagger: 0.2,
    duration: 1,
    ease: "easeNav",
    onComplete: function () {
      // Assuming you want to add the class to all elements with this class
      const items = document.getElementsByClassName("navbar--menu--item");
      for (let i = 0; i < items.length; i++) {
        items[i].classList.add("loaded"); // Add class to each item
      }

      const navbar = document.getElementsByClassName("navbar");
      if (navbar.length > 0) {
        navbar[0].classList.remove("refresh"); // Remove class from the first navbar element
      }
    },
  });
}

//**  Intro animations **/
function initIntroAnim() {
  if (document.querySelectorAll(".heroBanner").length > 0) {
    const body = document.querySelector("body");
    const logo = document.querySelector(".haloLogo__img");
    const hero = document.querySelector(".heroBanner");
    const herocon = document.querySelector(".heroBanner__container");
    const heroTextOne = document.querySelector(".h-text-1");
    const heroTextTwo = document.querySelector(".h-text-2");
    const heroImgOne = document.querySelector(".h-img-1");
    const heroImgTwo = document.querySelector(".h-img-2");
    const semiheading1 = document.querySelector(".semiheading1");
    const semiheading2 = document.querySelector(".semiheading2");

    body.classList.add("is-loaded");
    hero.classList.add("loaded");

    const introTl = gsap.timeline();

    CustomEase.create("easeTitle", ".075, .82, .165, 1");

    if (document.querySelectorAll(".homehero").length > 0) {
      introTl.to(".heroBanner__container", {
        opacity: 1,
        duration: 2,
        ease: "Power3.none",
      });
      introTl.to(
        heroTextOne,
        {
          y: 0,
          duration: 1.2,
          ease: "Expo.easeOut",
        },
        ">-2"
      );
      introTl.to(
        heroTextTwo,
        {
          y: 0,
          duration: 1.2,
          ease: "Expo.easeOut",
        },
        ">-.8"
      );
      introTl.to(
        logo,
        {
          y: 0,
          duration: 1.5,
          ease: "Power3.easeInOut",
        },
        ">-1.7"
      );
      introTl.to(
        heroImgTwo,
        {
          scale: 1.1,
          duration: 2.8,
          ease: "Power3.easeInOut",
        },
        ">-1.8"
      );
      introTl.to(
        heroImgOne,
        {
          scale: 1.1,
          duration: 2.8,
          ease: "Power3.easeInOut",
        },
        ">-2.9"
      );
      introTl.to(
        semiheading1,
        {
          y: 0,
          duration: 0.55,
          ease: "easeTitle",
        },
        ">-1.2"
      );
      introTl.to(
        semiheading2,
        {
          y: 0,
          duration: 0.55,
          ease: "easeTitle",
        },
        ">-.46"
      );
    } else {
      introTl.to(".heroBanner__container", {
        opacity: 1,
        duration: 2,
        ease: "Power3.none",
      });
    }
  }
}

//**  Savoir flair intro animations **/

function sfIntro() {
  if (document.getElementsByClassName("heroBanner__sfcontent").length > 0) {
    const sfintroTl = gsap.timeline();
    sfintroTl.to(".heroBanner__sfcontent--innervideo", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "Power3.none",
    });
  }
}

//**  Scrol text animations **/
function initScrollTextAnim() {
  if (document.getElementsByClassName("anim-on-scroll").length > 0) {
    const scrollTitle = document.querySelectorAll(".anim-on-scroll");
    const scrollWrapper = document.querySelectorAll(".scroll-reveal");

    scrollTitle.forEach((triggerElement, index) => {
      let wrapper = triggerElement.closest(".scroll-reveal");
      gsap.from(triggerElement, {
        y: "100%",
        opacity: 0,
        ease: "Power3.easeInOut",
        duration: 1.9,
        scrollTrigger: {
          trigger: triggerElement.closest(".scroll-reveal"),
          scrub: false,
          start: "top bottom",
          //   scroller: ".scroller",
        },
      });
    });

    lenis.on("scroll", (args) => {
      if (typeof args.currentElements["studio_heading"] === "object") {
        let progress = args.currentElements["studio_heading"].progress;
        if (progress > 0.06) {
          document
            .getElementsByClassName("studio_heading_text1")
            .classList.add("show");
          document
            .getElementsByClassName("studio_heading_text2")
            .classList.add("show");
        }
      }
      if (typeof args.currentElements["collective_heading"] === "object") {
        let progress = args.currentElements["collective_heading"].progress;
        if (progress > 0.06) {
          document
            .getElementsByClassName("collective_heading_text1")
            .classList.add("show");
        }
        if (progress > 0.3) {
          document
            .getElementsByClassName("collective_heading_text2")
            .classList.add("show");
        }
      }
      if (typeof args.currentElements["footer"] === "object") {
        let progress = args.currentElements["footer"].progress;
        if (progress > 0.06) {
          document
            .getElementsByClassName("footer__wrapper")
            .classList.add("show");
        }
      }
    });
  }

  let privacyTexts = document.querySelectorAll(".privacy__block > p");
  privacyTexts.forEach((privacyText) => {
    gsap.to(privacyText, {
      opacity: 1,
      ease: "Power3.easeInOut",
      duration: 1.9,
      scrollTrigger: {
        trigger: privacyText,
        scrub: false,
        start: "top bottom",
        // scroller: ".scroller",
      },
    });
  });
}

//**  Zoom images animations **/
function initZoomOnScroll() {
  if (document.getElementsByClassName("z-on-scroll").length > 0) {
    const scrollImages = document.querySelectorAll(".z-on-scroll");

    scrollImages.forEach((triggerElement) => {
      gsap.to(triggerElement, {
        scale: 1.2,
        ease: "Power3.easeInOut",
        duration: 1.9,
        scrollTrigger: {
          trigger: triggerElement.parentElement,
          scrub: !0,
          //   scroller: ".scroller",
        },
      });
    });
  }
}

//** Brands section scroll **//
function initBrandScroll() {
  if (document.getElementsByClassName("imgscalescroll").length > 0) {
    gsap.set(".imgscalescroll", {
      width: "28vw",
      height: "74vh",
    });
    gsap.to(".imgscalescroll", {
      width: "100vw",
      height: "190vh",
      x: "-36vw",
      scrollTrigger: {
        trigger: ".brands__wrapper",
        scrub: !0,
        // scroller: ".scroller",
        pin: !0,
        end: "+=2000px",
        pinType: "transform",
      },
    });
    gsap.to(".brands__leftBlock", {
      x: 300,
      opacity: 0,
      scale: 0.7,
      scrollTrigger: {
        trigger: ".brands__wrapper",
        scrub: !0,
        // scroller: ".scroller",
        pin: !0,
        pinType: "transform",
        refreshPriority: 1,
        anticipatePin: 1,
      },
    });
    gsap.to(".brands__rightBlock", {
      x: -300,
      scale: 0.7,
      opacity: 0,
      scrollTrigger: {
        trigger: ".brands__wrapper",
        scrub: !0,
        // scroller: ".scroller",
        pin: !0,
        pinType: "transform",
        refreshPriority: 1,
        anticipatePin: 1,
      },
    });
    gsap.to(".brands__texture.mid", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".brands__wrapper",
        scrub: !0,
        // scroller: ".scroller",
        pin: !0,
        end: "20%",
        pinType: "transform",
        refreshPriority: 1,
        anticipatePin: 1,
      },
    });
    gsap.to(".brands__description.mid", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".brands__wrapper",
        scrub: !0,
        // scroller: ".scroller",
        pin: !0,
        pinType: "transform",
        refreshPriority: 1,
        anticipatePin: 1,
      },
    });
    gsap.to(".brands__heading.mid", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".brands__wrapper",
        scrub: !0,
        // scroller: ".scroller",
        pin: !0,
        pinType: "transform",
        refreshPriority: 1,
        anticipatePin: 1,
      },
    });
    lenis.on("scroll", (args) => {
      if (typeof args.currentElements["scroll-brand-text1"] === "object") {
        let progress = args.currentElements["scroll-brand-text1"].progress;
        if (progress > 0.1) {
          document
            .getElementsByClassName("scroll-brand-text1")
            .classList.add("show");
          document
            .getElementsByClassName("scroll-brand-text2")
            .classList.add("show");
        } else {
          document
            .getElementsByClassName("scroll-brand-text1")
            .classList.remove("show");
          document
            .getElementsByClassName("scroll-brand-text2")
            .classList.remove("show");
        }
      }
    });
  }
}

//** SF media mobile  scroll **//
function sfMobileScroll() {
  if (
    document.getElementsByClassName("sfinfo__media").length > 0 &&
    window.innerWidth < 850
  ) {
    ScrollTrigger.clearScrollMemory();
    gsap.to(".sfinfo__media--wrapper", {
      xPercent: -25,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".sfinfo__media--wrapper",
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    });

    gsap.to(".heroBanner__sfcontent--bgvideo", {
      yPercent: 20,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".heroBanner__sfcontent--bgvideo",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".sfimpact__banner--img", {
      yPercent: 20,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".sfimpact__banner--img",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

//** Mobile parallax  scroll **//
function mobileParallax() {
  if (
    document.querySelectorAll(".mobilePrallax, .mobilePrallaxQuick").length >
      0 &&
    window.innerWidth < 1030
  ) {
    gsap.to(".heroBanner__midImg", {
      yPercent: -25,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".heroBanner",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".heroBanner__rightImg", {
      yPercent: 25,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".heroBanner",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".mobilePrallax", {
      yPercent: 15,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".mobilePrallax",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".mobilePrallax2", {
      yPercent: 15,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".mobilePrallax2",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".mobilePrallax3", {
      yPercent: 10,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".mobilePrallax3",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".mobilePrallaxQuick", {
      y: 200,
      ease: "Power3.none",
      scrollTrigger: {
        trigger: ".mobilePrallax3",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

// Call the function on page load and on window resize
// window.addEventListener("load", mobileParallax);
// window.addEventListener("resize", mobileParallax);

//** Studio Gallery Exibition with case study **//
function studioHandler() {
  if (
    document.getElementsByClassName("studioScene").length > 0 &&
    window.innerWidth > 1030
  ) {
    CustomEase.create("easeTitle", ".075, .82, .165, 1");

    gsap.to(".heroBanner__studioContent--text--line h5", {
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 1.6,
      ease: "easeTitle",
    });

    gsap.from(".studio__item a", {
      scale: 0.85,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: Power3.none,
      onComplete: function () {
        document
          .getElementsByClassName("studio__item a img")
          .classList.add("is-loaded"); // then only replace with blue div with new height and width
      },
    });

    const scene = new _assets_js_stage__WEBPACK_IMPORTED_MODULE_11__[
      "default"
    ]();
    // Map number x from range [a, b] to [c, d]
    const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

    // Linear interpolation
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const calcWinsize = () => {
      return { width: window.innerWidth, height: window.innerHeight };
    };

    const getRandomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    // Gets the mouse position
    const getMousePos = (e) => {
      return {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Calculate the viewport size
    let winsize = calcWinsize();
    window.addEventListener("resize", () => (winsize = calcWinsize()));

    // Track the mouse position
    let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
    window.addEventListener("mousemove", (ev) => (mousepos = getMousePos(ev)));

    let translationVals = { x: 0, y: 0 };
    let rotationVals = { x: 0, y: 0 };
    let xstart = getRandomNumber(70, 100);
    let ystart = getRandomNumber(40, 65);
    let rxstart = 5;
    let rystart = 10;
    let csOpen = false;
    const gridItems = document.querySelectorAll(".studio");
    gridItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      layout();
      function layout() {
        if (csOpen == true) return;
        let isLeft = rect.left + rect.width / 2 < winsize.width / 2;
        let isTop = rect.top + rect.height / 2 < winsize.height / 2;

        let rY = isLeft
          ? map(rect.left + rect.width / 2, 0, winsize.width / 2, rystart, 0)
          : map(
              rect.left + rect.width / 2,
              winsize.width / 2,
              winsize.width,
              0,
              -rystart
            );

        let rX = isTop
          ? map(rect.top + rect.height / 2, 0, winsize.height / 2, -rxstart, 0)
          : map(
              rect.top + rect.height / 2,
              winsize.height / 2,
              winsize.height,
              0,
              rxstart
            );

        let tZ = isLeft
          ? map(rect.left + rect.width / 2, 0, winsize.width / 2, -200, -600)
          : map(
              rect.left + rect.width / 2,
              winsize.width / 2,
              winsize.width,
              -600,
              -200
            );

        translationVals.x = lerp(
          translationVals.x,
          map(mousepos.x, 0, winsize.width, -xstart, xstart),
          0.04
        );
        translationVals.y = lerp(
          translationVals.y,
          map(mousepos.y, 0, winsize.height, -ystart, ystart),
          0.04
        );
        // same for the rotations
        rotationVals.x = isTop
          ? lerp(
              rotationVals.x,
              map(mousepos.y, 0, winsize.height / 2, rxstart, 0),
              0.04
            )
          : lerp(
              rotationVals.x,
              map(mousepos.y, winsize.height / 2, winsize.height, 0, -rxstart),
              0.04
            );
        rotationVals.y = isLeft
          ? lerp(
              rotationVals.y,
              map(mousepos.x, 0, winsize.width / 2, -rystart, 0),
              0.04
            )
          : lerp(
              rotationVals.y,
              map(mousepos.x, winsize.width / 2, winsize.width, 0, rystart),
              0.04
            );

        gsap.set(item, {
          x: -translationVals.x * 3,
          y: -translationVals.y * 3,
          ease: Power4.easeInOut,
        });
        loopTransformAnimation();
      }

      function loopTransformAnimation() {
        let requestId = undefined;
        if (!requestId) {
          let requestId = requestAnimationFrame(() => layout());
        }
      }

      const cta = document.querySelectorAll(".studio__item a");
      const caseTitle = document.querySelector(
        ".heroBanner__studioContent--csinfo h2"
      );
      const caseSubTitle = document.querySelector(
        ".heroBanner__studioContent--csinfo p"
      );
      const caseDate = document.querySelector(
        ".heroBanner__studioContent--csinfo a"
      );
      const studioTl = gsap.timeline();
      caseDate.addEventListener("mouseover", function () {
        document
          .getElementsByClassName("cursor__text")[0]
          .classList.remove("show");
      });
      caseDate.addEventListener("mouseleave", function () {
        document
          .getElementsByClassName("cursor__text")[0]
          .classList.add("show");
      });
      cta.forEach((link) => {
        link.addEventListener("click", function (event) {
          lenis.stop();
          event.preventDefault();
          document
            .getElementsByClassName("heroBanner__studioContent--csinfo")
            .classList.add("show");
          link.parentNode.classList.add("cs-active");
          changeCursorText("RETURN");
          document
            .getElementsByClassName("cursor__text")[0]
            .classList.add("show");

          gsap.to(".heroBanner__studioContent--logo", {
            autoAlpha: 0,
            duration: 0.4,
            ease: Power4.easeInOut,
          });
          gsap.to(".heroBanner__studioContent--text", {
            autoAlpha: 0,
            duration: 0.4,
            ease: Power4.easeInOut,
          });
          caseTitle.innerText = link.dataset.title;
          caseSubTitle.innerText = link.dataset.subtitle;
          caseDate.href = link.dataset.date;
          if (link.dataset.link == "case1") {
            gsap.to(".studio", {
              scale: 1.4,
              x: "20%",
              y: "22%",
              duration: 1,
              ease: Power4.easeInOut,
            });
          }
          if (link.dataset.link == "case2") {
            gsap.to(".studio", {
              scale: 1.3,
              x: "-16%",
              y: "15%",
              duration: 1,
              ease: Power4.easeInOut,
            });
          }
          if (link.dataset.link == "case3") {
            gsap.to(".studio", {
              scale: 1.8,
              x: "16%",
              y: "-4%",
              duration: 1,
              ease: Power4.easeInOut,
            });
          }
          if (link.dataset.link == "case4") {
            gsap.to(".studio", {
              scale: 1.4,
              x: "26%",
              y: "-42%",
              duration: 1,
              ease: Power4.easeInOut,
            });
          }
          if (link.dataset.link == "case5") {
            gsap.to(".studio", {
              scale: 2.5,
              x: "-10%",
              y: "-28%",
              duration: 1,
              ease: Power4.easeInOut,
            });
          }
          if (link.dataset.link == "case6") {
            gsap.to(".studio", {
              scale: 1.4,
              x: "-28%",
              y: "-46%",
              duration: 1,
              ease: Power4.easeInOut,
            });
          }
          if (
            !document
              .getElementsByClassName("studio")
              .classList.contains("cs-open")
          ) {
            setTimeout(() => {
              document
                .getElementsByClassName("studio")
                .classList.add("cs-open");
              csOpen = true;
            }, 10);
          }
        });
      });
      document.getElementsByClassName("studio").click(function () {
        if (
          document
            .getElementsByClassName("studio")
            .classList.contains("cs-open")
        ) {
          lenis.start();
          document
            .getElementsByClassName("cursor__text")[0]
            .classList.remove("show");
          document
            .getElementsByClassName("heroBanner__studioContent--csinfo")
            .classList.remove("show");
          csOpen = false;
          setTimeout(() => {
            loopTransformAnimation();
          }, 1000);
          document.getElementsByClassName("studio").classList.remove("cs-open");
          gsap.to(".studio", {
            scale: 1,
            duration: 1,
            x: -translationVals.x * 3,
            y: -translationVals.y * 3,
            ease: Power4.easeInOut,
          });
          gsap.to(".heroBanner__studioContent--logo", {
            autoAlpha: 1,
            duration: 0.5,
            delay: 0.8,
            ease: Power4.easeInOut,
          });
          gsap.to(".heroBanner__studioContent--text", {
            autoAlpha: 1,
            duration: 0.5,
            delay: 0.8,
            ease: Power4.easeInOut,
          });
        }
      });
    });
  }

  if (
    document.getElementsByClassName("studioMobileCs").length > 0 &&
    window.innerWidth < 1030
  ) {
    const app = document.querySelector("body");
    const appContent = document.querySelector("main");
    const cta = document.querySelectorAll(".studio__item a");
    const closeBtn = document.querySelector(".studioMobileCs button");
    const caseImg = document.querySelector(".studioMobileCs img");
    const caseTitle = document.querySelector(".studioMobileCs h2");
    const caseSubTitle = document.querySelector(".studioMobileCs p");
    const caseDate = document.querySelector(".studioMobileCs a");
    cta.forEach((link) => {
      link.addEventListener("click", function () {
        app.classList.add("fixed");
        appContent.classList.add("zabove");
        event.preventDefault();
        document.getElementsByClassName("studioMobileCs").classList.add("show");
        caseImg.src = link.querySelector("img").src;
        caseTitle.innerText = link.dataset.title;
        caseSubTitle.innerText = link.dataset.subtitle;
        if (link.dataset.date.length > 0) {
          caseDate.style.display = "flex";
          caseDate.href = link.dataset.date;
        } else {
          caseDate.style.display = "none";
        }
      });
    });
    closeBtn.addEventListener("click", function () {
      document
        .getElementsByClassName("studioMobileCs")
        .classList.remove("show");
      app.classList.remove("fixed");
      appContent.classList.remove("zabove");
    });
  }
}

// Page title
function pageTitle() {
  const navitems = document.querySelectorAll(
    ".nav_link, .brandsInfo__textBlock--btn, .privacy-policy"
  );

  const pgtextfirst = document.querySelector(".pagetransition h1 .fsl");
  const pgtextsecond = document.querySelector(".pagetransition h1 .fsi");
  document
    .querySelector(".mobilenavbar__logo a")
    .addEventListener("click", function () {
      pgtextfirst.innerHTML = "halo";
      pgtextsecond.innerHTML = "media";
    });

  navitems.forEach((item) => {
    let itembtn = item.querySelector(".btn-text");
    if (itembtn) {
      item.addEventListener("click", function () {
        let title = itembtn.dataset.title;
        if (title.includes("discover")) {
          title = itembtn.dataset.inttitle;
        }

        if (title === "halo media") {
          pgtextfirst.innerHTML = "halo";
          pgtextsecond.innerHTML = "media";
        } else if (title === "halo studio") {
          pgtextfirst.innerHTML = "halo";
          pgtextsecond.innerHTML = "studio";
        } else if (title === "halo collective") {
          pgtextfirst.innerHTML = "halo";
          pgtextsecond.innerHTML = "collective";
        } else if (title === "savoir flair") {
          pgtextfirst.innerHTML = "savoir";
          pgtextsecond.innerHTML = "flair";
        } else if (title === "privacy-policy") {
          pgtextfirst.innerHTML = "privacy";
          pgtextsecond.innerHTML = "policy";
        }
      });
    } else {
      item.addEventListener("click", function () {
        if (item.dataset.title === "halo media") {
          pgtextfirst.innerHTML = "halo";
          pgtextsecond.innerHTML = "media";
        }
        if (item.dataset.title === "halo studio") {
          pgtextfirst.innerHTML = "halo";
          pgtextsecond.innerHTML = "studio";
        }
        if (item.dataset.title === "halo collective") {
          pgtextfirst.innerHTML = "halo";
          pgtextsecond.innerHTML = "collective";
        }
        if (item.dataset.title === "savoir flair") {
          pgtextfirst.innerHTML = "savoir";
          pgtextsecond.innerHTML = "flair";
        } else if (item.dataset.title === "privacy-policy") {
          pgtextfirst.innerHTML = "privacy";
          pgtextsecond.innerHTML = "policy";
        }
      });
    }
  });
}

//** Page transition **//

function transOut() {
  CustomEase.create("easeTitle", ".075, .82, .165, 1");
  const tl = gsap.timeline();

  const pgtextfirst = document.querySelector(".pagetransition h1 .fsl");
  const pgtextsecond = document.querySelector(".pagetransition h1 .fsi");

  gsap.to(".wrapper", {
    opacity: 0,
    duration: 0.5,
  });
  gsap.to(".pagetransition", {
    autoAlpha: 1,
    duration: 0.7,
  });

  if (window.innerWidth > 1030) {
    tl.set(pgtextfirst, {
      y: "100%",
      duration: 0.5,
      ease: CustomEase.create("custom", "M0,0 C0,0.236 0.398,1 1,1 "),
    });
    tl.set(pgtextsecond, {
      y: "100%",
      duration: 0.5,
      ease: CustomEase.create("custom", "M0,0 C0,0.236 0.398,1 1,1 "),
    });
    tl.to(pgtextfirst, {
      y: 0,
      duration: 0.5,
      ease: CustomEase.create("custom", "M0,0 C0,0.236 0.398,1 1,1 "),
    });
    tl.to(
      pgtextsecond,
      {
        y: 0,
        duration: 0.5,
        ease: CustomEase.create("custom", "M0,0 C0,0.236 0.398,1 1,1 "),
      },
      ">-.4"
    );
  } else {
    tl.set(pgtextfirst, {
      y: "100%",
      duration: 0.5,
      opacity: 0,
      ease: CustomEase.create("custom", "M0,0 C0,0.236 0.398,1 1,1 "),
    });
    tl.set(pgtextsecond, {
      y: "100%",
      duration: 0.5,
      opacity: 1,
      ease: CustomEase.create("custom", "M0,0 C0,0.236 0.398,1 1,1 "),
    });
    tl.to(pgtextfirst, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: CustomEase.create("custom", "M0,0 C0,0.236 0.398,1 1,1 "),
    });
    tl.to(
      pgtextsecond,
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: CustomEase.create("custom", "M0,0 C0,0.236 0.398,1 1,1 "),
      },
      ">-.4"
    );
  }
  changeCursorText("LOADING");
  document.getElementsByClassName("cursor__text").classList.add("show");
}
function changeCursorText(text) {
  splitText.innerHTML = "";
  let letters = [...text];

  for (let i = 0; i < letters.length; i++) {
    splitText.innerHTML += `<span style="transition: all ${0.03 * i}s ease;">${
      letters[i]
    }</span>`;
  }
}
function transIn() {
  CustomEase.create("easeTitle", ".165, .82, .75, 1");
  const tl = gsap.timeline();

  const pgtextfirst = document.querySelector(".pagetransition h1 .fsl");
  const pgtextsecond = document.querySelector(".pagetransition h1 .fsi");
  if (window.innerWidth > 1030) {
    tl.to(pgtextfirst, {
      y: "-8.5vw",
      duration: 0.5,
      ease: CustomEase.create("custom", "M0,0 C0.648,0 1,0.85 1,1 "),
    });
    tl.to(
      pgtextsecond,
      {
        y: "-8.5vw",
        duration: 0.5,
        ease: CustomEase.create("custom", "M0,0 C0.648,0 1,0.85 1,1 "),
      },
      ">-.4"
    );
    setTimeout(() => {
      gsap.to(".pagetransition", {
        autoAlpha: 0,
        duration: 0.5,
      });
      gsap.to(".wrapper", {
        opacity: 1,
        duration: 0.7,
      });
    }, 500);
  } else {
    tl.to(pgtextfirst, {
      y: "-8.5vw",
      opacity: 0,
      duration: 0.5,
      ease: CustomEase.create("custom", "M0,0 C0.648,0 1,0.85 1,1 "),
    });
    tl.to(
      pgtextsecond,
      {
        y: "-8.5vw",
        opacity: 0,
        duration: 0.5,
        ease: CustomEase.create("custom", "M0,0 C0.648,0 1,0.85 1,1 "),
      },
      ">-.4"
    );
    setTimeout(() => {
      gsap.to(".pagetransition", {
        autoAlpha: 0,
        duration: 0.5,
      });
      gsap.to(".wrapper", {
        opacity: 1,
        duration: 0.7,
      });
    }, 500);
  }
  document.getElementsByClassName("cursor__text").classList.remove("show");
}

// barba.hooks.after(() => {
//   lenis.update();
// });

function updateActiveMenu() {
  let currActive = document.querySelector(".navbar--menu--item a.curr");
  if (currActive) {
    currActive.classList.remove("curr");
  }

  let nextActive = document.querySelector(
    `.navbar--menu--item a[href="${window.location.href}"]`
  );
  if (nextActive) {
    nextActive.classList.add("curr");
  }
}

let world, engine, render;
let dropper;
let dropped = false;
// module aliases
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Common = Matter.Common,
  Svg = Matter.Svg,
  Composite = Matter.Composite,
  Vertices = Matter.Vertices,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Events = Matter.Events;

// Common.setDecomp(
//   __webpack_require__(
//     /*! poly-decomp */ "./node_modules/poly-decomp/src/index.js"
//   )
// );

let noDropperMouse = true;
let svgRenCount = 0;
let runSvgLoop = false;
let renderSvgRAF;

//Svgs act as overlays to engine elements- move them with the engine el
function renderSvg() {
  if (runSvgLoop) {
    for (let i = 0; i < world.bodies.length; i++) {
      let thisBody = world.bodies[i];
      let thisEl = document.getElementById(thisBody.id);

      if (thisEl && !thisBody.isSleeping) {
        thisEl.style.transform = `
                    translate(
                        ${thisBody.position.x}px,
                        ${thisBody.position.y}px
                    )
                    rotate(${thisBody.angle * 57.295779513}deg)`;
      }
    }

    svgRenCount++;
  }

  renderSvgRAF = requestAnimationFrame(renderSvg);
}

function dropperInit() {
  if (window.innerWidth > 1000) {
    // lenis.stop();
    dropper = document.getElementById("dropper");
    if (!dropper) {
      console.error("Dropper element not found.");
      return; // Exit if dropper element is not found
    }
    // Create an engine if it hasn't been created yet
    if (!engine) {
      engine = Matter.Engine.create({
        constraintIterations: 2,
        positionIterations: 10,
        velocityIterations: 10,
      });
    }

    world = engine.world;
    world.gravity.y = 0.8;

    let shapesLoaded = 0;
    function setDropperHeight() {
      setTimeout(() => {
        let innerW = dropper.offsetWidth;
        let innerH = dropper.offsetHeight;

        // Create a renderer if it hasn't been created yet
        if (!render) {
          render = Matter.Render.create({
            element: dropper,
            engine: engine,
            options: {
              wireframes: false,
              background: "transparent",
              width: innerW,
              height: innerH,
              showSleeping: true,
            },
          });
          Matter.Render.run(render); // Start rendering
        }

        gsap.to(dropper, {
          height: innerH,
          width: innerW,
          duration: 0,
        });

        initDropperSvg();
        initDropperShape();
        initDropperWalls();

        window.addEventListener("resize", responsiveDropper);

        setTimeout(() => {
          //Scrolltrigger to drop elements in dropper
          gsap.to(dropper, {
            scrollTrigger: {
              trigger: dropper,
              start: `top+=70 top`,
              scrub: true,
              //   scroller: ".scroller",
              onEnter: dropItems,
              once: true,
            },
          });

          //   lenis.start();
        }, 2300);

        gsap.to("div.dropper__visible__shape", {
          opacity: 1,
          duration: 3,
          delay: 1.5,
          ease: "Power3.none",
        });

        gsap.to(".dropper__gallery__text__line__inner", {
          y: 0,
          duration: 0.6,
          delay: 1.6,
          ease: "Power3.ease",
          stagger: 0.15,
        });

        gsap.to("img.dropper__visible__shape", {
          opacity: 1,
          scale: 1,
          duration: 4,
          delay: 1.8,
          ease: "Power3.easeOut",
        });

        let svgs = document.querySelectorAll("img.dropper__visible");
        svgs = gsap.utils.shuffle([...svgs]);

        svgs.forEach((svg) => {
          let i = svgs.indexOf(svg);

          gsap.to(svg, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "Power3.none",
            delay: i * 0.07 + 0.7,
          });
        });
      }, 300);
    }

    //Wait until all images have loaded in (and height of the dropper has been set) before setting height and initting elements
    let shapeLetters = document.querySelectorAll(
      "img.dropper__visible, img.dropper__visible__shape"
    );
    shapeLetters.forEach((shape) => {
      if (shape.complete) {
        shapesLoaded++;

        if (shapesLoaded === shapeLetters.length) {
          setDropperHeight();
        }
      } else {
        shape.addEventListener("load", () => {
          shapesLoaded++;
          if (shapesLoaded === shapeLetters.length) {
            setDropperHeight();
          }
        });
      }
    });

    //When user moves out of dropper- drop item they are holding
    dropper.addEventListener("mouseleave", function () {
      noDropperMouse = true;
      Matter.World.remove(world, world.constraints);
    });

    dropper.addEventListener("mousemove", initDropperMouse);
  }
}

function initDropperSvg() {
  let svgs = dropper.getElementsByClassName("dropper__visible");

  let svgPaths = [];
  //Add each path to svg into arr
  for (let i = 0; i < svgs.length; i++) {
    svgPaths.push(svgs[i].id);
  }

  // add bodies
  if (typeof fetch !== "undefined") {
    let select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    // load svg elements from string
    let loadSvg = async function (url) {
      const response = await fetch(url);
      const raw = await response.text();
      return new window.DOMParser().parseFromString(raw, "image/svg+xml");
    };

    let svgBodies = {};
    function createSvgBodies() {
      for (let i = 0; i < svgPaths.length; i++) {
        const path = svgPaths[i];
        const svg = document.getElementById(path);

        let svgBounds = svg.getBoundingClientRect();
        let x = svgBounds.x + window.scrollX + svgBounds.width / 2;
        let y = svgBounds.y + window.scrollY + svgBounds.height / 2;

        //Add into world- invisible engine el. El id is path
        Composite.add(
          world,
          Bodies.fromVertices(
            x,
            y,
            svgBodies[i],
            {
              id: path,

              render: { fillStyle: "transparent" },

              //Bounciness of body
              restitution: 0,
              density: 1,
              friction: 1,

              height: svgBounds.height,
              width: svgBounds.width,
            },
            true
          )
        );

        Matter.Body.set(world.bodies[world.bodies.length - 1], {
          velocity: {
            y: 3,
            x: 0,
          },
        });

        gsap.to(svg, {
          top: -(svgBounds.height / 2),
          left: -(svgBounds.width / 2),

          duration: 0,
          ease: "linear",
        });

        if (i === svgPaths.length - 1) {
          setTimeout(() => {
            responsiveDropper();
          }, 500);
        }
      }
    }

    let loadedCount = 0;
    //For each of the svg elements
    svgPaths.forEach(function (path) {
      //Load svg element from given path
      loadSvg(path).then(function (root) {
        //Create vertices from path
        let vertexSets = select(root, "path").map(function (path) {
          return Vertices.scale(Svg.pathToVertices(path, 10), 1, 1);
        });

        svgBodies[svgPaths.indexOf(path)] = vertexSets;

        loadedCount++;
        if (loadedCount === svgs.length) {
          createSvgBodies();
        }
      });
    });
  } else {
    Common.warn("Fetch is not available. Could not load SVG.");
  }
}

function initDropperShape() {
  let shapes = dropper.querySelectorAll(".dropper__visible__shape");
  shapes = [...shapes].reverse();

  shapes.forEach((shape) => {
    // If img- wait for load event (height reasons)
    if (shape.tagName === "IMG") {
      if (shape.complete) {
        initShape(shape);
      } else {
        shape.addEventListener("load", () => {
          initShape(shape);
        });
      }
    } else {
      initShape(shape);
    }
  });

  function initShape(shape) {
    let shapeBounds = shape.getBoundingClientRect();
    let height = shapeBounds.height;
    let width = shapeBounds.width;
    let x = shapeBounds.x + window.scrollX + shapeBounds.width / 2;
    let y = shapeBounds.y + window.scrollY + shapeBounds.height / 2;

    World.add(
      world,
      Bodies.rectangle(x, y, width, height, {
        id: shape.id,

        render: { fillStyle: "transparent" },

        restitution: 0,
        density: 1,
        friction: 1,

        collisionFilter: {
          group: 1,
          category: 1,
        },

        inertia: Infinity,
      })
    );

    Matter.Body.set(world.bodies[world.bodies.length - 1], {
      //Initial y velocity on drop
      velocity: {
        y: 5,
        x: 0,
      },
    });

    gsap.to(shape, {
      height: shapeBounds.height,
      width: shapeBounds.width,

      top: -(shapeBounds.height / 2),
      left: -(shapeBounds.width / 2),

      duration: 0,
      ease: "linear",
    });

    gsap.to(shape, {
      position: "fixed",
      x: x,
      y: y,

      duration: 0,
      ease: "linear",
    });
  }
}

function initDropperWalls() {
  let innerW = dropper.offsetWidth;
  let innerH = dropper.offsetHeight;

  let vertexSets = [];

  //Create bounding walls
  //Ceiling
  vertexSets.push(
    Bodies.rectangle(0, -250, innerW * 2, 500, {
      isStatic: true,
      id: "bound-top",
      render: {
        opacity: 0,
        fillStyle: "pink",
      },
    })
  );

  //floor
  vertexSets.push(
    Bodies.rectangle(0, innerH + 250, innerW * 2, 500, {
      isStatic: true,
      id: "bound-bottom",
      restitution: 0,
      render: {
        opacity: 0,
        fillStyle: "orange",
      },
    })
  );

  //Right
  vertexSets.push(
    Bodies.rectangle(innerW + 250, innerH, 500, innerH * 100, {
      isStatic: true,
      id: "bound-right",
      friction: 0,
      render: {
        opacity: 0,
        fillStyle: "blue",
      },
    })
  );

  //Left
  vertexSets.push(
    Bodies.rectangle(-250, innerH, 500, innerH * 100, {
      isStatic: true,
      id: "bound-left",
      friction: 0,
      render: {
        opacity: 0,
        fillStyle: "blue",
      },
    })
  );

  // add all of the bodies to the world
  World.add(world, vertexSets);
}

function initDropperMouse() {
  if (noDropperMouse) {
    // Add mouse control
    // console.log(render.canvas);
    let mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    // Remove default mousewheel event handlers
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    noDropperMouse = false;

    let isAClick = false;
    let clickTimeout;
    let overBody;
    //On mouse down over body- check if the mousedown is a click or hold for clickable elements inside dropper
    //If the user triggers mouse-down and within short period also mouse-ups.. thats a click. If not it is a hold
    Matter.Events.on(mouseConstraint, "mousedown", function (event) {
      //Overbody is body user has clicked
      overBody = Matter.Query.point(world.bodies, event.mouse.position);

      if (overBody[0]) {
        isAClick = true;
        clickTimeout = setTimeout(() => {
          isAClick = false;
        }, 200);
      }
    });

    Matter.Events.on(mouseConstraint, "mouseup", function (event) {
      //If user clicks body
      if (isAClick === true) {
        //Overbody is body user has clicked
        overBody = Matter.Query.point(world.bodies, event.mouse.position)[0];
        let el = document.getElementById(overBody.id);

        if (el.classList.contains("shape")) {
          openCaseStudy(el);
        } else {
          if (el.classList.contains("dropper__gallery__text")) {
            window.open(el.getElementsByTagName("a")[0].href, "_blank");
          }
        }
        isAClick = false;
      }
    });
  }
}

function dropItems() {
  dropped = true;
  // run the engine
  Matter.Runner.run(engine);
  // run the renderer
  Render.run(render);

  //Run the render loop for the image positions
  renderSvg();
  runSvgLoop = true;

  // Need pointer events pre-drop for shapes- remove for ability to throw images
  gsap.to(".dropper__visible__shape", {
    pointerEvents: "none",
  });

  gsap.to(".dropper__visible", {
    marginLeft: 0,
    duration: 4,
  });

  gsap.to(dropper, {
    scrollTrigger: {
      trigger: dropper,
      start: "top bottom",
      end: "bottom top",

      onEnter: () => {
        dropperSleep(false);
      },
      onEnterBack: () => {
        dropperSleep(false);
      },

      onLeave: () => {
        dropperSleep(true);
      },
      onLeaveBack: () => {
        dropperSleep(true);
      },
    },
  });
}

//false- wake, true- sleep
function dropperSleep(stateTo) {
  let bodies = world.bodies;
  runSvgLoop = !stateTo;

  for (let i = 0; i < bodies.length; i++) {
    bodies[i].isSleeping = stateTo;
  }
}

function openCaseStudy(el) {
  let app = document.querySelector("body");
  let appContent = document.querySelector("main");
  let study = document.getElementsByClassName("study")[0];

  // Add images
  let studyImages = study.getElementsByClassName("study__imgs")[0];
  studyImages.children[0].children[0].src = el.dataset.img1;
  studyImages.children[1].children[0].src = el.dataset.img2;
  studyImages.children[2].children[0].src = el.dataset.img3;
  // Check if the second image is complete before triggering the transition
  if (studyImages.children[1].children[0].complete) {
    transitionProxy();
  } else {
    studyImages.children[1].children[0].addEventListener(
      "load",
      transitionProxy
    );
  }

  // Add titles
  let studyInfo = study.getElementsByClassName("study__info")[0];
  studyInfo.children[0].children[0].innerText = el.dataset.title;
  studyInfo.children[1].innerText = el.dataset.subtitle;

  function transitionProxy() {
    if (window.innerWidth < 1000) {
      let wrap = document.getElementsByClassName("study__imgs--wrapper")[0];
      study.style.top = window.pageYOffset + "px"; // Set study position
      wrap.scrollTo(wrap.offsetWidth * 0.85, 0); // Scroll to the right position
      app.classList.add("pre-scr");
      appContent.classList.add("zabove");
    }

    study.classList.add("open");
    document.getElementById("dropper").classList.add("study-open");

    // Add cursor class
    let cursor = document.getElementsByClassName("cursor")[0];
    if (cursor) {
      cursor.classList.add("red");
    }
    let cursorTextCont =
      document.getElementsByClassName("cursor__text__cont")[0];
    if (cursorTextCont) {
      cursorTextCont.classList.add("no-excl");
    }
    let cursorText = document.getElementsByClassName("cursor__text")[0];
    if (cursorText) {
      cursorText.classList.add("show", "red");
    }

    changeCursorText("CLOSE");
  }
}

function initStudy() {
  let study = document.getElementsByClassName("study")[0];
  let app = document.querySelector("body");
  let appContent = document.querySelector("main");

  if (window.innerWidth > 1000) {
    study.addEventListener("click", () => {
      document.getElementsByClassName("cursor")[0].classList.remove("red");
      document
        .getElementsByClassName("cursor__text__cont")[0]
        .classList.remove("no-excl");
      document
        .getElementsByClassName("cursor__text")[0]
        .classList.remove("show");
      document
        .getElementsByClassName("cursor__text")[0]
        .classList.remove("red");
      study.classList.remove("open");
      //   lenis.start();
    });
  } else {
    study
      .getElementsByClassName("study__close")[0]
      .addEventListener("click", () => {
        study.classList.remove("open");
        // lenis.start();
        document.getElementById("dropper").classList.remove("study-open");
        app.classList.remove("pre-scr");
        appContent.classList.remove("zabove");
      });
  }

  // For shapes before drop
  let shapes = document.querySelectorAll(".dropper__visible__shape");
  shapes.forEach((shape) => {
    shape.addEventListener("click", (e) => {
      openCaseStudy(e.target);
    });
  });
}

let resizingDropper;
// For window resizing sizes
function responsiveDropper() {
  if (window.innerWidth > 1000) {
    let iW = window.innerWidth;
    // Dropper bounds
    gsap.to(dropper, {
      width: iW,
      duration: 0,
    });

    render.bounds.max.x = iW;
    render.options.width = iW;
    render.canvas.width = iW;

    clearTimeout(resizingDropper);
    resizingDropper = setTimeout(resizeDropper, 500);
  } else {
    window.location.reload();
  }
}

function resizeDropper() {
  runSvgLoop = false;

  // UN-position fixed everything in dropper
  gsap.to(".dropper__visible, .dropper__visible__shape", {
    position: "unset",
    x: "unset",
    y: "unset",
    duration: 0,
  });

  gsap.to(".dropper__visible__shape", {
    height: "auto",
    width: "auto",
    duration: 0,
  });

  let iW = window.innerWidth;

  let dropperSvgs = dropper.querySelectorAll(".dropper__visible");
  let dropperShapes = dropper.querySelectorAll(".dropper__visible__shape");

  setTimeout(() => {
    let iH = dropper.offsetHeight;

    // Dropper bounds
    gsap.to(dropper, {
      height: iH,
      duration: 0,
    });

    render.bounds.max.y = iH;
    render.options.height = iH;
    render.canvas.height = iH;

    function reSizeDropperShapes(dropperShape) {
      let dropperShapeBounds = dropperShape.getBoundingClientRect();

      let i = [...dropperShapes].indexOf(dropperShape);
      let thisBody = world.bodies[dropperShapes.length - (i + 1)];

      let thisBodyBounds = thisBody.bounds;

      let xDiff =
        dropperShapeBounds.width /
        (thisBodyBounds.max.x - thisBodyBounds.min.x);
      let yDiff =
        dropperShapeBounds.height /
        (thisBodyBounds.max.y - thisBodyBounds.min.y);

      Matter.Body.scale(thisBody, xDiff, yDiff);
      Matter.Body.set(thisBody, {
        inertia: Infinity,
      });
    }

    // If we have dropped- no need to re-position the body elements to initial position
    if (dropped) {
      dropperShapes.forEach((dropperShape) => {
        let dropperShapeBounds = dropperShape.getBoundingClientRect();

        reSizeDropperShapes(dropperShape);

        gsap.to(dropperShape, {
          top: -(dropperShapeBounds.height / 2),
          left: -(dropperShapeBounds.width / 2),
          duration: 0,
          ease: "linear",
        });

        gsap.to(dropperShape, {
          height: dropperShapeBounds.height,
          width: dropperShapeBounds.width,
          duration: 0,
          ease: "linear",
        });
      });
    } else {
      function resizeUndropped(thisBody, el) {
        let elBounds = el.getBoundingClientRect();

        let x = elBounds.x + window.scrollX + elBounds.width / 2;
        let y = elBounds.y + window.scrollY + elBounds.height / 2;

        Matter.Body.set(thisBody, {
          position: { x: x, y: y },
        });

        gsap.to(el, {
          top: -(elBounds.height / 2),
          left: -(elBounds.width / 2),
          x: x,
          y: y,
          duration: 0,
          ease: "linear",
        });

        if (el.classList.contains("dropper__visible__shape")) {
          gsap.to(el, {
            height: elBounds.height,
            width: elBounds.width,

            top: -(elBounds.height / 2),
            left: -(elBounds.width / 2),
            position: "fixed",
            duration: 0,
            ease: "linear",
          });
        }
      }

      dropperSvgs.forEach((dropperSvg) => {
        let thisBody = world.bodies.filter((obj) => {
          return obj.id === dropperSvg.id;
        });

        resizeUndropped(thisBody[0], dropperSvg);
      });

      dropperShapes.forEach((dropperShape) => {
        reSizeDropperShapes(dropperShape);

        let i = [...dropperShapes].indexOf(dropperShape);
        let thisBody = world.bodies[dropperShapes.length - (i + 1)];

        resizeUndropped(thisBody, dropperShape);
      });
    }

    gsap.to(".dropper__visible, .dropper__visible__shape", {
      position: "fixed",
    });

    (function dropperWalls() {
      // Right
      Matter.Body.set(world.bodies[dropperShapes.length + 2], {
        position: { x: iW + 250, y: iH },
        width: 500,
        height: iH * 100,
      });

      // Left
      Matter.Body.set(world.bodies[dropperShapes.length + 3], {
        position: { x: -250, y: iH },
        width: 500,
        height: iH * 100,
      });

      // Ceiling
      Matter.Body.set(world.bodies[dropperShapes.length + 0], {
        position: { x: iW / 2, y: -250 },
        width: iW * 10,
        height: 500,
      });

      // Floor
      Matter.Body.set(world.bodies[dropperShapes.length + 1], {
        position: { x: iW / 2, y: iH + 250 },
        width: iW * 10,
        height: 500,
      });

      // for each body check if it is within the new bounds- if not move back in
      if (dropped) {
        world.bodies.forEach((body) => {
          if (!body.id.includes("bound")) {
            if (body.position.x > iW) {
              Matter.Body.setPosition(body, {
                y: body.position.y,
                x: iW,
              });
            } else if (body.position.x < 0) {
              Matter.Body.setPosition(body, {
                y: body.position.y,
                x: 10,
              });
            }

            if (body.position.y > iH) {
              Matter.Body.setPosition(body, {
                x: body.position.x,
                y: iH,
              });
            } else if (body.position.y < 0) {
              Matter.Body.setPosition(body, {
                x: body.position.x,
                y: 10,
              });
            }
          }
        });

        runSvgLoop = true;
        dropperSleep(false);
      }
    })();

    Matter.Engine.update(engine);
  }, 200);
}

function dropperLoadAni() {
  const hero = document.querySelector(".trsncontainer");
  gsap.to(hero, {
    background: "#111111",
  });
  dropper = document.getElementById("dropper");
  let tl = gsap.timeline();

  if (window.innerWidth > 1000) {
    gsap.to(".dropper__visible", {
      opacity: 0,
      filter: "blur(20px)",
    });

    gsap.to("div.dropper__visible__shape", {
      opacity: 0,
      duration: 0,
    });

    gsap.to("img.dropper__visible__shape", {
      opacity: 0,
      scale: 0.98,
      duration: 0,
    });

    tl.fromTo(
      dropper,
      {
        opacity: 0,
        duration: 0,
      },
      {
        opacity: 1,
        duration: 1.5,
        ease: "Power3.none",
      }
    );
  } else {
    gsap.to(".dropper__letters--mbl__col > img", {
      opacity: 0,
      filter: "blur(20px)",
    });

    gsap.to("div.dropper__visible__shape", {
      opacity: 0,
      duration: 0,
    });

    gsap.to("img.dropper__visible__shape", {
      opacity: 0,
      scale: 0.98,
      duration: 0,
    });

    tl.fromTo(
      dropper,
      {
        opacity: 0,
        duration: 0,
      },
      {
        opacity: 1,
        duration: 1.5,
        ease: "Power3.none",
      }
    );

    gsap.to("div.dropper__visible__shape", {
      opacity: 1,
      duration: 3,
      delay: 1.5,
      ease: "Power3.none",
    });

    gsap.to(".dropper__gallery__text__line__inner", {
      y: 0,
      duration: 0.6,
      delay: 1.6,
      ease: "Power3.ease",
      stagger: 0.15,
    });

    gsap.to("img.dropper__visible__shape", {
      opacity: 1,
      scale: 1,
      duration: 4,
      delay: 1.8,
      ease: "Power3.easeOut",
    });

    let svgs = document.querySelectorAll(".dropper__letters--mbl__col > img");
    svgs = gsap.utils.shuffle([...svgs]);

    svgs.forEach((svg) => {
      let i = svgs.indexOf(svg);

      gsap.to(svg, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "Power3.none",
        delay: i * 0.07 + 0.7,
      });
    });
  }
}
let semiColonResize, semiColonCursor;

let scScrollProg = 0;

// const fun = () => {
//   updateActiveMenu();
//   initScript();
//   if (window.innerWidth > 1000) {
//     dropperInit();
//   }
//   dropperLoadAni();
//   initScript();
//   initStudy();
//   if (window.innerWidth > 1030) {
//     window.cancelAnimationFrame(renderSvgRAF);
//     dropped = false;
//     document.removeEventListener("mousemove", semiColonCursor);
//     Matter.Render.stop(render);
//     Matter.World.clear(engine.world);
//     Matter.Engine.clear(engine);
//     window.removeEventListener("resize", responsiveDropper);
//   }
//   ScrollTrigger.create({
//     trigger: body,
//     start: "top+=50% top+=12.5%",
//     markers: true,
//     backgroundColor: "red",
//   });
//   // transOut();
//   //         // Hide haloLogo elements
//   //         // const haloLogos = document.getElementsByClassName("haloLogo");
//   //         // for (let i = 0; i < haloLogos.length; i++) {
//   //         //   haloLogos[i].style.display = "none";
//   //         // }
//   //         // const menuItems = document.getElementsByClassName(
//   //         //   "mobilenavbar__content--menu--item"
//   //         // );
//   //         // for (let i = 0; i < menuItems.length; i++) {
//   //         //   menuItems[i].classList.remove("active");
//   //         // }
//   //         // Destroy Lenis if applicable
//   //         // lenis.destroy();
//   //         // const done = this.async();
//   //         // setTimeout(() => {
//   //         //   done();
//   //         // }, 1000);
//   //         // document.getElementsByClassName("cursor")[0]?.classList.remove("red");
//   //         // document
//   //         //   .getElementsByClassName("cursor__text")[0]
//   //         //   ?.classList.remove("red");
//   //         // document
//   //         //   .getElementsByClassName("cursor__text__cont")[0]
//   //         //   ?.classList.remove("no-excl");
// };
// fun();

barba.hooks.after(() => {
  // _assets_js_smoothScroll__WEBPACK_IMPORTED_MODULE_4__.scroll.update();
});

// barba.init({
//   sync: true,
//   preventRunning: true,
//   debug: false,
//   transitions: [
//     {
//       name: "default",
//       once(data) {
//         updateActiveMenu();
//         initStudy();
//         if (window.innerWidth > 1000) {
//           dropperInit();
//           initScript();
//         }
//         dropperLoadAni();
//       },
//       leave() {
//         // transOut();
//         // Hide haloLogo elements
//         // const haloLogos = document.getElementsByClassName("haloLogo");
//         // for (let i = 0; i < haloLogos.length; i++) {
//         //   haloLogos[i].style.display = "none";
//         // }
//         // const menuItems = document.getElementsByClassName(
//         //   "mobilenavbar__content--menu--item"
//         // );
//         // for (let i = 0; i < menuItems.length; i++) {
//         //   menuItems[i].classList.remove("active");
//         // }
//         // Destroy Lenis if applicable
//         // lenis.destroy();
//         // const done = this.async();
//         // setTimeout(() => {
//         //   done();
//         // }, 1000);
//         document.getElementsByClassName("cursor")[0]?.classList.remove("red");
//         document
//           .getElementsByClassName("cursor__text")[0]
//           ?.classList.remove("red");
//         document
//           .getElementsByClassName("cursor__text__cont")[0]
//           ?.classList.remove("no-excl");
//       },
//       afterLeave() {
//         // Purges recurring scripts from the collective page
//         if (window.innerWidth > 1030) {
//           window.cancelAnimationFrame(renderSvgRAF);
//           dropped = false;
//           document.removeEventListener("mousemove", semiColonCursor);
//           Matter.Render.stop(render);
//           Matter.World.clear(engine.world);
//           Matter.Engine.clear(engine);
//           window.removeEventListener("resize", responsiveDropper);
//         }
//       },
//       beforeEnter() {
//         // const triggers = ScrollTrigger.getAll();
//         // triggers.forEach((trigger) => {
//         //   trigger.kill();
//         // });
//         // Destroy Lenis if applicable
//         // lenis.destroy();
//       },
//       enter() {
//         // You can add any enter-specific logic here
//       },
//       after() {
//         // updateActiveMenu();

//         setTimeout(() => {
//           // initScript();
//           // initStudy();

//           if (window.innerWidth > 1000) {
//             // dropperInit();
//             // setTimeout(() => {
//             //   // lenis.update(); // Uncomment if necessary
//             // }, 1000);
//           }
//           // dropperLoadAni();
//         }, 1000);
//       },
//     },
//   ],
// });
// Scroll event listener

// ################ end barba.js ##################

barba.init({
  sync: true,
  preventRunning: true,
  debug: false,
  debug: true,
  transitions: [
    {
      name: "default",
      once(data) {
        updateActiveMenu();
        if (data.next.namespace === "collective") {
          initStudy();
          if (window.innerWidth > 1000) {
            dropperInit();
          }
          dropperLoadAni();
        }

        initScript();
      },
      leave({ current, next, trigger }) {
        // transOut();
        // $(".haloLogo").hide();
        // $(".mobilenavbar__content--menu--item").removeClass("active");
        // _assets_js_smoothScroll__WEBPACK_IMPORTED_MODULE_4__.scroll.destroy();
        // const done = this.async();
        // setTimeout(function () {
        //   done();
        // }, 1000);
        // document.getElementsByClassName("cursor")[0].classList.remove("red");
        // document
        //   .getElementsByClassName("cursor__text")[0]
        //   .classList.remove("red");
        // document
        //   .getElementsByClassName("cursor__text__cont")[0]
        //   .classList.remove("no-excl");
      },
      afterLeave({ current, next, trigger }) {
        // Purges recurring scripts from the collective page
        if (current.namespace === "collective" && window.innerWidth > 1030) {
          window.cancelAnimationFrame(renderSvgRAF);
          dropped = false;

          // document.removeEventListener("mousemove", semiColonCursor);
          Matter.Render.stop(render);
          Matter.World.clear(engine.world);
          Matter.Engine.clear(engine);

          window.removeEventListener("resize", responsiveDropper, {
            passive: true,
          });
        }
      },
      beforeEnter({ current, next, trigger }) {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          trigger.kill();
        });

        lenis.destroy();
      },
      enter({ current, next, trigger }) {
        // const videos = document.querySelectorAll(".v_autoplay");
        // videos.forEach((video) => {
        //   video.play();
        // });
      },
      after({ current, next, trigger }) {
        updateActiveMenu();
        lenis.stop();
        setTimeout(function () {
          lenis.stop();
          // Initialize Lenis at the top of your JavaScript file
          const lenis = new Lenis({
            duration: 0.2,
            easing: (t) => t,
            orientation: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
          });

          // Animation frame for Lenis
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }

          requestAnimationFrame(raf);
          initScript();
          // if ($(".homehero").length > 0) {
          //   $(".haloLogo").show();
          // }
          if (next.namespace === "collective") {
            initStudy();
            if (window.innerWidth > 1000) {
              dropperInit();
              setTimeout(() => {
                lenis.update();
              }, 1000);
            }
            // initSemiColon();
            // initTickerTape();
            dropperLoadAni();
          }

          // imagesLoaded(
          //   document.querySelector(".wrapper"),
          //   { background: true },
          //   function () {
          //     Promise.all([
          //       silk.load(null, 6000),
          //       helvNeue.load(null, 6000),
          //     ]).then(
          //       function () {
          //         lenis.update();
          //         ScrollTrigger.refresh();
          //         transIn();
          //       },
          //       function () {
          //         lenis.update();
          //         ScrollTrigger.refresh();
          //         transIn();
          //       }
          //     );
          //   }
          // );
        }, 1000);
      },
    },
  ],
});

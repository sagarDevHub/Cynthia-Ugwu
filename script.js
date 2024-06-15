const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

let firstPageAnimation = () => {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
};

var timeOut;

let circleMouseFollower = (xScale, yScale) => {
  window.addEventListener("mousemove", (dets) => {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`;
  });
};

let flatCircle = () => {
  var xScale = 1;
  var yScale = 1;
  var xPrevoius = 0;
  var yPrevoius = 0;
  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeOut);
    var xDifference = dets.clientX - xPrevoius;
    var yDifference = dets.clientY - yPrevoius;

    xScale = gsap.utils.clamp(0.8, 1.2, xDifference);
    yScale = gsap.utils.clamp(0.8, 1.2, yDifference);

    xPrevoius = dets.clientX;
    yPrevoius = dets.clientY;

    circleMouseFollower(xScale, yScale);

    timeOut = setTimeout(() => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
};

document.querySelectorAll(".elem").forEach((elem) => {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mousemove", (dets) => {
    var diffY = dets.clientY - elem.getBoundingClientRect().top;
    var diffX = dets.clientX - elem.getBoundingClientRect().left;

    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      display: "block",
      ease: "power2.out",
      top: diffY,
      left: diffX,
      duration: 0.3,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });

  elem.addEventListener("mouseleave", () => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      display: "none",
      ease: "power2.inOut",
      duration: 0.3,
    });
  });
});

flatCircle();
circleMouseFollower();
firstPageAnimation();

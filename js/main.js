let links = document.querySelectorAll(".navbar-nav .nav-link"); // Select All links in Header
console.log(links);
let sections = document.querySelectorAll("section"); // Select All sections in HTML File
// Determine Section On Scroll And Change
// link Class active According to The textContent of The Section
window.onscroll = function () {
  let scrollPosition = document.documentElement.scrollTop;
  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop - 200 &&
      scrollPosition <= section.offsetHeight + section.offsetTop
    ) {
      links.forEach((link) => {
        if (section.classList.contains("landing")) {
          removeClass(links);
          addClass(links[0]);
        } else if (section.classList.contains(link.textContent.toLowerCase())) {
          removeClass(links);
          addClass(link);
        }
      });
    }
  });
};
function removeClass(links) {
  links.forEach((ele) => {
    ele.classList.remove("active");
  });
}
function addClass(link) {
  link.classList.add("active");
}
// ------------------------------------Global Animate Content Function------------------------------------
function animateContent(parent, ...childs) {
  window.addEventListener("scroll", function () {
    if (window.scrollY >= parent.offsetTop - 300) {
      childs.forEach((ele) => {
        let arr = Array.from(ele);
        if (arr.length === 0) {
          ele.style.cssText = `opacity:1;transform:translate(0,0) scale(1);`;
        } else {
          arr.forEach((element) => {
            element.style.cssText = `opacity:1;transform:translate(0,0) scale(1);`;
          });
        }
      });
    }
  });
}
// Nav Section
let navBar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    navBar.style.backgroundColor = "#1c1c1c";
  } else {
    navBar.style.backgroundColor = "transparent";
  }
})
// About Section
let aboutSection = document.querySelector(".about");
let aboutBoxes = document.querySelectorAll(".about .fade-in");
animateContent(aboutSection, aboutBoxes);
// Story Section
let storySection = document.querySelector(".story");
let storyBoxLeft = document.querySelector(".story .fade-left");
let storyProgressesBar = document.querySelectorAll(".story .progress-bar");
let storySpans = document.querySelectorAll(".story p span");
console.log(storyProgressesBar);
animateContent(storySection, storyBoxLeft);

window.addEventListener("scroll", () => {
  if (window.scrollY > storySection.offsetTop - 300) {
    storyProgressesBar.forEach((progress) => {
      progress.style.width = progress.dataset.progress;
      storySpans.forEach((span) => {
        span.style.left = span.dataset.width;
      })
    })
  }
})
// Statistics Section
let statisicsSection = document.querySelector(".statistics");
let statisicsSpans = document.querySelectorAll(".statistics .row span");
let interval = 50;
let counter;
window.addEventListener("scroll", () => {
  if (window.scrollY > statisicsSection.offsetTop - 300) {
    statisicsSpans.forEach((ele) => {
      const updateCount = () => {
        let target = +ele.dataset.target;
        let currentNum = parseInt(ele.innerText);
        let inc = target / interval;
        if (currentNum < target) {
          ele.innerText = Math.floor(currentNum + inc);
          counter = setTimeout(updateCount, 1);
        } else {
          ele.innerText = target.toLocaleString();
          clearInterval(counter);
        }
      }
      updateCount();
    })
  }
})
// Team Section
let teamSection = document.querySelector(".team");
let teamCards = document.querySelectorAll(".team .fade-in");
animateContent(teamSection, teamCards);
// ---------------------- portfolio Section------------------------------
let portfolioSection = document.querySelector(".portfolio");
let portfolioLi = document.querySelectorAll(".portfolio li");
let portfolioBoxes = document.querySelectorAll(".portfolio .main-box");
let portfolioLink = document.querySelector(".portfolio a");

animateContent(portfolioSection, portfolioBoxes);

portfolioLi.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    portfolioLi.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// When Li clicked filterFuntion Will Take li And Work On It
portfolioLi.forEach((li) => {
  li.addEventListener("click", function (e) {
    filterFunction(e.target);
  });
});

let filterFunction = function (li) {
  if (li.textContent !== "All") {
    portfolioBoxes.forEach((box) => {
      if (box.dataset.category === li.dataset.filter) {
        box.style.display = `block`;
      } else {
        box.style.display = `none`;
      }
    });
  } else {
    portfolioBoxes.forEach((box) => {
      box.style.display = `block`;
    });
  }
};
// Add Numbers Of Products To Before Pesudo Element In Html for li Element
portfolioLi.forEach((li) => {
  let productsNumber = +li.dataset.products;
  portfolioBoxes.forEach((box) => {
    if (box.dataset.category === li.dataset.filter) {
      productsNumber += 1;
      li.dataset.products = productsNumber;
    }
  })
})
// Change Link Text On Click
portfolioLink.addEventListener("click", (e) => {
  e.target.textContent = "Loading";
})
// Price Section
let priceSection = document.querySelector(".price");
let priceBoxes = document.querySelectorAll(".price .fade-in");
animateContent(priceSection, priceBoxes);
let slider = document.querySelectorAll(".second-slider");
let innerSlider = document.querySelectorAll(".slider-inner");

slider.forEach((slider) => {
  innerSlider.forEach((innerSlider) => {
    let pressed = false;
    let startx;

    slider.addEventListener("mousedown", (e) => {
      pressed = true;
      startx = e.offsetX - innerSlider.offsetLeft;
      innerSlider.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", (e) => {
      pressed = false;
    });

    slider.addEventListener("mousemove", (e) => {
      if (!pressed) return;
      e.preventDefault();
      innerSlider.style.left = `${e.offsetX - startx}px`;
      checkBounding();
    });

    function checkBounding() {
      let outer = slider.getBoundingClientRect();
      let inner = innerSlider.getBoundingClientRect();

      if (parseInt(innerSlider.style.left) > 0) {
        innerSlider.style.left = 0;
      } else if (inner.right < outer.width) {
        innerSlider.style.left = `-${inner.width - outer.width}px`;
      }
    }
  });
});

//# sourceMappingURL=main.js.map

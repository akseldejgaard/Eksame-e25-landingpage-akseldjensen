// ===============================
// LUMINA ONE - JAVASCRIPT
// Opryddet og sektioneret til aflevering
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  /* -----------------------------------
     SLIDEBAR NAVIGATION (Interaktiv scroll)
     ----------------------------------- */
  // Gør slidebar-knapper interaktive med smooth scroll
  const slidebarBtns = document.querySelectorAll(".slidebar-btn");
  const scrollTargets = [
    () => document.body, // Forside
    () => document.querySelector(".spec-img-tagdenmed"), // Specifikationer
    () => document.querySelector(".colors h2"), // Farver
    () => document.querySelector(".reviews h2"), // Review
    () => document.querySelector(".newsletter h2"), // Nyhedsbrev
  ];
  slidebarBtns.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      slidebarBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = scrollTargets[i]();
      if (target) {
        let y = target.getBoundingClientRect().top + window.pageYOffset;
        if (i !== 0) y -= i === 4 ? 220 : 110;
        const startY = window.pageYOffset;
        const diff = y - startY;
        const duration = 500;
        let start;
        function easeInOut(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        function step(timestamp) {
          if (!start) start = timestamp;
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeInOut(progress);
          window.scrollTo(0, startY + diff * eased);
          if (elapsed < duration) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
      }
    });
  });

  /* -----------------------------------
     ANMELDELSER / REVIEWS (Automatisk carousel)
     ----------------------------------- */
  // Skifter automatisk mellem anmeldelser i review-sektionen
  const reviews = [
    "Fantastisk lyd og virkelig nem at sætte op. Bedste køb i år!",
    "Overraskende kraftig bas for størrelsen. Den fylder hele stuen med lyd.",
    "Designet er spot on. Passer perfekt ind i mit hjem, og lyden er klar som glas.",
    "Batteriet holder imponerende længe. Jeg bruger den hver dag uden problemer.",
    "Jeg blev anbefalet den af en ven – nu forstår jeg hvorfor. Den er simpelthen genial.",
  ];
  let reviewIndex = 0;
  const reviewText = document.getElementById("review-text");
  function showReview(idx) {
    if (!reviewText) return;
    reviewText.style.transition = "opacity 0.3s";
    reviewText.style.opacity = 0;
    setTimeout(() => {
      reviewText.textContent = '"' + reviews[idx] + '"';
      reviewText.style.opacity = 1;
    }, 200);
  }
  if (reviewText) {
    setInterval(function () {
      reviewIndex = (reviewIndex + 1) % reviews.length;
      showReview(reviewIndex);
    }, 5000);
    showReview(reviewIndex);
  }

  /* -----------------------------------
     FARVEKORT / COLOR CARDS (Skift variant)
     ----------------------------------- */
  // Skift farvevariant på højtalerkortet
  const colorData = {
    rose: {
      cardClass: "color-card-rose",
      img: "https://www.figma.com/api/mcp/asset/2f61dea6-47ed-4e7e-90ec-df487a80c0fd",
      alt: "Rose Speaker",
    },
    sage: {
      cardClass: "color-card-sage",
      img: "https://www.figma.com/api/mcp/asset/7d49373a-279e-4eab-b6b5-a04f825d9df8",
      alt: "Sage Green Speaker",
    },
    lavender: {
      cardClass: "color-card-lavender",
      img: "https://www.figma.com/api/mcp/asset/2db0f2b0-0d0d-445e-88f3-a93f6e4238ff",
      alt: "Lavender Speaker",
    },
    gold: {
      cardClass: "color-card-gold",
      img: "https://www.figma.com/api/mcp/asset/813d780f-bf27-4f57-971c-e71e6da6ca3c",
      alt: "Gold Speaker",
    },
  };
  const card = document.getElementById("color-card-active");
  const img = document.getElementById("color-card-img");
  const dots = document.querySelectorAll(".color-card-dots .dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const color = this.getAttribute("data-color");
      card.className = "color-card " + colorData[color].cardClass;
      img.src = colorData[color].img;
      img.alt = colorData[color].alt;
      dots.forEach((d) => d.classList.remove("active"));
      this.classList.add("active");
    });
  });

  /* -----------------------------------
     HEADER IKONER (Kurv & Profil hover-effekt)
     ----------------------------------- */
  // Skifter ikon ved hover på kurv og profil
  var cartIcon = document.getElementById("cart-icon");
  var profileIcon = document.getElementById("profile-icon");
  if (cartIcon) {
    var cartDefault =
      "https://www.figma.com/api/mcp/asset/adb7aa1d-02b4-48e7-93c8-cdf1821a8829";
    var cartHover =
      "https://www.figma.com/api/mcp/asset/882deb2f-2c52-4225-a39a-4bf78ee51f0c";
    cartIcon.addEventListener("mouseenter", function () {
      cartIcon.src = cartHover;
    });
    cartIcon.addEventListener("mouseleave", function () {
      cartIcon.src = cartDefault;
    });
  }
  if (profileIcon) {
    var profileDefault =
      "https://www.figma.com/api/mcp/asset/e6352511-1956-4cea-9e88-0b9b145c69e5";
    var profileHover =
      "https://www.figma.com/api/mcp/asset/bfca4e3b-37f1-45ad-af71-b432429e431e";
    profileIcon.addEventListener("mouseenter", function () {
      profileIcon.src = profileHover;
    });
    profileIcon.addEventListener("mouseleave", function () {
      profileIcon.src = profileDefault;
    });
  }

  /* -----------------------------------
     NYHEDSBREV (Formular tilmelding)
     ----------------------------------- */
  // Viser besked ved tilmelding til nyhedsbrev
  var form = document.querySelector(".newsletter form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Tak for din tilmelding til club LUMINA!");
      form.reset();
    });
  }
});

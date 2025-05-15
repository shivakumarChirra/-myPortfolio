const user = "chirrashivakumar5";
const domain = "gmail.com";

const email = `${user}@${domain}`;
const subject = "Hello from the site";
const body = "Hi, I’d like to connect.";

const link = `<a href="mailto:${email}?subject=${encodeURIComponent(
  subject
)}&body=${encodeURIComponent(body)}" class="email-button">Email Me</a>`;

// Update all instances
document.querySelectorAll(".email-link").forEach((el) => {
  el.innerHTML = link;
});

// Close the dropdown on scroll

function toggleDropdown(button) {
  const dropdown = document.getElementById("dropdownLinks");
  button.classList.toggle("active");
  dropdown.classList.toggle("open");
}

window.addEventListener("scroll", () => {
  const button = document.querySelector(".hamburger-btn");
  const dropdown = document.getElementById("dropdownLinks");

  if (dropdown.classList.contains("open")) {
    dropdown.classList.remove("open");
    button.classList.remove("active");
  }
});

document.querySelectorAll(".dropdown-links a").forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
      );
    }, 10);
  });
});

// app opening style

let currentExpanded = null;

function expandCard(card) {
  if (currentExpanded && currentExpanded !== card) {
    currentExpanded.classList.remove("expanded");
  }

  card.classList.toggle("expanded");
  currentExpanded = card.classList.contains("expanded") ? card : null;

  document.getElementById("overlay").style.display = currentExpanded
    ? "block"
    : "none";
  document.body.style.overflow = currentExpanded ? "hidden" : "";
}

// Close on overlay click
function closeExpandedCard() {
  if (currentExpanded) {
    currentExpanded.classList.remove("expanded");
    currentExpanded = null;
  }
  document.getElementById("overlay").style.display = "none";
  document.body.style.overflow = "";
}

// Close on scroll
window.addEventListener("scroll", () => {
  if (currentExpanded) {
    closeExpandedCard();
  }
});

window.addEventListener(
  "wheel",
  () => {
    if (currentExpanded) {
      closeExpandedCard();
    }
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  () => {
    if (currentExpanded) {
      closeExpandedCard();
    }
  },
  { passive: true }
);

// herosection
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// video

// Hover-play & pause
const hoverVideos = document.querySelectorAll(".hover-video");

hoverVideos.forEach((video) => {
  video.addEventListener("mouseenter", () => video.play());
  video.addEventListener("mouseleave", () => video.pause());

  // Stop if scrolled out of view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) video.pause();
    });
  });
  observer.observe(video);
});

// Expand fullscreen
function expandVideo(container) {
  const expandedCard = container
    .closest(".app-card")
    .querySelector(".video-expanded");
  const fullVideo = expandedCard.querySelector(".expanded-video");
  fullVideo.currentTime = 0;
  expandedCard.style.display = "flex";
  fullVideo.play();
}

// Close fullscreen
function closeExpanded(btn) {
  const expandedCard = btn.closest(".video-expanded");
  const fullVideo = expandedCard.querySelector(".expanded-video");
  fullVideo.pause();
  expandedCard.style.display = "none";
}

/**
 * ========================================================
 * WEDDING INVITATION CREATIVE INTERACTIVE SCRIPT
 * Double Waleema: Mohamed Shazni & Mohamed Shukry
 * Saturday, 26th December 2026 | 8:00 PM
 * Islamic Cultural Hall, Gampola, Kandy
 * Inkspire Prints & Dimension
 * ========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const royalOpener = document.getElementById("royalOpener");
  const unveilButton = document.getElementById("unveilButton");
  const gateLeft = document.getElementById("gateLeft");
  const gateRight = document.getElementById("gateRight");
  const bgMusic = document.getElementById("bgMusic");
  const audioBarContainer = document.getElementById("audioBarContainer");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const musicBtnText = document.getElementById("musicBtnText");

  // Countdown Elements
  const daysVal = document.getElementById("daysVal");
  const hoursVal = document.getElementById("hoursVal");
  const minutesVal = document.getElementById("minutesVal");
  const secondsVal = document.getElementById("secondsVal");
  const statusMessage = document.getElementById("statusMessage");

  // Calendar & Share Elements
  const addToCalBtn = document.getElementById("addToCalBtn");
  const shareInviteBtn = document.getElementById("shareInviteBtn");

  // Guestbook Elements
  const guestbookForm = document.getElementById("guestbookForm");
  const guestName = document.getElementById("guestName");
  const guestMessage = document.getElementById("guestMessage");
  const blessingsBoard = document.getElementById("blessingsBoard");
  const tagButtons = document.querySelectorAll(".tag-btn");

  // ========================================================
  // 1. PARTICLES ENGINE (BURGUNDY ROSE PETALS & GOLD DUST)
  // ========================================================
  const canvas = document.getElementById("particlesCanvas");
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const TOTAL_PARTICLES = window.innerWidth < 768 ? 40 : 75;

  class Particle {
    constructor(isBurst = false) {
      this.reset(isBurst);
    }

    reset(isBurst = false) {
      this.x = isBurst ? width / 2 + (Math.random() - 0.5) * 220 : Math.random() * width;
      this.y = isBurst ? height / 2 + (Math.random() - 0.5) * 160 : Math.random() * -height;
      this.size = Math.random() * 8 + 4;
      this.speedX = isBurst ? (Math.random() - 0.5) * 9 : Math.random() * 1.5 - 0.75;
      this.speedY = isBurst ? (Math.random() - 0.5) * 9 : Math.random() * 1.6 + 0.8;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 2;
      this.type = Math.random() > 0.4 ? "petal" : "goldDust";
      this.color =
        this.type === "petal"
          ? Math.random() > 0.5
            ? "rgba(102, 12, 33, 0.75)" // Deep Burgundy
            : "rgba(130, 18, 44, 0.65)" // Wine Crimson
          : "rgba(212, 175, 55, 0.85)"; // Champagne Gold
      this.opacity = Math.random() * 0.7 + 0.3;
    }

    update() {
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.type === "petal") {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 1.8, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = this.color;
        ctx.shadowColor = "#d4af37";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  function triggerBurst() {
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(true));
    }
  }

  // ========================================================
  // 2. 3D PALACE GATES UNVEIL EXPERIENCE
  // ========================================================
  let isOpened = false;

  function unveilInvitation() {
    if (isOpened) return;
    isOpened = true;

    // Trigger seal burst
    unveilButton.style.transform = "translate(-50%, -50%) scale(0.6)";
    unveilButton.style.opacity = "0";
    unveilButton.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

    // Swing open 3D Palace Gates
    if (gateLeft) gateLeft.classList.add("open");
    if (gateRight) gateRight.classList.add("open");

    // Particle explosion
    triggerBurst();

    // Start background music
    startMusic();

    // Fade out opener after gates open
    setTimeout(() => {
      royalOpener.classList.add("revealed");
      document.body.classList.remove("invitation-locked");
      audioBarContainer.classList.add("visible");
    }, 1000);
  }

  unveilButton.addEventListener("click", unveilInvitation);

  // ========================================================
  // 3. BACKGROUND MUSIC TOGGLE & CONTROLS
  // ========================================================
  let isPlaying = false;

  function startMusic() {
    bgMusic.volume = 0;
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          updateMusicUI(true);
          // Fade volume up smoothly
          let vol = 0;
          const fadeInterval = setInterval(() => {
            if (vol < 0.65) {
              vol += 0.05;
              bgMusic.volume = Math.min(vol, 0.65);
            } else {
              clearInterval(fadeInterval);
            }
          }, 80);
        })
        .catch((err) => {
          console.warn("Audio autoplay blocked or requires interaction:", err);
          updateMusicUI(false);
        });
    }
  }

  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      updateMusicUI(false);
    } else {
      bgMusic.play();
      isPlaying = true;
      updateMusicUI(true);
    }
  }

  function updateMusicUI(playing) {
    if (playing) {
      musicToggleBtn.classList.add("playing");
      musicToggleBtn.setAttribute("aria-pressed", "true");
      musicBtnText.textContent = "Music On";
    } else {
      musicToggleBtn.classList.remove("playing");
      musicToggleBtn.setAttribute("aria-pressed", "false");
      musicBtnText.textContent = "Music Off";
    }
  }

  musicToggleBtn.addEventListener("click", toggleMusic);

  // ========================================================
  // 4. AUSPICIOUS LIVE COUNTDOWN TIMER
  // Target: Saturday, 26th December 2026, 8:00 PM (20:00) Sri Lanka Time (UTC+05:30)
  // ========================================================
  const targetDate = new Date("2026-12-26T20:00:00+05:30").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysVal.textContent = "00";
      hoursVal.textContent = "00";
      minutesVal.textContent = "00";
      secondsVal.textContent = "00";
      statusMessage.textContent = "The Blessed Celebration Has Commenced! May Allah Bless Both Couples!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysVal.textContent = String(days).padStart(3, "0");
    hoursVal.textContent = String(hours).padStart(2, "0");
    minutesVal.textContent = String(minutes).padStart(2, "0");
    secondsVal.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ========================================================
  // 5. CALENDAR (.ICS) FILE GENERATOR
  // ========================================================
  if (addToCalBtn) {
    addToCalBtn.addEventListener("click", () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Inkspire Prints//Wedding Celebration//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:waleema-shazni-shukry-20261226@inkspireprints.lk",
        "DTSTAMP:20261116T000000Z",
        "DTSTART:20261226T143000Z",
        "DTEND:20261226T183000Z",
        "SUMMARY:Waleema Ceremony: Mohamed Shazni & Mohamed Shukry",
        "DESCRIPTION:A Sacred Double Celebration: Waleema Ceremony of Mr. & Mrs. Mohamed Shazni and Mr. & Mrs. Mohamed Shukry.\\nSon of Mr. & Mrs. Al Haj & Hajiyani Mohamed Shareef.\\n\\nVenue: Islamic Cultural Hall, Gampola, Kandy, Sri Lanka.\\nTime: 8:00 PM Onwards.",
        "LOCATION:Islamic Cultural Hall, Gampola, Kandy, Sri Lanka",
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "BEGIN:VALARM",
        "TRIGGER:-PT24H",
        "ACTION:DISPLAY",
        "DESCRIPTION:Reminder: Waleema Ceremony of Mohamed Shazni & Mohamed Shukry tomorrow",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "Waleema-Mohamed-Shazni-and-Mohamed-Shukry.ics");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ========================================================
  // 6. SHARE INVITATION (WEB SHARE API WITH FALLBACK)
  // ========================================================
  if (shareInviteBtn) {
    shareInviteBtn.addEventListener("click", async () => {
      const shareData = {
        title: "Waleema Ceremony: Mohamed Shazni & Mohamed Shukry",
        text: "You are cordially invited to celebrate the Waleema Ceremony of Mr. & Mrs. Mohamed Shazni and Mr. & Mrs. Mohamed Shukry on Saturday, 26th December 2026 at Islamic Cultural Hall, Gampola, Kandy.",
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== "AbortError") {
            copyShareUrl();
          }
        }
      } else {
        copyShareUrl();
      }
    });
  }

  function copyShareUrl() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Invitation link copied to clipboard! You can now send it to family and friends.");
      })
      .catch(() => {
        prompt("Copy this invitation link to share:", window.location.href);
      });
  }

  // ========================================================
  // 7. INTERACTIVE VIRTUAL GUESTBOOK & BLESSINGS WALL
  // ========================================================
  const defaultBlessings = [
    {
      author: "Haji M. Rizvi & Family",
      message: "Barakallahu Lakuma Wa Baraka 'Alaykuma! Heartiest felicitations to our dear Mohamed Shareef Bhai on this glorious double celebration of Shazni and Shukry. May Allah bless both homes with unending happiness.",
      time: "Just now",
    },
    {
      author: "Kaja Rauff & Relatives",
      message: "May Allah unite both couples in supreme love, wisdom, peace, and abundance. An immensely joyous night for our families in Gampola!",
      time: "A moment ago",
    },
  ];

  function loadBlessings() {
    const saved = localStorage.getItem("shazni_shukry_blessings");
    let blessings = defaultBlessings;
    if (saved) {
      try {
        blessings = JSON.parse(saved);
      } catch (e) {
        blessings = defaultBlessings;
      }
    }
    renderBlessings(blessings);
  }

  function renderBlessings(blessings) {
    blessingsBoard.innerHTML = "";
    blessings.slice().reverse().forEach((b) => {
      const card = document.createElement("div");
      card.className = "blessing-card";
      card.innerHTML = `
        <div class="blessing-header">
          <strong class="blessing-author">${escapeHtml(b.author)}</strong>
          <span class="blessing-time">${escapeHtml(b.time || "Recently")}</span>
        </div>
        <p class="blessing-text">“${escapeHtml(b.message)}”</p>
      `;
      blessingsBoard.appendChild(card);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Preset tag buttons
  tagButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tagButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      guestMessage.value = btn.getAttribute("data-msg");
    });
  });

  // Handle Form Submit
  if (guestbookForm) {
    guestbookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = guestName.value.trim();
      const message = guestMessage.value.trim();

      if (!author || !message) return;

      const newBlessing = {
        author,
        message,
        time: "Just now",
      };

      const saved = localStorage.getItem("shazni_shukry_blessings");
      let blessings = defaultBlessings;
      if (saved) {
        try {
          blessings = JSON.parse(saved);
        } catch (err) {
          blessings = defaultBlessings;
        }
      }

      blessings.push(newBlessing);
      localStorage.setItem("shazni_shukry_blessings", JSON.stringify(blessings));
      renderBlessings(blessings);

      // Reset form
      guestName.value = "";
      guestMessage.value = "";
      tagButtons.forEach((b) => b.classList.remove("active"));

      // Trigger celebration burst
      triggerBurst();

      alert("Jazakallahu Khair! Your blessing has been posted to the wall.");
    });
  }

  loadBlessings();

  // ========================================================
  // 8. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ========================================================
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
});

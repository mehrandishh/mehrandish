
  
  // ---------- اسکرول نرم ---------- //
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ---------- شمارش معکوس مسابقه ---------- //
  function countdownToEvent(targetDate, elementId) {
    const countdown = document.getElementById(elementId);
    if (!countdown) return;
  
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
  
      if (distance < 0) {
        countdown.innerHTML = "رویداد آغاز شده!";
        clearInterval(interval);
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      countdown.innerHTML = `${days} روز ${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه`;
    }, 1000);
  }
  
  // مثال: شمارش معکوس تا 15 خرداد 1404
  countdownToEvent("2025-06-05T08:00:00", "event-countdown");

  
  // فیلتر برنامه‌ها
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
  
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
  
      document.querySelectorAll('.program-card').forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // انتخاب سیارات و پنجره اطلاعات
const planets = document.querySelectorAll('.planet');
const infoBox = document.getElementById('planetInfo');
const infoTitle = document.getElementById('infoTitle');
const infoText = document.getElementById('infoText');
const infoCTA = document.getElementById('infoCTA');

let activePlanet = null;

// کلیک روی هر سیاره
planets.forEach(planet => {
  planet.addEventListener('click', () => {
    const title = planet.getAttribute('data-title');
    const info = planet.getAttribute('data-info');
    const cta = planet.getAttribute('data-cta');

    // اگر همون سیاره مجدد کلیک شد، پنجره رو ببند
    if (activePlanet === planet) {
      infoBox.style.display = 'none';
      activePlanet = null;
      return;
    }

    // نمایش اطلاعات
    infoTitle.textContent = title;
    infoText.textContent = info;
    infoCTA.textContent = cta;

    // لینک CTA را به فرم تماس وصل کنیم
    infoCTA.setAttribute('href', '#contact');

    infoBox.style.display = 'block';
    activePlanet = planet;
  });
});

// کلیک بیرون از سیاره برای بستن پنجره اطلاعات
document.addEventListener('click', (e) => {
  if (
    activePlanet &&
    !e.target.closest('.planet') &&
    !e.target.closest('#planetInfo')
  ) {
    infoBox.style.display = 'none';
    activePlanet = null;
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".neo-card");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // فقط یکبار نمایش
        }
      });
    }, {
      threshold: 0.1
    });
  
    cards.forEach(card => {
      observer.observe(card);
    });
  });

  // Chatbot toggle
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotClose = document.getElementById("chatbot-close");

chatbotToggle.addEventListener("click", () => {
  chatbotBox.classList.toggle("hidden");
});

chatbotClose.addEventListener("click", () => {
  chatbotBox.classList.add("hidden");
});

// Chatbot behavior
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotBody = document.querySelector(".chatbot-body");

chatbotSend.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = chatbotInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  chatbotInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(text);
    appendMessage("bot", reply);
  }, 500);
}

function appendMessage(type, text) {
  const msg = document.createElement("div");
  msg.classList.add("chatbot-message", type);
  msg.innerText = text;
  chatbotBody.appendChild(msg);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Simple chatbot responses
function getBotReply(input) {
  input = input.toLowerCase();

  if (input.includes("کلاس") || input.includes("برنامه")) {
    return "ما کلاس‌های متنوعی داریم مثل رباتیک، چرتکه، مهارت‌های زندگی و برنامه‌نویسی. کدوم برات جالبه؟";
  }
  if (input.includes("ثبت") || input.includes("ثبت‌نام") || input.includes("زمان")) {
    return "برای ثبت‌نام می‌تونی به بخش «تماس با ما» بری یا شماره‌ات رو بهم بدی تا راهنمایی‌ات کنیم.";
  }
  if (input.includes("سلام") ) return "سلام دوست خوبم! چطور می‌تونم کمکت کنم؟ 😊";
  if (input.includes("مکان") || input.includes("کجاست")) return "ما در رشت، خیابان ۸۷ گلسار هستیم. خوشحال می‌شیم ببینیمت!";
  return "سوالت رو دقیق‌تر بپرس لطفاً، یا بهت شماره‌ی پشتیبان بدم؟ 📞";
}


// نمایش و بستن پاپ‌آپ همکاری
function openPartnerPopup() {
    document.getElementById("partnerPopup").style.display = "flex";
  }
  function closePartnerPopup() {
    document.getElementById("partnerPopup").style.display = "none";
  }
  
  // ارسال اطلاعات فرم به ایمیل (via FormSubmit)
  document.getElementById("partnerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const form = e.target;
    const data = new FormData(form);
    const actionURL = "https://formsubmit.co/mehrab.amouei@example.com"; // ایمیل خودت رو وارد کن
  
    fetch(actionURL, {
      method: "POST",
      body: data
    })
      .then(response => {
        alert("✅ فرم همکاری با موفقیت ارسال شد. با شما تماس خواهیم گرفت.");
        form.reset();
        closePartnerPopup();
      })
      .catch(error => {
        alert("❌ ارسال با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
      });
  });
  
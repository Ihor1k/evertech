const headers = document.querySelectorAll('.accordion-header');


  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('active');

      // Закриваємо всі інші
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-icon').textContent = '+';
        i.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Якщо не відкритий — відкриваємо
      if (!isOpen) {
        item.classList.add('active');
        header.querySelector('.accordion-icon').textContent = '−';
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });



const swiperContainer = document.querySelector('.offer-swiper .swiper-wrapper');

const data = {
sports: [
    { video: "./src/videos/5944268 Iceland Glacier 3840X2160.mp4", title: "Multi-Format Content Delivery", text: "Our platform supports live text commentary, expert audio analysis, and dynamic visual breakdowns to match different user preferences and platforms." },
    { video: "./src/videos/6633565 Sand Wind 3840X2160.mp4", title: "Real-time Global Event <br> Coverage", text: "We deliver continuous real-time coverage across global calendars — from major tournaments to niche competitions — ensuring you never miss a moment." },
    { video: "./src/videos/0 Flames Fire 3840X2160 1.mp4", title: "Aggregated, Verified <br> Sources", text: "We compile content from reputable global sources, offering you a comprehensive and reliable information stream for every event." },
    { video: "./src/videos/2480169 Iceland John Mcgraw Photography 3840X2160.mp4", title: "Seamless API & Data Integration", text: "Our delivery is built for easy integration, with modular APIs and customizable data feeds that fit right into your existing systems and workflows." }
],
marketing: [
    { video: "./src/videos/2196653 Wall Stone 1920X1080.mp4", title: "Website Design & Content Development", text: "Our team develops custom layouts, content, and design elements that reflect your brand’s identity and deliver clarity of message." },
    { video: "./src/videos/4565916 Alien Sky 3840X2160.mp4", title: "UI/UX for Web Applications", text: "We design intuitive interfaces for web-based platforms and applications that prioritize simplicity, responsiveness, and user flow optimization." },
    { video: "./src/videos/Gettyimages-1166789423.mp4", title: "SEO Optimization", text: "We audit, refine, and optimize your website structure, metadata, and content to ensure discoverability and sustained traffic growth." },
    { video: "./src/videos/1924508 Beach Sand 3840X2160.mp4", title: "Website Promotion (Search Engine Positioning)", text: "We implement a blend of keyword targeting, link-building, and technical SEO enhancements." }
]
};

function renderCards(category) {
swiperContainer.innerHTML = '';

data[category].forEach(item => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
    <div class="flip-card">
        <div class="flip-card-inner">
        <div class="flip-card-front">
            <video class="card-video" autoplay muted loop playsinline>
            <source src="${item.video}" type="video/mp4">
            </video>
            <div class="card-color-overlay"></div>
            <div class="card-overlay">
            <p class="card-label">${category === 'sports' ? 'Sports & Esports Data Subscription' : 'Digital Marketing & Web Services'}</p>
            <h4 class="card-title">${item.title}</h4>
            </div>
        </div>
        <div class="flip-card-back">
            <p class="card-label">${category === 'sports' ? 'Sports & Esports Data Subscription' : 'Digital Marketing & Web Services'}</p>
            <div class="flip-card-back-inner">
                <h4 class="card-back-title">${item.title}</h4>
                <p>${item.text}</p>
            </div>
        </div>
        </div>
    </div>
    `;
    swiperContainer.appendChild(slide);
});

swiper.update();
}

// Swiper ініціалізація
const swiper = new Swiper('.offer-swiper', {
slidesPerView: 3,
spaceBetween: -100,
breakpoints: {
    328: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 2.5 },
}
});

// Початково показуємо sports
renderCards('sports');

// Перемикаємо категорії по кліку
document.querySelectorAll('.offer-btn').forEach(btn => {
btn.addEventListener('click', () => {
    document.querySelectorAll('.offer-btn').forEach(b => b.classList.remove('visibile'));
    btn.classList.add('visibile');

    const type = btn.getAttribute('data-type');
    renderCards(type);
});
});


const digitalSwiper = new Swiper('.digital-swiper', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.digital-next',
      prevEl: '.digital-prev',
    },
    on: {
      slideChange: function () {
        const current = (this.realIndex + 1).toString().padStart(2, '0');
        document.querySelector('.digital-current').textContent = current;
      }
    }
  });

  const popup = document.getElementById('formPopup');
  const openPopupButtons = document.querySelectorAll(
    '.header-button, .hero-buttons, .why-buttons, .work-button, .contact-btn, .subscribe-btn'
  );
  const closeBtn = document.querySelector('.form-close-btn');

  const successPopup = document.getElementById('successPopup');
  const errorPopup = document.getElementById('errorPopup');

  // Відкриття форми
  openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      popup.classList.add('active');
    });
  });

  // Закриття форми
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('active');
    }
  });

  // Обробка форми
  const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Зупиняє перезавантаження або перехід

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const savedForms = JSON.parse(localStorage.getItem('contactForms')) || [];
    savedForms.push(data);
    localStorage.setItem('contactForms', JSON.stringify(savedForms));

    document.getElementById('formPopup').classList.remove('active');
    document.getElementById('successPopup').classList.add('active');
    contactForm.reset();
  } catch (err) {
    document.getElementById('errorPopup').classList.add('active');
  }
});

document.querySelectorAll('.status-button, .status-close').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('successPopup').classList.remove('active');
      document.getElementById('errorPopup').classList.remove('active');
    });
  });


  const burger = document.querySelector('.burger');
  const burgerClose = document.querySelector('.burger-close');
  const headerMenu = document.querySelector('.header-menu');
  const headerLinks = document.querySelectorAll('.header-link');
  
  burger.addEventListener('click', () => {
    headerMenu.classList.add('open');
    document.body.classList.add('menu-open');
  });
  
  burgerClose.addEventListener('click', () => {
    headerMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });

  headerLinks.forEach(link => {
    link.addEventListener('click', () => {
      headerMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });




// const popup = document.getElementById('form-popup');
// const closeBtn = popup.querySelector('.form-close-btn');
// const openPopupButtons = document.querySelectorAll('.header-button, .hero-buttons, .why-buttons .contact-btn, .subscribe-btn');


// const openPopup = (el) => {
//     el.classList.add("active");
//     document.body.classList.add('noscroll');
//   };
  
//   const closePopUp = (el) => {
//     el.classList.remove("active");
//     document.body.classList.remove('noscroll');
//   };
  
//   openPopupButtons.forEach(button => {
//     button.addEventListener("click", () => openPopup(popup));
//   });
  
//   closeBtn.addEventListener("click", () => closePopUp(popup));
  
//   window.addEventListener('click', (e) => {
//     if (e.target === popup || e.target === successPopup || e.target === errorPopup) {
//       closePopUp(e.target);
//     }
//   });
  
//   document.querySelectorAll('.popup .close').forEach((btn) => {
//     btn.addEventListener('click', () => {
//       closePopUp(btn.closest('.popup-overlay'));
//     });
//   });
  
//   form.addEventListener('submit', function (e) {
//     e.preventDefault();
  
//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
  
//     if (name && email) {
//       localStorage.setItem('joinName', name);
//       localStorage.setItem('joinEmail', email);
  
//       closePopUp(popup);
//       openPopup(successPopup);
//     } else {
//       // помилка
//       closePopUp(popup);
//       openPopup(errorPopup);
//     }
//   });
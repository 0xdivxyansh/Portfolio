  (function() {
      const box = document.getElementById('rotatingBox');
      const maxRotation = 15; // degrees max rotation on each axis

      // On mouse move over the box, rotate based on cursor relative position
      box.addEventListener('mousemove', e => {
        const rect = box.getBoundingClientRect();
        const offsetX = e.clientX - rect.left; // cursor X position inside box
        const offsetY = e.clientY - rect.top;  // cursor Y position inside box

        // Calculate normalized position between -1 and 1 (center is 0)
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        const rotateY = ((offsetX - halfWidth) / halfWidth) * maxRotation; // rotateY (left-right)
        const rotateX = -((offsetY - halfHeight) / halfHeight) * maxRotation; // rotateX (up-down), inverted

        // Apply CSS 3D transform with fixed perspective
        box.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      });

      // Reset rotation when cursor leaves box
      box.addEventListener('mouseleave', () => {
        box.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      });

      // Accessibility: Reset rotation on keyboard focus lost
      box.addEventListener('blur', () => {
        box.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      });
    })();

// Animate about photo and text on scroll using IntersectionObserver
  document.addEventListener('DOMContentLoaded', () => {
    const photo = document.getElementById('aboutPhoto');
    const text = document.getElementById('aboutText');

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          setTimeout(() => photo.classList.add('visible'), 100);
          setTimeout(() => text.classList.add('visible'), 430);
          animated = true;
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(document.querySelector('.about-section'));
  });


// Scroll animation for Education timeline
const eduItems = document.querySelectorAll('.education .timeline-item');

function checkEduItems() {
  const triggerBottom = window.innerHeight * 0.75;

  eduItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', checkEduItems);
checkEduItems();







// Scroll animation for About section
const aboutPhoto = document.querySelector('.about-photo');
const aboutText = document.querySelector('.about-text');

function checkAbout() {
  const triggerBottom = window.innerHeight * 0.75;

  [aboutPhoto, aboutText].forEach(element => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', checkAbout);
checkAbout();





const skillCards = document.querySelectorAll('.skill-card');

function checkSkills() {
  const triggerBottom = window.innerHeight * 0.85;

  skillCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkSkills);
window.addEventListener('load', checkSkills);




// Optional: Smooth scroll polyfill for older browsers
// Modern browsers support CSS scroll-behavior (see below)

// Enable smooth scroll behavior for anchor links
document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Optionally update active class
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});






document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25, // Reveal when 25% visible
  });

  projectCards.forEach(card => observer.observe(card));
});








document.getElementById('feedback-form').addEventListener('submit', function(e){
  e.preventDefault();
  const form = e.target;
  const responseEl = form.querySelector('.form-response');

  // Simple front-end validation
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  let errorMsg = "";
  if(!name) errorMsg += "Enter your name. ";
  if(!email || !email.includes('@')) errorMsg += "Valid email required. ";
  if(!message || message.length < 8) errorMsg += "Please write a detailed message.";

  if(errorMsg) {
    responseEl.style.color = "#e23232";
    responseEl.textContent = errorMsg;
    return;
  }

  // Simulate API/send
  responseEl.style.color = "#23c233";
  responseEl.textContent = "Thank you for reaching out! I’ll get back to you soon.";
  form.reset();
  // Add subtle confetti effect (optional)
  confettiBurst();
});

// Optional fun: Add a confetti burst on submit
function confettiBurst() {
  const section = document.getElementById('contact');
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('span');
    el.textContent = '🎉';
    el.style.position = 'absolute';
    el.style.left = (50 + Math.random()*200 - 100) + 'px';
    el.style.top = (340 + Math.random()*40 - 20) + 'px';
    el.style.fontSize = (1.2 + Math.random()) + 'rem';
    el.style.opacity = 0.95;
    el.style.transition = 'all 1.8s cubic-bezier(.25,.6,.3,1)';
    section.appendChild(el);
    setTimeout(() => {
      el.style.top = (140 + Math.random()*80 - 40) + 'px';
      el.style.opacity = 0;
      el.style.transform = 'rotate(' + (Math.random()*180-90) + 'deg) scale(1.4)';
    }, 30);
    setTimeout(() => el.remove(), 1850);
  }
}

// ====== قائمة التنقل في الجوال ======
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// إغلاق القائمة عند النقر على أي رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ====== تأثير الكتابة الآلية (Typing Effect) ======
const typingElement = document.getElementById('typingText');
if (typingElement) {
    const texts = ['مطور ويب', 'مصمم واجهات', 'مبدع رقمي', 'يوسف حسين سقيل'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function typeEffect() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.textContent = currentText;

        let speed = isDeleting ? 50 : 120;

        if (!isDeleting && charIndex === fullText.length) {
            speed = 2000; // توقف قبل المسح
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

// ====== عدادات الأرقام المتحركة ======
const statNumbers = document.querySelectorAll('.stat-number');

const animateNumbers = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const current = parseInt(stat.textContent);
        const increment = Math.ceil(target / 60);
        
        if (current < target) {
            const newValue = Math.min(current + increment, target);
            stat.textContent = newValue;
        }
    });
};

// تشغيل العدادات عند التمرير إلى القسم
const aboutSection = document.querySelector('.about');
let isAnimated = false;

if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimated) {
                isAnimated = true;
                statNumbers.forEach(stat => stat.textContent = '0');
                const interval = setInterval(() => {
                    let allDone = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const current = parseInt(stat.textContent);
                        if (current < target) allDone = false;
                    });
                    if (allDone) clearInterval(interval);
                    animateNumbers();
                }, 30);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
}

// ====== معالجة نموذج التواصل ======
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // تحقق بسيط
        if (!name || !email || !message) {
            formMessage.textContent = '❌ الرجاء ملء جميع الحقول';
            formMessage.className = 'form-message error';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            formMessage.textContent = '❌ الرجاء إدخال بريد إلكتروني صحيح';
            formMessage.className = 'form-message error';
            return;
        }

        // محاكاة إرسال (يمكن استبدالها بإرسال حقيقي)
        formMessage.textContent = '✅ تم إرسال رسالتك بنجاح! سأتواصل معك قريبًا.';
        formMessage.className = 'form-message success';
        
        contactForm.reset();

        // تنظيف الرسالة بعد 5 ثواني
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    });
}

// ====== تأثير ظهور العناصر عند التمرير (Scroll Animation) ======
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

animateOnScroll();

// ====== تغيير شريط التنقل عند التمرير ======
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = '#1A1A2E';
        navbar.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)';
    } else {
        navbar.style.background = '#2D2D3F';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    }
});

console.log('🚀 موقع يوسف حسين سقيل جاهز!');
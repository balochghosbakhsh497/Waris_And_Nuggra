window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);

    initPetals();
    initCountdown();
    initScrollAnimations();
    initHeaderScroll();
    initGalleryLightbox();
    initRSVPForm();
    initThemeToggle();
    initMusicToggle();
    initHeartCursor();
});

function initPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 20;

    for (let i = 0; i < petalCount; i++) {
        createPetal(container);
    }

    setInterval(() => createPetal(container), 800);
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    petal.style.width = (Math.random() * 10 + 10) + 'px';
    petal.style.height = petal.style.width;
    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 10000);
}

function initCountdown() {
    const weddingDate = new Date('June 15, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-img');
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const guestsInput = document.getElementById('guests');
        const attendanceInputs = document.querySelectorAll('input[name="attendance"]');

        clearErrors();

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }

        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }

        if (!guestsInput.value) {
            showError(guestsInput, 'Please select number of guests');
            isValid = false;
        }

        let attendanceSelected = false;
        attendanceInputs.forEach(input => {
            if (input.checked) attendanceSelected = true;
        });
        if (!attendanceSelected) {
            showError(attendanceInputs[0].closest('.form-group'), 'Please select your attendance');
            isValid = false;
        }

        if (isValid) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            launchConfetti();
        }
    });

    function showError(input, message) {
        const formGroup = input.closest ? input.closest('.form-group') : input;
        formGroup.classList.add('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = message;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
        }
    });
}

function initMusicToggle() {
    const musicToggle = document.getElementById('music-toggle');
    const icon = musicToggle.querySelector('i');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            icon.className = 'fas fa-volume-up';
            alert('Music would play here! For production, add an audio file.');
        } else {
            icon.className = 'fas fa-volume-mute';
        }
    });
}

function initHeartCursor() {
    const hearts = [];
    const heartCount = 10;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart';
        heart.style.cssText = `
            position: fixed;
            pointer-events: none;
            color: #D4AF37;
            font-size: 16px;
            opacity: 0;
            z-index: 9998;
            transition: transform 0.5s ease, opacity 0.5s ease;
        `;
        document.body.appendChild(heart);
        hearts.push({ el: heart, active: false });
    }

    document.addEventListener('mousemove', (e) => {
        const availableHeart = hearts.find(h => !h.active);
        if (availableHeart) {
            availableHeart.el.style.left = e.clientX + 'px';
            availableHeart.el.style.top = e.clientY + 'px';
            availableHeart.el.style.opacity = '1';
            availableHeart.active = true;

            setTimeout(() => {
                availableHeart.el.style.transform = 'translateY(-50px) scale(0)';
                availableHeart.el.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                availableHeart.el.style.transform = '';
                availableHeart.active = false;
            }, 500);
        }
    });
}

function launchConfetti() {
    const confettiCount = 100;
    const colors = ['#D4AF37', '#F8C8DC', '#FDF8F3', '#FFFFFF'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: 50%;
            top: 50%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 9997;
        `;
        document.body.appendChild(confetti);

        const x = (Math.random() - 0.5) * 200;
        const y = -Math.random() * 500 - 100;
        const rotation = Math.random() * 720;

        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'ease-out'
        }).onfinish = () => confetti.remove();
    }
}

// Animácia pre navigačné menu
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll pre odkazy v navigácii
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animácia pre galériu
    const galleryItems = document.querySelectorAll('.gallery figure');
    galleryItems.forEach(item => {
        item.style.transition = 'transform 0.3s ease';
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Animácia pre tlačidlá
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.transition = 'all 0.3s ease';
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Validácia kontaktného formulára
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="mail"]').value;
            const message = this.querySelector('textarea').value;

            if (!name || !email || !message) {
                alert('Prosím vyplňte všetky polia');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Prosím zadajte platnú emailovú adresu');
                return;
            }

            // Tu by sa mohol pridať kód na odoslanie formulára
            alert('Formulár bol úspešne odoslaný!');
            this.reset();
        });
    }

    // Pomocná funkcia pre validáciu emailu
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Animácia pre nadpisy
    const headings = document.querySelectorAll('h2');
    headings.forEach(heading => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(20px)';
        heading.style.transition = 'all 0.5s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        observer.observe(heading);
    });

    // Dynamické načítanie obrázkov v galérii (iba ak je prázdna)
    const gallery = document.querySelector('.gallery');
    if (gallery && gallery.children.length === 0) {
        const images = [
            { src: 'images/2.jpg', title: 'Rovinka', date: 'August 2024' },
            { src: 'images/8.jpg', title: 'Mountain', date: 'Lorem ipsum dolor sit amet' },
            { src: 'images/6.jpg', title: 'Mountain', date: 'Lorem ipsum dolor sit amet' }
        ];

        images.forEach(image => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${image.src}" alt="${image.title}">
                <figcaption>
                    <h3>${image.title}</h3>
                    <p>${image.date}</p>
                </figcaption>
            `;
            gallery.appendChild(figure);
        });
    }
}); 
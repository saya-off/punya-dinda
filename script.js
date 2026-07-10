const modalCreator = document.getElementById("creatorModal");
const player = document.getElementById('youtube-player');
const statusText = document.getElementById('status');
let progressInterval;

function openLogoPreview() {
    const modal = document.getElementById("logoModal");
    const audio = document.getElementById("voiceWelcome");
    if (modal) { modal.style.display = "flex"; }
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.6;
        audio.play().catch(() => {});
    }
}

function closeLogoPreview() { 
    const modal = document.getElementById("logoModal");
    const audio = document.getElementById("voiceWelcome");
    if (modal) { modal.style.display = "none"; }
    if (audio) { audio.pause(); audio.currentTime = 0; }
}

function openCreatorModal() {
    if(modalCreator) modalCreator.style.display = "flex";
    startCreatorAutoplay();
}

function closeCreatorModal() { 
    if(modalCreator) modalCreator.style.display = "none";
    stopCreatorAutoplay();
}

let creatorIndex = 0;
let creatorAutoplay;

function creatorSlide(i) {
    const slides = document.querySelectorAll('.creator-slide');
    const dots = document.querySelectorAll('.creator-carousel-dots .dot');
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    if(dots[i]) dots[i].classList.add('active');
    creatorIndex = i;
}

function startCreatorAutoplay() {
    stopCreatorAutoplay();
    creatorAutoplay = setInterval(() => {
        const slides = document.querySelectorAll('.creator-slide');
        creatorSlide((creatorIndex + 1) % slides.length);
    }, 3500);
}

function stopCreatorAutoplay() {
    clearInterval(creatorAutoplay);
}

function openGioBio() {
    const modal = document.getElementById("gioBioModal");
    if (modal) { modal.style.display = "flex"; }
}

function closeGioBio() {
    const modal = document.getElementById("gioBioModal");
    if (modal) { modal.style.display = "none"; }
}

function playSong(videoId, title, artist, el) {
    if(player) {
        player.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";

        const trackTitle = document.getElementById('track-title');
        const trackArtist = document.getElementById('track-artist');
        if(trackTitle) trackTitle.innerHTML = title;
        if(trackArtist && artist) trackArtist.innerHTML = artist;

        const currentCover = document.getElementById('current-cover');
        if (currentCover && el) {
            const itemImg = el.querySelector('img');
            if (itemImg) {
                currentCover.src = itemImg.src;
                currentCover.style.display = 'block';
            }
        }

        const allItems = document.querySelectorAll('.music-item');
        allItems.forEach(item => item.classList.remove('active'));
        if(el) el.classList.add('active');

        if(statusText) {
            statusText.innerHTML = "Status: Memutar " + title;
            statusText.style.color = "#bb86fc";
        }
        
        clearInterval(progressInterval);
        
        const progressFill = document.getElementById('progress-fill');
        const currentTimeText = document.getElementById('current-time');
        let width = 0;
        let seconds = 0;
        
        progressInterval = setInterval(() => {
            if (width >= 100) {
                clearInterval(progressInterval);
            } else {
                width += 0.5; 
                seconds += 1;
                
                let mins = Math.floor(seconds / 60);
                let secs = seconds % 60;
                if (secs < 10) secs = '0' + secs;
                
                if(progressFill) progressFill.style.width = width + '%';
                if(currentTimeText) currentTimeText.innerHTML = mins + ':' + secs;
            }
        }, 1000);
    }
}
function stopMusic() {
    if(player) {
        player.src = "";
        
        if(statusText) {
            statusText.innerHTML = "Status: Off";
            statusText.style.color = "#a7a7a7";
        }
        
        const currentCover = document.getElementById('current-cover');
        if (currentCover) {
            currentCover.src = "img/gio1.png";
        }
        
        clearInterval(progressInterval);
        const progressFill = document.getElementById('progress-fill');
        const currentTimeText = document.getElementById('current-time');
        if(progressFill) progressFill.style.width = '0%';
        if(currentTimeText) currentTimeText.innerHTML = '0:00';
    }
}

function openGevagart() {
    const app = document.getElementById('gevagartApp');
    if (app) {
        app.classList.add('active');
        document.body.style.overflow = 'hidden';
        history.pushState({ gevagart: true }, '');
    }
}

function closeGevagart() {
    const app = document.getElementById('gevagartApp');
    if (app) {
        app.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.addEventListener('popstate', () => {
    const app = document.getElementById('gevagartApp');
    if (app && app.classList.contains('active')) {
        closeGevagart();
    }
    const music = document.getElementById('musicApp');
    if (music && music.classList.contains('active')) {
        closeMusicApp();
    }
});

function openMusicApp() {
    const app = document.getElementById('musicApp');
    if (app) {
        app.classList.add('active');
        document.body.style.overflow = 'hidden';
        history.pushState({ musicApp: true }, '');
    }
}

function closeMusicApp() {
    const app = document.getElementById('musicApp');
    if (app) {
        app.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function bukaTab(nama) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => { btn.classList.remove('active'); });

    const targetTab = document.getElementById(nama);
    if (targetTab) {
        targetTab.style.display = 'block';
        targetTab.classList.add('active');
    }

    const targetBtn = document.getElementById('btn-' + nama);
    if (targetBtn) { targetBtn.classList.add('active'); }
}

function mulaiKenalan() { 
    const mainContent = document.getElementById('main-content');
    if(mainContent) mainContent.scrollIntoView({ behavior: 'smooth' }); 
}

function kembaliHome() { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const app = document.getElementById('gevagartApp');
        if (app && app.classList.contains('active')) closeGevagart();

        const music = document.getElementById('musicApp');
        if (music && music.classList.contains('active')) closeMusicApp();

        const bio = document.getElementById('gioBioModal');
        if (bio && bio.style.display === 'flex') closeGioBio();
    }
});

window.onclick = function(event) {
    if (event.target == modalCreator) closeCreatorModal();
    const modalLogo = document.getElementById("logoModal");
    if (event.target == modalLogo) closeLogoPreview();
    const modalBio = document.getElementById("gioBioModal");
    if (event.target == modalBio) closeGioBio();
}

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
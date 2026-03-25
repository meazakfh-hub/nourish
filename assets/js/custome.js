function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // ── Active nav link (runs AFTER header is injected) ──
      if (id === 'site-header') {
        const activePage = window.location.pathname;

        document.querySelectorAll('.main-nav .navbar-nav .nav-item:not(.dropdown) .nav-link')
          .forEach(function (link) {
            try {
              const linkPath = new URL(link.href).pathname;
              // normalize trailing slash difference e.g. /remedy vs /remedy.html
              if (linkPath === activePage) {
                link.classList.add('active');
              }
            } catch (e) { /* skip bad hrefs */ }
          });

        // Also highlight parent nav-item if a dropdown-item matches
        document.querySelectorAll('.main-nav .dropdown-menu .dropdown-item')
          .forEach(function (item) {
            try {
              const itemPath = new URL(item.href).pathname;
              if (itemPath === activePage) {
                item.classList.add('active');
                // highlight the parent dropdown toggle too
                item.closest('.nav-item.dropdown')
                    .querySelector('.nav-link')
                    .classList.add('active');
              }
            } catch (e) { /* skip */ }
          });
      }
    });
}

loadHTML("site-header", "header.html");
loadHTML("footer", "footer.html");


/* navbar scroll up visible */
var header  = document.getElementById('site-header');
var spacer  = document.getElementById('header-spacer');
var ticking = false;

/* Keep spacer height = actual header height so body content sits below */
function syncSpacer() {
  spacer.style.height = header.offsetHeight + 'px';
}

/* rAF gate: ensures scroll handler fires at most once per animation frame,
   preventing the rapid toggle that causes shaking */
window.addEventListener('scroll', function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
      /* sync spacer one frame later so it reads the post-transition height */
      requestAnimationFrame(syncSpacer);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

window.addEventListener('load',   syncSpacer);
window.addEventListener('resize', syncSpacer);




/* ---------- FUNCTIONS ---------- */


// Slide LEFT
 
 
$('.owl-carousel').owlCarousel({
	center:true,
	loop:true,
	margin:0,
	items:1,
	nav:true,
	dots:true,
	autoplay:false,
	autoplayTimeout:5000,
	autoplayHoverPause:false,
	responsive:{
	0:{
	items:1
	},
	576:{
	items:1,
	center:true,
	},
	992:{
	items:1
	}
	}
	})
  
   

//   VIDEO PLAY

 
const video = document.getElementById("customVideo");
  const playButton = document.getElementById("playButton");
  const muteButton = document.getElementById("muteButton");

  const playIcon = playButton.querySelector("i");
  const muteIcon = muteButton.querySelector("i");

  /* =============================
     AUTOPLAY SAFE START
  ============================= */
  video.play().catch(function(error) {
    console.log("Autoplay blocked:", error);
  });

  /* =============================
     PLAY / PAUSE
  ============================= */
  playButton.addEventListener("click", function () {

    if (video.paused) {
      video.play();
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
    } else {
      video.pause();
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    }

  });

  /* =============================
     MUTE / UNMUTE
  ============================= */
  muteButton.addEventListener("click", function () {

    video.muted = !video.muted;

    if (video.muted) {
      muteIcon.classList.remove("fa-volume-up");
      muteIcon.classList.add("fa-volume-off");
    } else {
      muteIcon.classList.remove("fa-volume-off");
      muteIcon.classList.add("fa-volume-up");
    }

  });

  /* =============================
     SYNC PLAY ICON IF VIDEO ENDS
  ============================= */
  video.addEventListener("ended", function () {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  });



//   LIGHT BOX


 
    // Lightbox Gallery

// query selectors

/* ================================
   LIGHTBOX SCRIPT (FULL)
   Scroll lock + position restore
================================ */

const lightboxEnabled = document.querySelectorAll('.lightbox-enabled');
const lightboxArray = Array.from(lightboxEnabled);
const lastImage = lightboxArray.length - 1;

const lightboxContainer = document.querySelector('.lightbox-container');
const lightboxImage = document.querySelector('.lightbox-image');

const lightboxBtns = document.querySelectorAll('.lightbox-btn');
const lightboxBtnRight = document.querySelector('#right');
const lightboxBtnLeft = document.querySelector('#left');
const close = document.querySelector('#close');

let activeImage;
let scrollPosition = 0;

/* ---------- FUNCTIONS ---------- */

// Show Lightbox + lock scroll (WITHOUT position:fixed on body)
const showLightBox = () => {
  scrollPosition = window.pageYOffset;
  document.body.style.overflow = 'hidden';
  lightboxContainer.classList.add('active');
};

// Hide Lightbox + restore scroll
const hideLightBox = () => {
  document.body.style.overflow = '';
  window.scrollTo(0, scrollPosition);
  lightboxContainer.classList.remove('active');
};
 



// Set active image
const setActiveImage = (image) => {
  lightboxImage.src = image.dataset.imgsrc;
  activeImage = lightboxArray.indexOf(image);
};

// Slide LEFT
const transitionSlidesLeft = () => {
  lightboxBtnLeft.focus();

  $('.lightbox-image').addClass('slideright');

  setTimeout(() => {
    activeImage === 0
      ? setActiveImage(lightboxArray[lastImage])
      : setActiveImage(lightboxArray[activeImage - 1]);
  }, 250);

  setTimeout(() => {
    $('.lightbox-image').removeClass('slideright');
  }, 500);
};

// Slide RIGHT
const transitionSlidesRight = () => {
  lightboxBtnRight.focus();

  $('.lightbox-image').addClass('slideleft');

  setTimeout(() => {
    activeImage === lastImage
      ? setActiveImage(lightboxArray[0])
      : setActiveImage(lightboxArray[activeImage + 1]);
  }, 250);

  setTimeout(() => {
    $('.lightbox-image').removeClass('slideleft');
  }, 500);
};

// Direction handler
const transitionSlideHandler = (moveItem) => {
  moveItem.includes('left')
    ? transitionSlidesLeft()
    : transitionSlidesRight();
};

/* ---------- EVENT LISTENERS ---------- */



// Open lightbox
lightboxEnabled.forEach(image => {
  image.addEventListener('click', () => {
    showLightBox();
    setActiveImage(image);
  });
});

// Close on background click
lightboxContainer.addEventListener('click', hideLightBox);

// Close button
close.addEventListener('click', hideLightBox);

// Buttons (left / right)
lightboxBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    transitionSlideHandler(e.currentTarget.id);
  });
});

// Prevent close when clicking image
lightboxImage.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Prevent touch scroll on mobile
lightboxContainer.addEventListener(
  'touchmove',
  (e) => e.preventDefault(),
  { passive: false }
);

/* ---------- OPTIONAL EXTRAS ---------- */

// ESC key to close
document.addEventListener('keydown', (e) => {
  if (!lightboxContainer.classList.contains('active')) return;

  if (e.key === 'Escape') hideLightBox();
  if (e.key === 'ArrowLeft') transitionSlidesLeft();
  if (e.key === 'ArrowRight') transitionSlidesRight();
});
 

 


/* ── Smooth dropdown open AND close ── */
$(document).on('hide.bs.dropdown', '.main-nav .dropdown', function (e) {
  e.preventDefault(); // stop Bootstrap closing it instantly

  var $menu = $(this).find('.dropdown-menu');
  $menu.css('max-height', '0');

  setTimeout(function () {
    $menu.css('visibility', 'hidden');
    $menu.removeClass('show');         // now let Bootstrap finish
    $(e.target).removeClass('show');   // also remove from the toggle
  }, 350); // must match your transition duration
});
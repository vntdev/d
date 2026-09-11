document.addEventListener('DOMContentLoaded', function() {
    // Get all page elements
    const welcomePage = document.getElementById('welcome-page');
    const memoryPage = document.getElementById('memory-page');
    const specialImagePage = document.getElementById('special-image-page');
    const heartGalleryPage = document.getElementById('heart-gallery-page');
    const finalPage = document.getElementById('final-page');
    
    // Get all buttons
    const startBtn = document.getElementById('start-btn');
    const memoryNextBtn = document.getElementById('memory-next-btn');
    const imageNextBtn = document.getElementById('image-next-btn');
    const heartNextBtn = document.getElementById('heart-next-btn');
    
    // Music elements
    const welcomeMusic = document.getElementById('welcome-music');
    const welcomeMusicToggle = document.getElementById('welcome-music-toggle');
    
    // Setup welcome page music
    welcomeMusicToggle.addEventListener('click', function() {
        if (welcomeMusic.paused) {
            welcomeMusic.play();
            welcomeMusicToggle.classList.remove('muted');
            welcomeMusicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            welcomeMusic.pause();
            welcomeMusicToggle.classList.add('muted');
            welcomeMusicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Auto-play welcome music
    welcomeMusic.play().catch(e => {
        console.log('Auto-play prevented by browser. User must interact with the page first.');
    });
    
    // Function to transition between pages
    function transitionPages(currentPage, nextPage) {
        // Hide current page
        currentPage.classList.add('hidden');
        
        // Show next page with a slight delay for transition effect
        setTimeout(() => {
            nextPage.classList.remove('hidden');
            
            // Animate entrance
            setTimeout(() => {
                nextPage.style.opacity = '1';
                nextPage.style.transform = 'translateY(0)';
                
                // If transitioning to heart gallery page, trigger animations
                if (nextPage === heartGalleryPage) {
                    setupHeartGallery();
                }
            }, 50);
        }, 500);
    }
    
    // Function to set up and animate heart gallery with grid layout
    function setupHeartGallery() {
        const gallery = document.querySelector('.heart-gallery');
        
        // Clear existing hearts first to avoid duplicates
        gallery.innerHTML = '';
        
        // Create all hearts with both original and new messages
        const allMessages = [
            "eyes", "touch", "love", 
            "smile", "lips", "laugh", 
            "care", "voice", "heart", 
            "kindness", "patience", "strength", 
            "beauty", "warmth", "gentleness", 
            "hugs", "kisses", "everything"
        ];
        
        // Add regular hearts first
        allMessages.forEach((message, index) => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.setAttribute('data-delay', index);
            
            // Create a container for the text to ensure proper centering
            const textContainer = document.createElement('div');
            textContainer.className = 'heart-text left-aligned';
            
            // Split into "Your" and the attribute
            const yourSpan = document.createElement('span');
            yourSpan.className = 'your';
            yourSpan.textContent = 'Your';
            
            const attributeSpan = document.createElement('span');
            attributeSpan.className = 'attribute';
            attributeSpan.textContent = message;
            
            textContainer.appendChild(yourSpan);
            textContainer.appendChild(attributeSpan);
            
            heart.appendChild(textContainer);
            gallery.appendChild(heart);
        });
        
        // Calculate how many empty slots to add before the final message
        // to ensure it appears in the middle of the last row
        const totalHearts = allMessages.length;
        const itemsPerRow = 3; // Based on grid-template-columns
        const lastRowItems = totalHearts % itemsPerRow;
        const emptySlots = lastRowItems === 0 ? 1 : (itemsPerRow - lastRowItems) / 2;
        
        // Add empty slots if needed
        for (let i = 0; i < emptySlots; i++) {
            const emptyHeart = document.createElement('div');
            emptyHeart.className = 'empty-heart-slot';
            gallery.appendChild(emptyHeart);
        }
        
        // Add the final "Finally YOU!" heart
        const finalHeart = document.createElement('div');
        finalHeart.className = 'floating-heart final-heart';
        finalHeart.setAttribute('data-delay', allMessages.length);
        
        const finalTextContainer = document.createElement('div');
        finalTextContainer.className = 'heart-text left-aligned';
        
        // Split "Finally YOU!" into two lines
        const finallySpan = document.createElement('span');
        finallySpan.className = 'finally';
        finallySpan.textContent = 'Finally';
        
        const youSpan = document.createElement('span');
        youSpan.className = 'you';
        youSpan.textContent = 'YOU!';
        
        finalTextContainer.appendChild(finallySpan);
        finalTextContainer.appendChild(youSpan);
        
        finalHeart.appendChild(finalTextContainer);
        gallery.appendChild(finalHeart);
        
        // Add kiss effects to the background
        for (let i = 0; i < 15; i++) {
            createKissEffect(gallery);
        }
        
        // Get all hearts
        const hearts = document.querySelectorAll('.floating-heart');
        
        // Animate hearts sequentially
        hearts.forEach((heart, index) => {
            setTimeout(() => {
                heart.classList.add('visible');
            }, index * 300); // 300ms delay between each heart
        });
    }
    
    // Function to create kiss effect elements
    function createKissEffect(container) {
        const kiss = document.createElement('div');
        kiss.className = 'kiss';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        kiss.style.left = `${left}%`;
        kiss.style.top = `${top}%`;
        
        // Random size
        const size = 10 + Math.random() * 20;
        kiss.style.width = `${size}px`;
        kiss.style.height = `${size}px`;
        
        // Random animation delay
        const delay = Math.random() * 10;
        kiss.style.animationDelay = `${delay}s`;
        
        container.appendChild(kiss);
    }
    
    // Event listeners for buttons
    startBtn.addEventListener('click', function() {
        transitionPages(welcomePage, memoryPage);
    });
    
    memoryNextBtn.addEventListener('click', function() {
        transitionPages(memoryPage, specialImagePage);
    });
    
    imageNextBtn.addEventListener('click', function() {
        transitionPages(specialImagePage, heartGalleryPage);
    });
    
    heartNextBtn.addEventListener('click', function() {
        transitionPages(heartGalleryPage, finalPage);
    });
    
    // Initialize the first page
    welcomePage.style.opacity = '1';
    welcomePage.style.transform = 'translateY(0)';
    
    // Add animation to floating hearts in final page
    const floatingHearts = document.querySelectorAll('.floating-hearts i');
    floatingHearts.forEach(heart => {
        // Randomize starting position
        heart.style.left = `${Math.random() * 100}%`;
        
        // Randomize animation duration between 6-12 seconds
        const duration = 6 + Math.random() * 6;
        heart.style.animationDuration = `${duration}s`;
    });
});
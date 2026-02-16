function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.classList.add("active");
}

function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.classList.remove("active");
}

// Setup Event Listeners
// Script is at the end of body, so DOM is ready.
const dropdownLinks = document.querySelectorAll(".dropdown .links a");
dropdownLinks.forEach(link => {
    link.addEventListener('click', cancel);
});

const cancelBtn = document.querySelector(".cancel");
if(cancelBtn) {
    cancelBtn.addEventListener('click', cancel);
}

// Typewriter Effect
const texts = [
    "FINANCE STUDENT",
    "TECH ENTHUSIAST",
    "FUTURE LEADER"
]
let speed = 100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let charcterIndex = 0;

function typeWriter(){
    if (textElements && charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else if (textElements){
        setTimeout(eraseText, 1000)
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

window.addEventListener('load', typeWriter);


// Gallery Logic
const galleryGrid = document.getElementById('gallery-grid');
const viewMoreBtn = document.getElementById('viewMoreBtn');
let imagesLoadedCount = 0;
const imagesPerBatch = 9;

function loadImages() {
    // Check if element exists before proceeding
    if (!galleryGrid) return;
    
    const batchEnd = imagesLoadedCount + imagesPerBatch;
    
    // NOTE: Adjust max number based on your actual file count in the images folder
    let maxImagesAvailable = 35; // You listed about 35 images in the directory
    
    for (let i = imagesLoadedCount + 1; i <= batchEnd; i++) {
        if (i > maxImagesAvailable) {
            viewMoreBtn ? viewMoreBtn.style.display = 'none' : null;
            break;
        }

        const img = document.createElement('img');
        img.src = `images/image${i}.jpeg`; 
        img.alt = `Gallery Image ${i}`;
        img.loading = "lazy";
        
        // Add error handling incase image doesn't exist
        img.onerror = function() {
            this.style.display = 'none';
        };

        galleryGrid.appendChild(img);
        imagesLoadedCount++;
    }

    if (imagesLoadedCount >= maxImagesAvailable && viewMoreBtn) {
        viewMoreBtn.style.display = 'none';
    }
}

// Initial load
loadImages();

function loadMoreImages() {
    loadImages();
}
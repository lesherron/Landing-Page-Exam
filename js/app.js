/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

//Call the sections selectors and navbar__list ID to manipulate the navigation
const sections = document.querySelectorAll('section');
//Get the navbar menu to add click event listener
const navList = document.getElementById('navbar__list');
const navbarMenu = document.querySelector('.navbar__menu');
// Refers to the Scroll to Top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
// Activate the scrolling event to control navigation visibility
let isScrolling;

/**
 * End Global Variables
 * 
 * Start Helper Functions
*/

//Create nav items for the sections to go to when clicking a link
function createNavItems(section) {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.className = 'menu__link';
    navLink.href = `#${section.id}`;
    navLink.textContent = section.dataset.nav;
    navItem.appendChild(navLink);
    return navItem;
}

// Check if a section is in the viewport
function isInViewport(section) {
    const rect = section.getBoundingClientRect();
    return (rect.top >= 0 && rect.top < window.innerHeight / 2);
}

//Scroll smoothly to the specified section
function smoothScrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({behavior: 'smooth'});
}
/**
 * End Helper Functions
 * 
 * Begin Main Functions
*/

// build the nav
function buildNav() {
    sections.forEach(section => {
        const navItem = createNavItems(section);
        navList.appendChild(navItem);
    });
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    sections.forEach(section => {
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        if(isInViewport(section)) {
            section.classList.add('your-active-class');
            //set the background color of the active nav link
            navLink.classList.add('active');
            //add background color to each active section
            section.style.backgroundColor = 'blue'; 
            // Add a border radius to the active section for visual effect
            section.style.borderRadius = '10px';
        } else {
            section.classList.remove('your-active-class');
            //remove the background color of the active nav link
            navLink.classList.remove('active');
            //remove background color of each active section
            section.style.backgroundColor = ''; 
        }
    });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    smoothScrollToSection(targetId);
}

// Hide the navigation bar when the browswer isn't scrolling
function hideNavbar() {
    navbarMenu.classList.add('hidden');
}

// Show the navigation bar when scrolling
function showNavbar() {
    navbarMenu.classList.remove('hidden');
}

// Function to handle the Scroll to Top button and its visibility
function handleScrollToTopBtn() {
    if (window.scrollY > sections[0].offsetHeight) {
        scrollToTopBtn.style.display = 'block';
}   else {
    scrollToTopBtn.style.display = 'none';
    }
}

// This scrolls to the top of the page
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
/**
 * End Main Functions
 * 
 * Begin Events
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click
navList.addEventListener('click', scrollToSection);

// Adds event listener for when the browser is scrolling or not, hiding the navbar if browser goes more than two seconds without scrolling
window.addEventListener('scroll', () => {
    showNavbar();
    clearTimeout(isScrolling);
    isScrolling = setTimeout(hideNavbar, 2000);
});

// Set sections as active
window.addEventListener('scroll', setActiveSection);

// Add event listener for the scroll to top button
window.addEventListener('scroll', handleScrollToTopBtn);
scrollToTopBtn.addEventListener('click', scrollToTop);
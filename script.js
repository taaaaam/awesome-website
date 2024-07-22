function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    var links = document.querySelectorAll('.sidebar ul li a');
    
    // Hide all sections and remove active and glitch classes from all links
    sections.forEach(function(section) {
        section.style.display = 'none';
        section.classList.remove('fade-in');
    });
    links.forEach(function(link) {
        link.classList.remove('active', 'glitch');
    });
    
    // Show the selected section
    var activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
        requestAnimationFrame(() => {
            activeSection.classList.add('fade-in');
        });
    }
    
    // Add active and glitch classes to the clicked link
    var activeLink = document.querySelector('.sidebar ul li a[onclick="showSection(\'' + sectionId + '\')"]');
    if (activeLink) {
        activeLink.classList.add('active', 'glitch');
        activeLink.setAttribute('data-text',  activeLink.innerText);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Typing Animation
document.addEventListener("DOMContentLoaded", function() {
    
    var header = document.getElementById("header");
    var desc1 = document.getElementById("desc1");
    var desc2 = document.getElementById("desc2");
    var desc3 = document.getElementById("desc3");
    var text1 = "Hi! My name is Tam Vu.";
    var text2 = "I'm a Computer Science and Statistics and Data Science double major at ";

    var text3 = "Currently, I am working on image synthesis with deep learning for binary classification of multiple sclerosis lesions at "
    var text4 = "I have a strong background in machine learning, statistical analysis and computer vision"
    var text5 = "If you'd like to see my resume, click "
    var text6 = "If you'd like to see my work, use the bar on the left to navigate"
    var text6 = "Thanks for checking out my website, built from scratch!"

    async function type(element, text, delay, speed, cursor_stay) {
        let index = 0;
        while (index < text.length) {
            element.innerHTML = text.substring(0, index + 1) + '<span class="cursor">|</span>';
            index++;
            if (index === delay) {
                await sleep(500); // Adjust delay speed here
            } else {
                await sleep(speed); // Adjust typing speed here
            }
        }
        if (cursor_stay) {
            element.innerHTML = text + '<span class="blinking-cursor">|</span>';
        } else {
            element.innerHTML = text;
        }
         // Ensure cursor remains at the end
        if (element === header) {
            element.setAttribute('data-text', text);
            //element.classList.add('glitch');
        }
    }

    async function runTypingAnimations() {
        var YaleLink = '<a id="Yale-Link"  href="https://www.yale.edu">\[Yale University\]</a>';
        var CornellLink = '<a id="Cornell-Link"  href="https://weill.cornell.edu">\[Weill Cornell Medicine\]</a>';
        var ResumeLink = '<a id="Resume-Link" href="/Resume_Tam_Vu_2024_v1.pdf" target="_blank">here</a>'
        type(header, text1, 3, 100, false);

        const desc1Promise = type(desc1, text2, -1, 20, false).then(async () => {
       
            for (let i = 0; i < 3; i++) {
                desc1.innerHTML = text2 + ' ' + YaleLink;
                await sleep(100);
                desc1.innerHTML = text2;
                await sleep(100);
            }
            desc1.innerHTML = text2 + ' ' + YaleLink;
            document.getElementById("Yale-Link").classList.add("glitch");
        });

        const desc2Promise = type(desc2, text3, -1, 20, false).then(async () => {
        
            for (let i = 0; i < 3; i++) {
                desc2.innerHTML = text3 + ' ' + CornellLink;
                await sleep(100);
                desc2.innerHTML = text3;
                await sleep(100);
            }
            desc2.innerHTML = text3 + ' ' + CornellLink;
            document.getElementById("Cornell-Link").classList.add("glitch");
        });

        // Wait for both desc1 and desc2 animations to complete
        await Promise.all([desc1Promise, desc2Promise]);

        type(desc3, text4, -1, 20, false);
        await(type(desc4, text5, -1, 20, false));

        for (let i = 0; i < 3; i++) {
            desc4.innerHTML = text5 + ' ' + ResumeLink;
            await sleep(100);
            desc4.innerHTML = text5;
            await sleep(100);
        }
        desc4.innerHTML = text5 + ' ' + ResumeLink;
        // desc4.innerHTML = text5 + ResumeLink;
        type(desc5, text6, -1, 20, true);
    }

    runTypingAnimations();

    document.addEventListener("mouseover", function(event) {
        if (event.target && (event.target.id === "Yale-Link" || event.target.id === "Cornell-Link")) {
            let newText = event.target.id === "Yale-Link" ? "[Go Bulldogs!]" : "[Weill Cornell Medicine]";
            event.target.innerText = newText;
            event.target.style.color = event.target.id === "Yale-Link" ? "#00356b" : "";
            event.target.setAttribute('data-text', newText);
            event.target.classList.add('glitch');
        }

        if (event.target && event.target.id === "section-button") {
            event.target.setAttribute('data-text',  event.target.innerText);
            event.target.classList.add('glitch');
        }

        
    });

    document.addEventListener("mouseout", function(event) {
        if (event.target && event.target.id === "Yale-Link") {
            event.target.innerText = "\[Yale University\]";
            event.target.style.color = ""; // Reset color
            // Ensure we only remove the glitch class if it's not the active link

        }



        if (!event.target.classList.contains('active')) {
            event.target.classList.remove('glitch');
        }
    });

    function randomGlitch(element, minDelay, maxDelay) {
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        setTimeout(() => {
            element.classList.add('glitch');
            setTimeout(() => {
                element.classList.remove('glitch');
                randomGlitch(element, minDelay, maxDelay);
            }, 200); // Duration of the glitch
        }, delay);
    }

    randomGlitch(header, 1000, 5000);

    
    showSection('home'); // Ensure the "Home" section is displayed by default

});

document.addEventListener('DOMContentLoaded', function() {
    // Get all lesson links and lesson content divs
    const lessonLinks = document.querySelectorAll('.lesson-nav a[data-lesson]');
    const lessons = document.querySelectorAll('.lesson');
    
    // Function to show a specific lesson
    function showLesson(lessonId) {
        // Hide all lessons
        lessons.forEach(lesson => {
            lesson.classList.remove('active');
        });
        
        // Remove active class from all links
        lessonLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show the selected lesson
        const selectedLesson = document.getElementById(lessonId);
        if (selectedLesson) {
            selectedLesson.classList.add('active');
        }
        
        // Add active class to the clicked link
        const activeLink = document.querySelector(`[data-lesson="${lessonId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Scroll to top of content
        window.scrollTo(0, 0);
        
        // Save current lesson to localStorage
        localStorage.setItem('currentLesson', lessonId);
    }
    
    // Add click event listeners to all lesson links
    lessonLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lessonId = this.getAttribute('data-lesson');
            showLesson(lessonId);
        });
    });
    
    // Load the last viewed lesson from localStorage or show welcome by default
    const savedLesson = localStorage.getItem('currentLesson');
    if (savedLesson && document.getElementById(savedLesson)) {
        showLesson(savedLesson);
    } else {
        showLesson('welcome');
    }
    
    // Add smooth scroll behavior for anchor links within lessons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default for same-page anchors
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const currentIndex = Array.from(lessonLinks).findIndex(link => 
                link.classList.contains('active')
            );
            
            let newIndex;
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                newIndex = currentIndex - 1;
            } else if (e.key === 'ArrowRight' && currentIndex < lessonLinks.length - 1) {
                newIndex = currentIndex + 1;
            }
            
            if (newIndex !== undefined) {
                const newLessonId = lessonLinks[newIndex].getAttribute('data-lesson');
                showLesson(newLessonId);
            }
        }
    });
});
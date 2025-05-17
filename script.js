document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const envelopeContainer = document.querySelector('.envelope-container');
    const invitationContainer = document.querySelector('.invitation-container');
    const backButton = document.querySelector('.back-button');
    const customizePanel = document.querySelector('.customize-panel');
    const panelToggle = document.querySelector('.panel-toggle');
    const colorOptions = document.querySelectorAll('.color-option');
    const updateButton = document.getElementById('updateCard');
    const printButton = document.getElementById('printCard');
    
    // Set initial theme
    document.body.classList.add('theme-royal');
    colorOptions[0].classList.add('active');
    
    // Open invitation on envelope click
    envelopeContainer.addEventListener('click', function() {
        envelopeContainer.style.display = 'none';
        invitationContainer.style.display = 'block';
        
        // Add staggered animation to elements in the invitation
        const animatedElements = document.querySelectorAll('.invitation-header, .elegant-heading, .invitation-text, .graduate-spotlight, .elegant-divider, .event-details, .honor-message, .signature');
        
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.animation = `fadeInUp 0.6s forwards`;
                element.style.animationDelay = `${index * 0.1}s`;
            }, 100);
        });
    });
    
    // Return to envelope view
    backButton.addEventListener('click', function() {
        invitationContainer.style.display = 'none';
        envelopeContainer.style.display = 'block';
    });
    
    // Toggle customize panel
    panelToggle.addEventListener('click', function() {
        customizePanel.classList.toggle('open');
    });
    
    // Color theme selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Apply theme
            applyColorTheme(theme);
        });
    });
    
    // Update card information
    updateButton.addEventListener('click', updateCardInfo);
    
    // Print card
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Add hover effect to event details
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add subtle parallax effect on mouse move
    const invitation = document.querySelector('.invitation');
    document.addEventListener('mousemove', function(e) {
        if (invitationContainer.style.display === 'block') {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            invitation.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Update card information from the form
function updateCardInfo() {
    // Get form values
    const name = document.getElementById('inputName').value;
    const time = document.getElementById('inputTime').value;
    const location = document.getElementById('inputLocation').value;
    const host = document.getElementById('inputHost').value;
    const rsvp = document.getElementById('inputRSVP').value;
    const phone = document.getElementById('inputPhone').value;
    const year = document.getElementById('yearInput').value;
    
    // Update card with new values if they're not empty
    if (name) document.getElementById('graduateName').textContent = name;
    if (time) document.getElementById('eventTime').textContent = time;
    if (location) document.getElementById('eventLocation').textContent = location;
    if (host) document.getElementById('hostName').textContent = host;
    if (rsvp) document.getElementById('rsvpDate').textContent = rsvp;
    if (phone) document.getElementById('contactPhone').textContent = phone;
    if (year) document.getElementById('yearDisplay').textContent = year;
    
    // Close customize panel
    document.querySelector('.customize-panel').classList.remove('open');
    
    // Show success notification
    showNotification('Thiệp mời đã được cập nhật!');
}

// Apply color theme to card
function applyColorTheme(theme) {
    // Remove all existing theme classes
    document.body.classList.remove(
        'theme-royal',
        'theme-elegant',
        'theme-modern',
        'theme-classic'
    );
    
    // Add selected theme class
    document.body.classList.add(`theme-${theme}`);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#fff';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.zIndex = '9999';
    notification.style.transform = 'translateY(100px)';
    notification.style.transition = 'transform 0.3s ease';
    
    const icon = notification.querySelector('i');
    icon.style.color = '#4CAF50';
    icon.style.marginRight = '10px';
    icon.style.fontSize = '20px';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

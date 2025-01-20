document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // Falling leaves animation
    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = Math.random() * 5 + 5 + 's';
        leaf.style.opacity = Math.random() * 0.3;
        
        document.querySelector('.falling-leaves').appendChild(leaf);

        // Remove leaf after animation
        leaf.addEventListener('animationend', () => {
            leaf.remove();
        });
    }

    // Create falling leaves container
    const leavesContainer = document.createElement('div');
    leavesContainer.className = 'falling-leaves';
    document.body.appendChild(leavesContainer);

    // Create leaves periodically
    setInterval(createLeaf, 3000);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scroll = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = scroll * 0.5 + 'px';
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bioItems = document.querySelectorAll('.bio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            bioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });
        });
    });

    // Active state for quick navigation
    const sections = document.querySelectorAll('section[id]');
    const quickNavBtns = document.querySelectorAll('.quick-nav-btn');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        quickNavBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href').slice(1) === current) {
                btn.classList.add('active');
            }
        });
    });

    // Toggle section functionality
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            // Toggle content
            targetContent.classList.toggle('show');
            btn.classList.toggle('collapsed');
            
            // Save state to localStorage
            const isCollapsed = !targetContent.classList.contains('show');
            localStorage.setItem(`section-${targetId}`, isCollapsed);
        });
        
        // Check saved state on load
        const targetId = btn.getAttribute('data-target');
        const isCollapsed = localStorage.getItem(`section-${targetId}`) === 'true';
        
        if (isCollapsed) {
            const targetContent = document.getElementById(targetId);
            targetContent.classList.remove('show');
            btn.classList.add('collapsed');
        }
    });

    // Toggle quick navigation
    const quickNav = document.querySelector('.quick-nav');
    const toggleNavBtn = document.querySelector('.toggle-nav-btn');
    
    toggleNavBtn.addEventListener('click', () => {
        quickNav.classList.toggle('active');
    });

    // Close quick nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!quickNav.contains(e.target)) {
            quickNav.classList.remove('active');
        }
    });

    // Close quick nav after clicking a link
    const quickNavLinks = document.querySelectorAll('.quick-nav-btn');
    quickNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            quickNav.classList.remove('active');
        });
    });

    // Tambahkan kode untuk tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Chatbot functionality
    const chatToggle = document.querySelector('.chat-toggle');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.querySelector('.close-chat');
    const sendButton = document.querySelector('#send-message');
    const userInput = document.querySelector('#user-input');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chat box
    chatToggle.addEventListener('click', () => {
        chatBox.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Add user message
            addMessage('user', message);
            
            // Get bot response
            getBotResponse(message);
            
            // Clear input
            userInput.value = '';
        }
    }

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response
    function getBotResponse(message) {
        // Simple response logic
        const responses = {
            'halo': 'Halo! Ada yang bisa saya bantu?',
            'lokasi': 'Kampung Kwau terletak di Distrik Warmare, Kabupaten Manokwari, Papua Barat.',
            'kontak': 'Anda dapat menghubungi kami di +62 123 4567 890',
            'default': 'Maaf, saya tidak mengerti. Bisa dijelaskan lebih detail?'
        };

        setTimeout(() => {
            const response = responses[message.toLowerCase()] || responses['default'];
            addMessage('bot', response);
        }, 500);
    }

    // Menangani pengiriman komentar
    const commentForm = document.getElementById('commentForm');
    const commentList = document.getElementById('commentList');
    
    // Load comments from localStorage
    loadComments();
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const rating = document.getElementById('rating').value;
        
        // Create new comment
        const comment = {
            id: Date.now(),
            name: name,
            email: email,
            message: message,
            rating: parseInt(rating),
            date: new Date().toISOString()
        };
        
        // Save comment
        saveComment(comment);
        
        // Reset form
        commentForm.reset();
        
        // Show success message
        showNotification('Komentar berhasil ditambahkan!');
    });
    
    function saveComment(comment) {
        // Get existing comments
        let comments = JSON.parse(localStorage.getItem('comments') || '[]');
        
        // Add new comment
        comments.unshift(comment);
        
        // Save to localStorage
        localStorage.setItem('comments', JSON.stringify(comments));
        
        // Refresh comment list
        loadComments();
    }
    
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        
        commentList.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">
                        <i class="fas fa-user"></i> ${comment.name}
                    </span>
                    <span class="comment-rating">
                        ${'⭐'.repeat(comment.rating)}
                    </span>
                </div>
                <div class="comment-content">
                    ${comment.message}
                </div>
                <div class="comment-date">
                    <i class="fas fa-clock"></i>
                    ${formatDate(comment.date)}
                </div>
            </div>
        `).join('');
    }
    
    function formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}); 
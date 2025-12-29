// Global state
let projects = [];
let currentProject = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        projects = await response.json();
        renderProjects();
        hideLoading();
    } catch (error) {
        console.error('Error loading projects:', error);
        hideLoading();
        showError();
    }
}

// Render projects grid
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        grid.appendChild(card);
    });
}

// Create project card element
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 100}ms`;
    card.onclick = () => openModal(project);
    
    const difficultyClass = getDifficultyClass(project.difficulty);
    const difficultyIcon = getDifficultyIcon(project.difficulty);
    
    card.innerHTML = `
        <div class="card-thumbnail">
            <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
            <div class="card-overlay">
                <span>Click to view details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                </span>
            </div>
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3>${project.title}</h3>
                <span class="badge ${difficultyClass}">${project.difficulty}</span>
            </div>
            <p class="card-description">${project.description}</p>
            <div class="card-meta">
                <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    ${project.duration}
                </span>
                <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                    </svg>
                    Level ${project.difficultyLevel}/3
                </span>
            </div>
            <div class="card-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="card-footer">
                <span>View Live Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
            </div>
        </div>
    `;
    
    return card;
}

// Open modal with project details
function openModal(project) {
    currentProject = project;
    const modal = document.getElementById('modal');
    const difficultyClass = getDifficultyClass(project.difficulty);
    
    // Set modal content
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-badge').textContent = project.difficulty;
    document.getElementById('modal-badge').className = `badge ${difficultyClass}`;
    document.getElementById('modal-duration').innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        ${project.duration}
    `;
    document.getElementById('modal-level').innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
        </svg>
        Level ${project.difficultyLevel}/3
    `;
    document.getElementById('modal-desc').textContent = project.description;
    document.getElementById('modal-iframe').src = project.liveUrl;
    document.getElementById('modal-live-link').href = project.liveUrl;
    
    // Set features
    const featuresList = document.getElementById('modal-features-list');
    featuresList.innerHTML = project.features.map(feature => `
        <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            ${feature}
        </li>
    `).join('');
    
    // Set tags
    const tagsList = document.getElementById('modal-tags-list');
    tagsList.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Show modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    
    // Clear iframe
    setTimeout(() => {
        document.getElementById('modal-iframe').src = '';
    }, 300);
}

// Scroll to projects section
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// Helper functions
function getDifficultyClass(difficulty) {
    const classes = {
        'Beginner': 'badge-beginner',
        'Intermediate': 'badge-intermediate',
        'Advanced': 'badge-advanced'
    };
    return classes[difficulty] || 'badge-beginner';
}

function getDifficultyIcon(difficulty) {
    const icons = {
        'Beginner': '🟢',
        'Intermediate': '🟡',
        'Advanced': '🔴'
    };
    return icons[difficulty] || '🟢';
}

function hideLoading() {
    const loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() => {
        loading.style.display = 'none';
    }, 300);
}

function showError() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <p style="color: #ef4444; font-size: 1.125rem; margin-bottom: 1rem;">❌ Failed to load projects</p>
            <p style="color: #94a3b8;">Please refresh the page or check your connection.</p>
        </div>
    `;
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modal').classList.contains('open')) {
        closeModal();
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements when projects are loaded
function observeElements() {
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// Call after projects are rendered
setTimeout(observeElements, 100);

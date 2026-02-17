// ===== Navigation =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ===== Scroll Animations =====
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

fadeElements.forEach(el => observer.observe(el));

// ===== Blog System =====
const blogPosts = [
  {
    id: 1,
    title: 'Building a Cloud Resume with Azure',
    date: '2024-02-01',
    tag: 'Cloud',
    excerpt: 'A walkthrough of my cloud resume challenge experience, using Azure services, Terraform for IaC, and CI/CD pipelines.',
    content: `
      <p>The Cloud Resume Challenge is a fantastic way to demonstrate cloud skills in a practical, hands-on way. Here's how I tackled it using Azure.</p>

      <h3>The Architecture</h3>
      <p>The resume itself is a static HTML/CSS site hosted on Azure. But the interesting part is everything behind it — the infrastructure is defined with Terraform (HCL), there's a visitor counter powered by a C# Azure Function and Azure Table Storage, and the whole thing is deployed via Azure Pipelines.</p>

      <h3>Infrastructure as Code</h3>
      <p>I used Terraform to provision all the Azure resources. This includes the storage account for the static site, the CDN endpoint, the Function App, and the Azure Table Storage instance. Having everything in code means the infrastructure is version-controlled and reproducible.</p>

      <h3>The API</h3>
      <p>The visitor counter is a simple Azure Function written in C#. It reads and updates a counter in Azure Table Storage each time the resume page is loaded. The function is triggered via an HTTP request from the front-end JavaScript.</p>

      <h3>CI/CD</h3>
      <p>I set up Azure Pipelines to automatically deploy changes. When I push to the main branch, the pipeline builds the function app, runs tests, updates the infrastructure with Terraform, and deploys the static site. It's a smooth workflow that makes updates effortless.</p>

      <h3>Key Takeaways</h3>
      <ul>
        <li>Terraform makes infrastructure management predictable and repeatable</li>
        <li>Azure Functions are great for lightweight serverless APIs</li>
        <li>CI/CD pipelines save enormous amounts of time once set up</li>
        <li>The challenge itself is a great way to learn by building something real</li>
      </ul>
    `
  },
  {
    id: 2,
    title: 'Managing Azure AD B2C Extension Attributes',
    date: '2026-02-16',
    tag: 'Identity',
    excerpt: 'Why I built a WPF desktop app to manage Azure AD B2C extension attributes, and the challenges of working with the Microsoft Graph API.',
    content: `
      <p>If you've worked with Azure AD B2C, you know that managing extension attributes can be painful. The Azure portal doesn't give you a great way to view or edit them per-user, and writing Graph API calls manually gets tedious fast. That's why I built the AAD B2C Extension Attribute Manager.</p>

      <h3>The Problem</h3>
      <p>Azure AD B2C uses extension attributes to store custom user data — things like loyalty program IDs, user preferences, or application-specific flags. These attributes have unwieldy names like <code>extension_abc123_CustomAttribute</code> and can only be managed through the Microsoft Graph API.</p>

      <h3>The Solution</h3>
      <p>I built a WPF desktop application in C# / .NET 8 that authenticates to your tenant, lets you search for users, and displays all their extension attributes in a clean data grid. You can edit values inline, track your changes, and save them back to Azure AD in one click.</p>

      <h3>Technical Highlights</h3>
      <ul>
        <li>Interactive browser-based authentication using <code>InteractiveBrowserCredential</code></li>
        <li>Automatic B2C extension app detection — the app finds the <code>b2c-extensions-app</code> automatically</li>
        <li>Change tracking with <code>INotifyPropertyChanged</code> so you can see exactly what you've modified</li>
        <li>Support for String, Boolean, Integer, and DateTime attribute types</li>
      </ul>

      <h3>Lessons Learned</h3>
      <p>B2C is NOT designed to be user friendly for those managing it. It took quite a bit of fiddling to get everything working smoothly, but the end result is a tool that makes managing users and extension attributes much easier.</p>
    `
  },
  {
    id: 3,
    title: 'Monitoring Home Assistant with a Dockerized C# App',
    date: '2025-01-30',
    tag: 'IoT',
    excerpt: 'How I built a lightweight monitoring solution that watches Home Assistant and power-cycles it via a smart switch when it goes unresponsive.',
    content: `
      <p>Home Assistant is the hub of my smart home, so when it goes down, everything stops working. I needed an external watchdog that could detect outages and automatically recover — without depending on Home Assistant itself.</p>

      <h3>The Approach</h3>
      <p>I wrote a simple C# console application that periodically sends HTTP GET requests to the Home Assistant health endpoint. If it gets no response after several retries, it triggers a smart switch to power-cycle the device running Home Assistant, then sends me an email notification.</p>

      <h3>Containerization</h3>
      <p>The app runs in a Docker container on a separate device, using Docker Compose for orchestration. This keeps it isolated and easy to deploy. The configuration (HA URL, smart switch API, email settings) is passed in via environment variables in the <code>compose.yaml</code>.</p>

      <h3>Key Design Decisions</h3>
      <ul>
        <li>HTTP health checks instead of ICMP ping — more reliable for detecting application-level failures</li>
        <li>Email notifications so I know when a reboot occurred and can investigate the root cause</li>
        <li>Configurable retry count and delay to avoid false positives</li>
      </ul>

      <p>It's a small project, but it's been running reliably for over a year and has saved me from several unnoticed outages.</p>
    `
  }
];

// Render blog cards
function renderBlogCards() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  // Sort by date, newest first
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  grid.innerHTML = sortedPosts.map(post => `
    <article class="blog-card fade-in" data-post-id="${post.id}">
      <div class="blog-card-content">
        <div class="blog-card-meta">
          <span class="date">${formatDate(post.date)}</span>
          <span class="tag">${post.tag}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="read-more">Read more →</span>
      </div>
    </article>
  `).join('');

  // Re-observe new fade-in elements
  grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Add click handlers
  grid.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      const postId = parseInt(card.dataset.postId);
      openBlogPost(postId);
    });
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function openBlogPost(postId) {
  const post = blogPosts.find(p => p.id === postId);
  if (!post) return;

  const overlay = document.getElementById('blog-overlay');
  const postEl = document.getElementById('blog-post-content');

  postEl.innerHTML = `
    <button class="close-btn" aria-label="Close">&times;</button>
    <h2>${post.title}</h2>
    <div class="post-meta">${formatDate(post.date)} · ${post.tag}</div>
    <div class="post-body">${post.content}</div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Close handlers
  const closeBtn = postEl.querySelector('.close-btn');
  closeBtn.addEventListener('click', closeBlogPost);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBlogPost();
  });
}

function closeBlogPost() {
  const overlay = document.getElementById('blog-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close blog overlay on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBlogPost();
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  renderBlogCards();
});

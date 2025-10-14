fetch('data.json')
.then(res => res.json())
.then(data => {
    // About / Profile
    document.getElementById('name').textContent = data.name;
    document.getElementById('brand-name').textContent = data.brand;
    document.getElementById('profile-img').src = data.profileImage;
    document.getElementById('about-text').textContent = data.aboutShort;
    document.getElementById('about-detail').textContent = data.aboutDetail;
    document.getElementById('resume-btn').href = data.resume;
    //document.getElementById('contact-email').href = `mailto:${data.contactEmail}`;
    //document.getElementById('contact-email').textContent = data.contactEmail;
    document.getElementById('location-text').textContent = data.location;

    // About list
    const aboutList = document.getElementById('about-list');
    data.aboutList.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `• ${item}`;
      aboutList.appendChild(li);
    });

// Skills
const skillsList = document.getElementById('skills-list');
Object.keys(data.skills).forEach(category => {
  const card = document.createElement('div');
  card.className = 'glass p-6 rounded-2xl border border-[rgba(255,255,255,0.04)] hover:shadow-xl transition hover-pop';
  
  // Category title
  const title = document.createElement('h4');
  title.className = 'font-semibold text-[var(--accent)] mb-3';
  title.textContent = category;
  card.appendChild(title);
  
  // Skill badges
  const badges = document.createElement('div');
  badges.className = 'flex flex-wrap gap-2';
  data.skills[category].forEach(skill => {
    const span = document.createElement('span');
    span.className = 'px-3 py-1 rounded-lg bg-[var(--panel)]/60 text-[var(--text)]';
    span.textContent = skill;
    badges.appendChild(span);
  });
  card.appendChild(badges);
  
  skillsList.appendChild(card);
});

// Projects
const projectsList = document.getElementById('projects-list');
data.projects.forEach(p => {
  const article = document.createElement('article');
  article.className = 'glass p-6 rounded-2xl border border-[rgba(255,255,255,0.04)] hover:shadow-xl transition hover-pop';

  // Create tech badges with gradient background & shadow
  const techBadges = p.tech.split(',').map(t => `
    <span class="inline-block px-3 py-1 mr-2 mb-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-[var(--bg)] text-xs font-semibold shadow-sm hover:scale-105 transform transition">
      ${t.trim()}
    </span>
  `).join('');

  article.innerHTML = `
    <h4 class="text-lg font-semibold text-[var(--text)] mb-2">${p.title}</h4>
    <p class="text-[--text]/80 font-medium mb-2">${p.objective}</p>
    <ul class="text-[--text]/75 list-disc ml-5 mb-3">
      ${p.bulletPoints.map(bp => `<li>${bp}</li>`).join('')}
    </ul>
    <div class="mb-3 text-sm">Tech:
      <div class="mt-2 flex flex-wrap">${techBadges}</div>
    </div>
    <div class="flex gap-4 text-sm">
      <a href="${p.github}" class="text-[var(--accent)] hover:underline">GitHub</a>
    </div>
  `;

  projectsList.appendChild(article);
});


    // Experience
    const expList = document.getElementById('experience-list');
    data.experience.forEach(e => {
      const div = document.createElement('div');
      div.className = 'glass p-5 rounded-2xl border border-[rgba(255,255,255,0.04)] hover:shadow-xl transition hover-pop flex gap-4';
      div.innerHTML = `
        <img src="${e.logo}" class="w-12 h-12 object-contain rounded" />
        <div>
          <h4 class="font-semibold">${e.role} - ${e.company}</h4>
          <span class="text-[--text]/75 text-sm">${e.location} | ${e.duration}</span>
          <ul class="mt-1 text-[--text]/75 list-disc ml-5">
            ${e.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `;
      expList.appendChild(div);
    });

    // Certificates
    const certList = document.getElementById('certificates-list');
    data.certificates.forEach(c => {
      const div = document.createElement('div');
      div.className = 'glass p-5 rounded-2xl border border-[rgba(255,255,255,0.04)] flex items-center gap-3 hover:shadow-xl transition hover-pop';
      div.innerHTML = `
        <img src="${c.logo}" class="w-10 h-10 object-contain" />
        <div>
          <a href="${c.url}" target="_blank" class="font-medium text-[var(--accent)] hover:underline">${c.name}</a>
          <p class="text-[--text]/75 text-sm">${c.organization}</p>
        </div>
      `;
      certList.appendChild(div);
    });

    // Education
    const eduList = document.getElementById('education-list');
    data.education.forEach(ed => {
      const div = document.createElement('div');
      div.className = 'glass p-5 rounded-2xl border border-[rgba(255,255,255,0.04)] flex items-center gap-3 hover:shadow-xl transition hover-pop';
      div.innerHTML = `
        <img src="${ed.logo}" class="w-10 h-10 object-contain" />
        <div>
          <h4 class="font-semibold">${ed.degree}</h4>
          <p class="text-[--text]/75 text-sm">${ed.institute} | ${ed.duration}</p>
        </div>
      `;
      eduList.appendChild(div);
    });

    // Socials
    const socials = document.getElementById('social-links');
    data.socials.forEach(s => {
  const a = document.createElement('a');
  a.href = s.url; 
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.title = s.platform;
  a.className = 'hover:scale-110 transition';
  
  // Check if the icon is a URL (external image) or a FontAwesome brand
  if (s.icon.startsWith('http')) {
    a.innerHTML = `<img src="${s.icon}" class="w-6 h-6"/>`;
  } else {
    a.innerHTML = `<i class="fab fa-${s.icon} text-[var(--accent)] text-xl"></i>`;
  }
  
  document.getElementById('social-links').appendChild(a);
});
// contact
    const contactLink = document.getElementById('contact-email');
    if (contactLink && data.contactEmail) {
      // Sets the clickable mail link
      contactLink.href = `mailto:${data.contactEmail}?subject=Hello!&body=I saw your portfolio and wanted to connect.`;
      contactLink.textContent = data.contactEmail;

      // Optional: override text color if too light
      contactLink.style.color = "var(--bg)";
    }


})
.catch(err => console.error(err));

// MOBILE MENU
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => { 
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
});
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
  });
});

AOS.init({ duration: 800, once: false, mirror: true, offset: 120 });

// Scroll to Top Button
const scrollBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


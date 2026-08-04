document.addEventListener('DOMContentLoaded', () => {
  // 1. STARFIELD & SHOOTING STARS CANVAS ENGINE
  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    const numStars = 220;

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.6 + 0.4,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.3 ? '#FFF' : (Math.random() > 0.5 ? '#06B6D4' : '#8B5CF6')
        });
      }
    }

    function addShootingStar() {
      if (Math.random() < 0.03) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 10 + 6,
          angle: Math.PI / 4,
          alpha: 1
        });
      }
    }

    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.abs(star.alpha);
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      addShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const endX = s.x + Math.cos(s.angle) * s.length;
        const endY = s.y + Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)');
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.globalAlpha = s.alpha;
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;

        if (s.alpha <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      requestAnimationFrame(animateStars);
    }

    initCanvas();
    animateStars();
    window.addEventListener('resize', initCanvas);
  }

  // 2. CURSOR COSMIC GLOW TRACKING
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // 3. 3D TILT EFFECT ON CARDS
  const tiltCards = document.querySelectorAll('.skill-sector-card, .cosmic-card, .timeline-space-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 4. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll('.content-sector, .solar-system-showcase, .skill-sector-card, .timeline-space-card, .cosmic-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
});

// 5. PLANET FLY-TO SCROLL FUNCTION
function scrollToSector(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// 6. INTERACTIVE SQL TERMINAL RUNNER
function runQuery(type, evt) {
  const pills = document.querySelectorAll('.sql-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (evt && evt.target) {
    evt.target.classList.add('active');
  }

  const output = document.getElementById('terminalOutput');
  if (!output) return;

  if (type === 'profile') {
    output.textContent = 
`-- Executing query...
SELECT * FROM Candidate WHERE name = 'Ankush Kumar Sharma';

+-----------------------+-------------------------------------------------+
| Metric                | Telemetry Value                                 |
+-----------------------+-------------------------------------------------+
| Name                  | Ankush Kumar Sharma                             |
| Education             | B.Tech CSE (3rd Year) @ AIET Bhubaneswar         |
| Academic Score        | 7.1 CGPA (Till 4th Semester)                    |
| Industrial Training   | Tata Tinplate CTC (June 2025 - Feb 2026 / 2026) |
| Top Honors            | BPUT Tech Fest 2nd Place (2026)                 |
+-----------------------+-------------------------------------------------+`;
  } else if (type === 'skills') {
    output.textContent = 
`-- Executing query...
SELECT skill, category, proficiency FROM Toolkit ORDER BY proficiency DESC;

+-----------------------+--------------------------------+-----------------+
| Skill                 | Category                       | Proficiency     |
+-----------------------+--------------------------------+-----------------+
| MS Excel              | Data Analytics                 | Advanced        |
| Tableau & Power BI    | Data Visualization             | High            |
| SQL Queries & DBMS    | Database Management            | Advanced        |
| C++ & Data Structures | Algorithms & Programming       | Intermediate    |
+-----------------------+--------------------------------+-----------------+`;
  } else if (type === 'metrics') {
    output.textContent = 
`-- Executing query...
SELECT metric_name, value FROM PerformanceMetrics;

+-----------------------+-------------------------------------------------+
| Metric                | Status                                          |
+-----------------------+-------------------------------------------------+
| University CGPA       | 7.1 / 10.0 (B.Tech CSE - AIET)                  |
| CodeChef Status       | Active Competitive Programmer                   |
| Social Impact         | Volunteer @ Aryan Seva Samiti NGO               |
| Sports Achievements   | Badminton, Chess & Tug of War Competitor        |
+-----------------------+-------------------------------------------------+`;
  } else if (type === 'training') {
    output.textContent = 
`-- Executing query...
SELECT facility, duration, domain FROM IndustrialTraining;

+-----------------------+--------------------------------+------------------+
| Facility              | Timeline                       | Focus Area       |
+-----------------------+--------------------------------+------------------+
| Tata Tinplate CTC     | June 2025 - Feb 2026 / June '26| Industrial Data  |
| Coursera & Deloitte   | Certified 2024-2026            | Machine Learning |
| Infosys Springboard   | Certified 2025                 | Data Pipelines   |
+-----------------------+--------------------------------+------------------+`;
  }
}

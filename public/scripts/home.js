// Script interativo para a página home - League of Legends
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎮 Inicializando página home do League of Legends...');
  
  // Inicializar todas as funcionalidades
  initializeStatsAnimation();
  initializeTimelineInteractions();
  initializeWorldsCards();
  initializeScrollAnimations();
  initializeParallaxEffects();
  initializeInteractiveTooltips();
  initializeEasterEggs();
  initializeProgressTracking();
  initializeSoundEffects();
  initializeSearchAndFilter();
  initializeAutoCarousel();
  initializeKeyboardNavigation();
  
  console.log('✨ Página home totalmente carregada e interativa!');

  // ========== ANIMAÇÃO DE CONTAGEM NAS ESTATÍSTICAS ==========
  function initializeStatsAnimation() {
    console.log('📊 Inicializando animação das estatísticas...');
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          animateNumber(entry.target);
          entry.target.dataset.animated = 'true';
        }
      });
    }, observerOptions);

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
      
      // Adicionar efeito de hover
      stat.parentElement.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05) rotateY(5deg)';
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
      
      stat.parentElement.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
      });
    });

    function animateNumber(element) {
      const text = element.textContent;
      const number = parseInt(text.replace(/[^\d]/g, ''));
      const suffix = text.replace(/[\d]/g, '');
      const duration = 2000;
      const steps = 60;
      const increment = number / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
          current = number;
          clearInterval(timer);
          // Efeito de conclusão
          element.style.transform = 'scale(1.2)';
          setTimeout(() => {
            element.style.transform = 'scale(1)';
          }, 200);
        }
        
        element.textContent = Math.floor(current) + suffix;
      }, duration / steps);
    }
  }

  // ========== TIMELINE INTERATIVA ==========
  function initializeTimelineInteractions() {
    console.log('📚 Inicializando timeline interativa...');
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      // Adicionar número do item para animações
      item.style.setProperty('--item-index', index);
      
      // Efeitos de hover melhorados
      item.addEventListener('mouseenter', function() {
        const content = this.querySelector('.timeline-content');
        content.style.transform = 'translateY(-8px) scale(1.02)';
        content.style.boxShadow = '0 20px 40px rgba(200, 169, 100, 0.4)';
        
        // Destacar a data
        const date = this.querySelector('.timeline-date');
        date.style.transform = 'scale(1.1)';
        date.style.boxShadow = '0 8px 20px rgba(200, 169, 100, 0.6)';
      });
      
      item.addEventListener('mouseleave', function() {
        const content = this.querySelector('.timeline-content');
        content.style.transform = 'translateY(0) scale(1)';
        content.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        
        const date = this.querySelector('.timeline-date');
        date.style.transform = 'scale(1)';
        date.style.boxShadow = '0 6px 15px rgba(200, 169, 100, 0.4)';
      });
      
      // Click para expandir detalhes
      item.addEventListener('click', function() {
        showTimelineDetails(this, index);
      });
    });

    function showTimelineDetails(item, index) {
      const year = item.querySelector('.timeline-date').textContent;
      const title = item.querySelector('h4').textContent;
      const description = item.querySelector('p').textContent;
      
      const detailsData = getTimelineDetails(year);
      
      createModal(`
        <div class="timeline-modal">
          <h2>${title}</h2>
          <div class="timeline-year-big">${year}</div>
          <p class="timeline-description">${description}</p>
          
          ${detailsData.extraInfo ? `
            <div class="extra-info">
              <h3>📖 Detalhes Adicionais</h3>
              <p>${detailsData.extraInfo}</p>
            </div>
          ` : ''}
          
          ${detailsData.keyFigures ? `
            <div class="key-figures">
              <h3>👥 Figuras Importantes</h3>
              <ul>
                ${detailsData.keyFigures.map(figure => `<li>${figure}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${detailsData.impact ? `
            <div class="impact">
              <h3>💫 Impacto</h3>
              <p>${detailsData.impact}</p>
            </div>
          ` : ''}
          
          <div class="timeline-navigation">
            <button onclick="navigateTimeline(${index - 1})" ${index === 0 ? 'disabled' : ''}>⬅️ Anterior</button>
            <button onclick="navigateTimeline(${index + 1})" ${index === timelineItems.length - 1 ? 'disabled' : ''}>Próximo ➡️</button>
          </div>
        </div>
      `);
    }

    // Dados adicionais para timeline
    function getTimelineDetails(year) {
      const details = {
        '2005-2006': {
          extraInfo: 'Brandon Beck e Marc Merrill eram estudantes da USC quando fundaram a Riot Games. Eles queriam criar uma empresa focada no jogador, não apenas no lucro.',
          keyFigures: ['Brandon Beck - Co-fundador', 'Marc Merrill - Co-fundador'],
          impact: 'Estabeleceu as bases filosóficas da Riot: "Player Experience First"'
        },
        '2009': {
          extraInfo: 'O jogo foi lançado com apenas 40 campeões. O primeiro campeão pós-lançamento foi Xin Zhao.',
          keyFigures: ['Steve "Guinsoo" Feak', 'Steve "Pendragon" Mescon'],
          impact: 'Revolucionou o modelo de negócio F2P para jogos competitivos'
        },
        '2013': {
          extraInfo: 'Faker tinha apenas 17 anos quando conquistou seu primeiro título mundial. Sua performance contra Ryu no OGN é lendária.',
          keyFigures: ['Lee "Faker" Sang-hyeok', 'Bae "Bang" Jun-sik', 'Lee "Wolf" Jae-wan'],
          impact: 'Estabeleceu a Coreia do Sul como potência dominante nos esports'
        }
      };
      
      return details[year] || {};
    }
  }

  // ========== CARDS DOS WORLDS INTERATIVOS ==========
  function initializeWorldsCards() {
    console.log('🏆 Inicializando cards dos Worlds...');
    
    const worldsCards = document.querySelectorAll('.worlds-card');
    
    worldsCards.forEach(card => {
      // Dados dos campeonatos
      const year = card.querySelector('.worlds-year').textContent;
      const champion = card.querySelector('.worlds-champion').textContent;
      
      // Hover effects melhorados
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) rotateY(5deg)';
        this.style.zIndex = '10';
        
        // Adicionar informações extras no hover
        if (!this.querySelector('.hover-info')) {
          const hoverInfo = document.createElement('div');
          hoverInfo.className = 'hover-info';
          hoverInfo.innerHTML = getWorldsHoverInfo(year);
          this.appendChild(hoverInfo);
        }
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg)';
        this.style.zIndex = '1';
        
        const hoverInfo = this.querySelector('.hover-info');
        if (hoverInfo) {
          hoverInfo.remove();
        }
      });
      
      // Click para detalhes completos
      card.addEventListener('click', function() {
        showWorldsDetails(year, champion);
      });
      
      // Efeito de particulas no hover para cards especiais
      if (card.classList.contains('legendary') || card.classList.contains('faker')) {
        card.addEventListener('mouseenter', function() {
          createParticleEffect(this);
        });
      }
    });

    function getWorldsHoverInfo(year) {
      const hoverData = {
        '2011': '🎮 Primeiro torneio oficial<br>💰 Prize pool: $100,000<br>📍 Local: DreamHack',
        '2013': '👑 Era Faker começa<br>🏟️ Staples Center<br>📺 32M espectadores',
        '2018': '🇨🇳 Primeira vitória chinesa<br>📊 99.6M espectadores<br>🎵 Music: RISE',
        '2023': '🐐 Faker 4º título<br>⏰ 7 anos depois<br>🏆 O maior retorno da história',
        '2024': '👑 Faker pentacampeão<br>🔥 5º título mundial<br>🌟 GOAT absoluto'
      };
      
      return hoverData[year] || `🏆 Campeonato ${year}<br>🌍 Evento histórico<br>⚡ Ano épico`;
    }

    function showWorldsDetails(year, champion) {
      const detailsData = getWorldsFullDetails(year);
      
      createModal(`
        <div class="worlds-modal">
          <h2>🏆 World Championship ${year}</h2>
          <div class="champion-highlight">${champion}</div>
          
          <div class="worlds-details-grid">
            <div class="detail-section">
              <h3>📊 Estatísticas</h3>
              <ul>
                <li>Prize Pool: ${detailsData.prizePool}</li>
                <li>Espectadores: ${detailsData.viewers}</li>
                <li>Local: ${detailsData.location}</li>
                <li>Duração: ${detailsData.duration}</li>
              </ul>
            </div>
            
            <div class="detail-section">
              <h3>🎵 Música Tema</h3>
              <p>${detailsData.theme}</p>
              <button onclick="playThemeSong('${year}')" class="theme-btn">🎵 Ouvir Tema</button>
            </div>
            
            <div class="detail-section">
              <h3>⚡ Momentos Épicos</h3>
              <ul>
                ${detailsData.epicMoments.map(moment => `<li>${moment}</li>`).join('')}
              </ul>
            </div>
            
            <div class="detail-section">
              <h3>🌟 Legacy</h3>
              <p>${detailsData.legacy}</p>
            </div>
          </div>
          
          <div class="worlds-gallery">
            <h3>🖼️ Galeria</h3>
            <div class="gallery-grid">
              ${detailsData.images.map(img => `
                <div class="gallery-item" onclick="openImageModal('${img.url}', '${img.caption}')">
                  <img src="${img.url}" alt="${img.caption}" loading="lazy">
                  <span class="caption">${img.caption}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `);
    }

    function getWorldsFullDetails(year) {
      // Base de dados completa dos Worlds
      return {
        '2013': {
          prizePool: '$2,050,000',
          viewers: '32 milhões',
          location: 'Staples Center, Los Angeles',
          duration: '1 mês',
          theme: 'Warriors by Imagine Dragons',
          epicMoments: [
            'Faker vs Ryu - Zed vs Zed outplay',
            'SKT T1 3-0 Royal Club na final',
            'Bengi Perfect Game na jungle'
          ],
          legacy: 'Estabeleceu Faker como o GOAT e os esports como entretenimento mainstream',
          images: [
            { url: '/assets/worlds/2013-faker.jpg', caption: 'Faker levantando o troféu' },
            { url: '/assets/worlds/2013-ceremony.jpg', caption: 'Cerimônia de abertura' }
          ]
        }
        // Adicionar mais anos conforme necessário
      };
    }
  }

  // ========== ANIMAÇÕES DE SCROLL ==========
  function initializeScrollAnimations() {
    console.log('📜 Inicializando animações de scroll...');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animações específicas por tipo de elemento
          if (entry.target.classList.contains('stat-card')) {
            animateStatCard(entry.target);
          } else if (entry.target.classList.contains('timeline-item')) {
            animateTimelineItem(entry.target);
          } else if (entry.target.classList.contains('worlds-card')) {
            animateWorldsCard(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observar todos os elementos animáveis
    const animatableElements = document.querySelectorAll(`
      .stat-card, .timeline-item, .worlds-card, .fact-card, 
      .impact-item, .expansion-card, .cta-section
    `);

    animatableElements.forEach(el => scrollObserver.observe(el));

    function animateStatCard(card) {
      card.style.animation = 'bounceInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    function animateTimelineItem(item) {
      const isEven = Array.from(item.parentNode.children).indexOf(item) % 2 === 0;
      item.style.animation = `slideIn${isEven ? 'Left' : 'Right'} 0.8s ease-out`;
    }

    function animateWorldsCard(card) {
      const delay = Array.from(card.parentNode.children).indexOf(card) * 0.1;
      card.style.animationDelay = `${delay}s`;
      card.style.animation = 'flipInY 0.8s ease-out both';
    }
  }

  // ========== EFEITOS PARALLAX ==========
  function initializeParallaxEffects() {
    console.log('🌊 Inicializando efeitos parallax...');
    
    const parallaxElements = document.querySelectorAll('.hero-section, .timeline-section');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
      });
    });

    // Parallax para elementos específicos
    const floatingElements = document.querySelectorAll('.stat-card, .worlds-card');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      floatingElements.forEach((element, index) => {
        const rate = (scrolled * (0.1 + index * 0.05));
        element.style.transform = `translateY(${Math.sin(rate) * 5}px)`;
      });
    });
  }

  // ========== TOOLTIPS INTERATIVOS ==========
  function initializeInteractiveTooltips() {
    console.log('💬 Inicializando tooltips interativos...');
    
    // Tooltips para termos específicos
    const tooltipTerms = {
      'Faker': 'Lee "Faker" Sang-hyeok - O maior jogador de League of Legends de todos os tempos, com 5 títulos mundiais.',
      'SKT T1': 'SK Telecom T1 (agora T1) - A organização mais bem-sucedida da história do LoL.',
      'Arcane': 'Série animada da Netflix baseada no universo de League of Legends, ganhadora do Emmy.',
      'Runeterra': 'O mundo mágico onde League of Legends acontece, com várias regiões únicas.',
      'MOBA': 'Multiplayer Online Battle Arena - Gênero de jogo competitivo 5v5.',
      'Worlds': 'Campeonato Mundial de League of Legends, o maior evento de esports do mundo.'
    };

    // Criar tooltips automáticos
    Object.keys(tooltipTerms).forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      
      document.querySelectorAll('p, li, h3, h4').forEach(element => {
        if (element.textContent.includes(term) && !element.querySelector('.tooltip-term')) {
          element.innerHTML = element.innerHTML.replace(regex, `
            <span class="tooltip-term" data-tooltip="${tooltipTerms[term]}">$&</span>
          `);
        }
      });
    });

    // Event listeners para tooltips
    document.addEventListener('mouseover', function(e) {
      if (e.target.classList.contains('tooltip-term')) {
        showTooltip(e.target, e.target.dataset.tooltip);
      }
    });

    document.addEventListener('mouseout', function(e) {
      if (e.target.classList.contains('tooltip-term')) {
        hideTooltip();
      }
    });

    function showTooltip(element, text) {
      // Remove tooltip anterior
      hideTooltip();
      
      const tooltip = document.createElement('div');
      tooltip.className = 'interactive-tooltip';
      tooltip.innerHTML = text;
      tooltip.style.cssText = `
        position: absolute;
        background: linear-gradient(145deg, #1e2d50, #2a3f68);
        color: #CDBE91;
        padding: 1rem;
        border-radius: 10px;
        border: 2px solid #C8A964;
        font-size: 0.9rem;
        max-width: 300px;
        z-index: 10000;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        animation: tooltipFadeIn 0.3s ease;
        pointer-events: none;
      `;

      document.body.appendChild(tooltip);

      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;

      // Ajustar posição se sair da tela
      const tooltipRect = tooltip.getBoundingClientRect();
      if (tooltipRect.right > window.innerWidth) {
        tooltip.style.left = `${window.innerWidth - tooltipRect.width - 20}px`;
      }
      if (tooltipRect.bottom > window.innerHeight) {
        tooltip.style.top = `${rect.top + window.scrollY - tooltipRect.height - 10}px`;
      }
    }

    function hideTooltip() {
      const tooltip = document.querySelector('.interactive-tooltip');
      if (tooltip) {
        tooltip.style.animation = 'tooltipFadeOut 0.2s ease';
        setTimeout(() => tooltip.remove(), 200);
      }
    }
  }

  // ========== EASTER EGGS ==========
  function initializeEasterEggs() {
    console.log('🥚 Inicializando easter eggs...');
    
    // Konami Code para easter egg especial
    let konamiSequence = [];
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
      konamiSequence.push(e.code);
      konamiSequence = konamiSequence.slice(-10);

      if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
        activateSpecialMode();
      }
    });

    // Click counter em Faker
    let fakerClicks = 0;
    document.querySelectorAll('.worlds-card.faker').forEach(card => {
      card.addEventListener('click', function(e) {
        fakerClicks++;
        if (fakerClicks >= 5) {
          showFakerTribute();
          fakerClicks = 0;
        }
      });
    });

    // Double click em estatísticas para surprise
    document.querySelectorAll('.stat-card').forEach(card => {
      card.addEventListener('dblclick', function() {
        createFireworks(this);
      });
    });

    function activateSpecialMode() {
      document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
      
      createModal(`
        <div class="easter-egg-modal">
          <h2>🎉 EASTER EGG ATIVADO! 🎉</h2>
          <p>Você encontrou o modo especial! Bem-vindo ao Rift Invertido!</p>
          <div class="special-effects">
            <div class="floating-emoji">⚡</div>
            <div class="floating-emoji">🏆</div>
            <div class="floating-emoji">👑</div>
            <div class="floating-emoji">🎮</div>
          </div>
          <button onclick="document.body.style.filter = 'none'; closeModal();" class="restore-btn">
            🔄 Restaurar Cores Normais
          </button>
        </div>
      `);
    }

    function showFakerTribute() {
      createModal(`
        <div class="faker-tribute">
          <h2>👑 TRIBUTO AO GOAT 👑</h2>
          <div class="faker-stats">
            <div class="goat-stat">🏆 5x Campeão Mundial</div>
            <div class="goat-stat">👑 Rei do Mid Lane</div>
            <div class="goat-stat">⚡ O Demon King</div>
            <div class="goat-stat">🐐 GOAT Indiscutível</div>
          </div>
          <p>"Hide on bush" - Lee "Faker" Sang-hyeok</p>
          <div class="crown-animation">👑</div>
        </div>
      `);
    }

    function createFireworks(element) {
      for (let i = 0; i < 20; i++) {
        const firework = document.createElement('div');
        firework.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: ${getRandomColor()};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
        `;
        
        const rect = element.getBoundingClientRect();
        firework.style.left = `${rect.left + rect.width/2}px`;
        firework.style.top = `${rect.top + rect.height/2}px`;
        
        document.body.appendChild(firework);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 100;
        
        firework.animate([
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { 
            transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
            opacity: 0 
          }
        ], {
          duration: 1000,
          easing: 'ease-out'
        }).onfinish = () => firework.remove();
      }
    }

    function getRandomColor() {
      const colors = ['#C8A964', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }

  // ========== TRACKING DE PROGRESSO ==========
  function initializeProgressTracking() {
    console.log('📊 Inicializando tracking de progresso...');
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, #C8A964, #FFD700);
      z-index: 10001;
      transition: width 0.1s ease;
      box-shadow: 0 2px 10px rgba(200, 169, 100, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', updateProgress);

    function updateProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
      
      // Efeitos especiais em marcos importantes
      if (scrollPercent >= 25 && !progressBar.dataset.milestone25) {
        showMilestone('25% da jornada épica completa! 🎮');
        progressBar.dataset.milestone25 = 'true';
      }
      if (scrollPercent >= 50 && !progressBar.dataset.milestone50) {
        showMilestone('Metade da história revelada! ⚡');
        progressBar.dataset.milestone50 = 'true';
      }
      if (scrollPercent >= 75 && !progressBar.dataset.milestone75) {
        showMilestone('Quase no final da saga! 🏆');
        progressBar.dataset.milestone75 = 'true';
      }
      if (scrollPercent >= 95 && !progressBar.dataset.milestone100) {
        showMilestone('Lenda completa! Você conhece a história! 👑');
        progressBar.dataset.milestone100 = 'true';
      }
    }

    function showMilestone(message) {
      const milestone = document.createElement('div');
      milestone.style.cssText = `
        position: fixed;
        top: 50px;
        right: 20px;
        background: linear-gradient(145deg, #C8A964, #FFD700);
        color: #0F1B3C;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10002;
        animation: milestoneSlide 3s ease-in-out;
        box-shadow: 0 8px 20px rgba(200, 169, 100, 0.4);
      `;
      milestone.textContent = message;
      
      document.body.appendChild(milestone);
      setTimeout(() => milestone.remove(), 3000);
    }
  }

  // ========== EFEITOS SONOROS ==========
  function initializeSoundEffects() {
    console.log('🔊 Inicializando efeitos sonoros...');
    
    // Toggle de som
    const soundToggle = document.createElement('button');
    soundToggle.innerHTML = '🔊';
    soundToggle.className = 'sound-toggle';
    soundToggle.style.cssText = `
      position: fixed;
      bottom: 15px;
      left: 15px;
      background: rgba(30, 45, 80, 0.9);
      color: #C8A964;
      border: 2px solid #C8A964;
      padding: 0.8rem;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      z-index: 10001;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(soundToggle);
    
    let soundEnabled = false;
    
    soundToggle.addEventListener('click', function() {
      soundEnabled = !soundEnabled;
      this.innerHTML = soundEnabled ? '🔊' : '🔇';
      this.style.background = soundEnabled ? 'rgba(200, 169, 100, 0.9)' : 'rgba(30, 45, 80, 0.9)';
      this.style.color = soundEnabled ? '#0F1B3C' : '#C8A964';
      
      if (soundEnabled) {
        playSound('ui-enable');
      }
    });

    // Sons para diferentes ações
    const sounds = {
      'hover': () => playTone(800, 0.1, 0.05),
      'click': () => playTone(1000, 0.2, 0.1),
      'milestone': () => playTone(1200, 0.5, 0.2),
      'ui-enable': () => playTone(600, 0.3, 0.15)
    };

    function playSound(soundType) {
      if (soundEnabled && sounds[soundType]) {
        sounds[soundType]();
      }
    }

    function playTone(frequency, duration, volume = 0.1) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (e) {
        console.log('Web Audio não disponível');
      }
    }

    // Adicionar sons aos elementos
    document.querySelectorAll('.stat-card, .worlds-card, .fact-card').forEach(card => {
      card.addEventListener('mouseenter', () => playSound('hover'));
      card.addEventListener('click', () => playSound('click'));
    });

    // Exportar função para uso global
    window.playThemeSong = function(year) {
      if (soundEnabled) {
        playSound('milestone');
        // Aqui você poderia integrar com uma API de música
        console.log(`🎵 Tocando tema de ${year}`);
      }
    };
  }

  // ========== BUSCA E FILTROS ==========
  function initializeSearchAndFilter() {
    console.log('🔍 Inicializando busca e filtros...');
    
    // Adicionar barra de busca
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10001;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    searchContainer.innerHTML = `
      <input type="text" placeholder="🔍 Buscar na história..." class="timeline-search">
      <div class="search-results"></div>
    `;
    
    document.body.appendChild(searchContainer);

    // Mostrar busca com Ctrl+K
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape') {
        hideSearch();
      }
    });

    const searchInput = searchContainer.querySelector('.timeline-search');
    const searchResults = searchContainer.querySelector('.search-results');

    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      if (query.length > 2) {
        performSearch(query);
      } else {
        searchResults.innerHTML = '';
      }
    });

    function toggleSearch() {
      const isVisible = searchContainer.style.opacity === '1';
      searchContainer.style.opacity = isVisible ? '0' : '1';
      searchContainer.style.pointerEvents = isVisible ? 'none' : 'auto';
      
      if (!isVisible) {
        searchInput.focus();
      }
    }

    function hideSearch() {
      searchContainer.style.opacity = '0';
      searchContainer.style.pointerEvents = 'none';
      searchInput.value = '';
      searchResults.innerHTML = '';
    }

    function performSearch(query) {
      const searchableElements = document.querySelectorAll('.timeline-content, .worlds-card, .fact-card');
      const results = [];

      searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
          const title = element.querySelector('h4, h3, .worlds-year')?.textContent || 'Resultado';
          const snippet = text.substring(text.indexOf(query) - 50, text.indexOf(query) + 100);
          
          results.push({
            title,
            snippet: snippet.replace(new RegExp(query, 'gi'), `<mark>$&</mark>`),
            element
          });
        }
      });

      displaySearchResults(results);
    }

    function displaySearchResults(results) {
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">Nenhum resultado encontrado</div>';
        return;
      }

      searchResults.innerHTML = results.map(result => `
        <div class="search-result" onclick="scrollToElement(this)" data-element="${result.element}">
          <div class="result-title">${result.title}</div>
          <div class="result-snippet">${result.snippet}</div>
        </div>
      `).join('');
    }

    window.scrollToElement = function(resultElement) {
      const targetElement = resultElement.dataset.element;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.style.animation = 'highlightPulse 2s ease';
        hideSearch();
      }
    };
  }

  // ========== CAROUSEL AUTOMÁTICO ==========
  function initializeAutoCarousel() {
    console.log('🎠 Inicializando carousel automático...');
    
    // Auto-highlight para diferentes seções
    let currentHighlight = 0;
    const highlightSections = ['.stats-showcase', '.timeline-section', '.worlds-section', '.fun-facts'];
    
    // Controles do carousel
    const carouselControls = document.createElement('div');
    carouselControls.className = 'carousel-controls';
    carouselControls.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 20px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 10001;
    `;
    
    carouselControls.innerHTML = `
      <button class="carousel-btn" onclick="toggleAutoCarousel()">⏯️</button>
      <button class="carousel-btn" onclick="nextHighlight()">⬇️</button>
      <button class="carousel-btn" onclick="prevHighlight()">⬆️</button>
    `;
    
    document.body.appendChild(carouselControls);
    
    let autoCarouselActive = false;
    let carouselInterval;

    window.toggleAutoCarousel = function() {
      autoCarouselActive = !autoCarouselActive;
      
      if (autoCarouselActive) {
        carouselInterval = setInterval(nextHighlight, 5000);
        carouselControls.querySelector('.carousel-btn').style.background = '#C8A964';
      } else {
        clearInterval(carouselInterval);
        carouselControls.querySelector('.carousel-btn').style.background = 'rgba(30, 45, 80, 0.9)';
      }
    };

    window.nextHighlight = function() {
      currentHighlight = (currentHighlight + 1) % highlightSections.length;
      highlightSection(highlightSections[currentHighlight]);
    };

    window.prevHighlight = function() {
      currentHighlight = currentHighlight === 0 ? highlightSections.length - 1 : currentHighlight - 1;
      highlightSection(highlightSections[currentHighlight]);
    };

    function highlightSection(selector) {
      // Remove highlights anteriores
      document.querySelectorAll('.section-highlight').forEach(el => {
        el.classList.remove('section-highlight');
      });

      const section = document.querySelector(selector);
      if (section) {
        section.classList.add('section-highlight');
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
          section.classList.remove('section-highlight');
        }, 3000);
      }
    }
  }

  // ========== NAVEGAÇÃO POR TECLADO ==========
  function initializeKeyboardNavigation() {
    console.log('⌨️ Inicializando navegação por teclado...');
    
    document.addEventListener('keydown', function(e) {
      // Pular para seções com números
      if (e.key >= '1' && e.key <= '6') {
        const sectionIndex = parseInt(e.key) - 1;
        const sections = ['.hero-section', '.stats-showcase', '.timeline-section', '.worlds-section', '.universe-expansion', '.cta-section'];
        
        if (sections[sectionIndex]) {
          document.querySelector(sections[sectionIndex]).scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Navegação com setas
      if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        nextHighlight();
      }
      if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        prevHighlight();
      }

      // Atalhos especiais
      if (e.key === 'h' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('.hero-section').scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Mostrar atalhos
    const helpButton = document.createElement('button');
    helpButton.innerHTML = '❓';
    helpButton.style.cssText = `
      position: fixed;
      bottom: 230px;
      left: 15px;
      background: rgba(30, 45, 80, 0.9);
      color: #C8A964;
      border: 2px solid #C8A964;
      padding: 0.8rem;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      z-index: 10001;
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(helpButton);
    
    helpButton.addEventListener('click', function() {
      createModal(`
        <div class="help-modal">
          <h2>⌨️ Atalhos de Teclado</h2>
          <div class="shortcuts-grid">
            <div class="shortcut"><kbd>Ctrl</kbd> + <kbd>K</kbd> - Buscar</div>
            <div class="shortcut"><kbd>1-6</kbd> - Pular para seção</div>
            <div class="shortcut"><kbd>Ctrl</kbd> + <kbd>↓</kbd> - Próxima seção</div>
            <div class="shortcut"><kbd>Ctrl</kbd> + <kbd>↑</kbd> - Seção anterior</div>
            <div class="shortcut"><kbd>Ctrl</kbd> + <kbd>H</kbd> - Voltar ao topo</div>
            <div class="shortcut"><kbd>Esc</kbd> - Fechar modais</div>
          </div>
          <p>🎮 Use esses atalhos para navegar como um verdadeiro invocador!</p>
        </div>
      `);
    });
  }

  // ========== FUNÇÕES UTILITÁRIAS ==========
  function createModal(content) {
    // Remove modal anterior
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
      existingModal.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 27, 60, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10002;
      animation: modalFadeIn 0.3s ease;
      backdrop-filter: blur(10px);
    `;

    const modal = document.createElement('div');
    modal.className = 'modal-content';
    modal.style.cssText = `
      background: linear-gradient(145deg, #1e2d50, #2a3f68);
      color: #CDBE91;
      padding: 2rem;
      border-radius: 15px;
      border: 2px solid #C8A964;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      position: relative;
      animation: modalSlideIn 0.4s ease;
    `;

    modal.innerHTML = content + `
      <button class="modal-close" onclick="closeModal()" style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #C8A964;
        color: #0F1B3C;
        border: none;
        padding: 0.5rem;
        border-radius: 50%;
        cursor: pointer;
        font-weight: bold;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">✕</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Fechar com clique no overlay
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Fechar com ESC
    const handleEscape = function(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  window.closeModal = function() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.style.animation = 'modalFadeOut 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    }
  };

  window.navigateTimeline = function(index) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems[index]) {
      closeModal();
      setTimeout(() => {
        timelineItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        timelineItems[index].click();
      }, 300);
    }
  };

  function createParticleEffect(element) {
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      `;
      
      const rect = element.getBoundingClientRect();
      particle.style.left = `${rect.left + Math.random() * rect.width}px`;
      particle.style.top = `${rect.top + Math.random() * rect.height}px`;
      
      document.body.appendChild(particle);
      particles.push(particle);
      
      // Animar partícula
      particle.animate([
        { 
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        },
        { 
          transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'ease-out'
      }).onfinish = () => {
        particle.remove();
      };
    }
  }

  // ========== CSS ADICIONAL DINÂMICO ==========
  const additionalStyles = `
    <style>
      @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes modalFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      
      @keyframes modalSlideIn {
        from { transform: translateY(-50px) scale(0.9); }
        to { transform: translateY(0) scale(1); }
      }
      
      @keyframes tooltipFadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes tooltipFadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
      }
      
      @keyframes bounceInUp {
        0% { opacity: 0; transform: translateY(100px) scale(0.8); }
        60% { opacity: 1; transform: translateY(-10px) scale(1.1); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes flipInY {
        from { opacity: 0; transform: rotateY(-90deg); }
        to { opacity: 1; transform: rotateY(0); }
      }
      
      @keyframes highlightPulse {
        0%, 100% { box-shadow: 0 0 0 rgba(200, 169, 100, 0.5); }
        50% { box-shadow: 0 0 30px rgba(200, 169, 100, 0.8); }
      }
      
      @keyframes milestoneSlide {
        0% { transform: translateX(100px); opacity: 0; }
        10% { transform: translateX(0); opacity: 1; }
        90% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100px); opacity: 0; }
      }
      
      .section-highlight {
        outline: 3px solid #C8A964 !important;
        outline-offset: 10px;
        animation: highlightPulse 2s ease !important;
      }
      
      .tooltip-term {
        color: #C8A964;
        cursor: help;
        text-decoration: underline;
        text-decoration-style: dotted;
      }
      
      .tooltip-term:hover {
        background: rgba(200, 169, 100, 0.2);
        padding: 2px 4px;
        border-radius: 3px;
      }
      
      .timeline-search {
        width: 300px;
        padding: 0.8rem 1rem;
        border-radius: 25px;
        border: 2px solid #C8A964;
        background: rgba(30, 45, 80, 0.9);
        color: #CDBE91;
        font-size: 1rem;
        backdrop-filter: blur(10px);
      }
      
      .timeline-search:focus {
        outline: none;
        box-shadow: 0 0 20px rgba(200, 169, 100, 0.5);
      }
      
      .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(30, 45, 80, 0.95);
        border-radius: 10px;
        border: 2px solid #C8A964;
        max-height: 300px;
        overflow-y: auto;
        backdrop-filter: blur(10px);
      }
      
      .search-result {
        padding: 1rem;
        cursor: pointer;
        border-bottom: 1px solid rgba(200, 169, 100, 0.2);
      }
      
      .search-result:hover {
        background: rgba(200, 169, 100, 0.1);
      }
      
      .result-title {
        font-weight: bold;
        color: #C8A964;
        margin-bottom: 0.5rem;
      }
      
      .result-snippet {
        font-size: 0.9rem;
        color: #CDBE91;
      }
      
      .carousel-btn {
        background: rgba(30, 45, 80, 0.9);
        color: #C8A964;
        border: 2px solid #C8A964;
        padding: 0.5rem;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }
      
      .carousel-btn:hover {
        background: #C8A964;
        color: #0F1B3C;
      }
      
      .shortcuts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
      }
      
      .shortcut {
        background: rgba(200, 169, 100, 0.1);
        padding: 0.8rem;
        border-radius: 8px;
        border-left: 3px solid #C8A964;
      }
      
      kbd {
        background: #C8A964;
        color: #0F1B3C;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-family: monospace;
        font-weight: bold;
      }
      
      .hover-info {
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        background: rgba(200, 169, 100, 0.9);
        color: #0F1B3C;
        padding: 0.5rem;
        border-radius: 0 0 15px 15px;
        font-size: 0.8rem;
        animation: slideUpInfo 0.3s ease;
      }
      
      @keyframes slideUpInfo {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .floating-emoji {
        position: absolute;
        font-size: 3rem;
        animation: floatEmoji 3s ease-in-out infinite;
      }
      
      .floating-emoji:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
      .floating-emoji:nth-child(2) { top: 10%; right: 10%; animation-delay: 0.5s; }
      .floating-emoji:nth-child(3) { bottom: 10%; left: 10%; animation-delay: 1s; }
      .floating-emoji:nth-child(4) { bottom: 10%; right: 10%; animation-delay: 1.5s; }
      
      @keyframes floatEmoji {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-20px) rotate(5deg); }
        50% { transform: translateY(-10px) rotate(-5deg); }
        75% { transform: translateY(-30px) rotate(3deg); }
      }
      
      .crown-animation {
        font-size: 4rem;
        text-align: center;
        margin: 2rem 0;
        animation: crownRotate 2s linear infinite;
      }
      
      @keyframes crownRotate {
        from { transform: rotateZ(0deg) scale(1); }
        50% { transform: rotateZ(180deg) scale(1.2); }
        to { transform: rotateZ(360deg) scale(1); }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', additionalStyles);
});
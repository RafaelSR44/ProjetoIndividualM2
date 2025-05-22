document.addEventListener('DOMContentLoaded', function() {
  // Corrigir caminhos das imagens das árvores de runas
  const treeImages = document.querySelectorAll('.tree-icon');
  treeImages.forEach(img => {
    // Verificar se o src está correto
    const currentSrc = img.src;
    if (!currentSrc.includes('/assets/runes/')) {
      const alt = img.alt;
      const treeMap = {
        'precisao': 'precision',
        'dominacao': 'domination', 
        'feiticaria': 'sorcery',
        'determinacao': 'resolve',
        'inspiracao': 'inspiration'
      };
      
      const treeName = treeMap[alt] || alt;
      img.src = `/assets/runes/${treeName}.png`;
      
      // Fallback se a imagem não carregar
      img.onerror = function() {
        this.src = '/assets/runes/placeholder.png';
      };
    }
  });

  // Gerenciar exclusão de páginas de runas
  const deleteButtons = document.querySelectorAll('.delete-rune-btn');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const runePageId = this.getAttribute('data-id');
      const runePageCard = this.closest('.rune-page-card');
      const runePageName = runePageCard.querySelector('h3').textContent;
      
      // Confirmação
      const confirmDelete = confirm(`Tem certeza que deseja excluir a página de runas "${runePageName}"?`);
      
      if (!confirmDelete) {
        return;
      }
      
      try {
        // Adicionar estado de loading
        this.disabled = true;
        this.textContent = 'Excluindo...';
        
        const response = await fetch(`/runes/${runePageId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          // Animação de saída
          runePageCard.style.opacity = '0';
          runePageCard.style.transform = 'translateY(-20px)';
          runePageCard.style.transition = 'all 0.3s ease';
          
          setTimeout(() => {
            runePageCard.remove();
            
            // Verificar se não há mais páginas
            const remainingPages = document.querySelectorAll('.rune-page-card');
            if (remainingPages.length === 0) {
              showEmptyState();
            }
          }, 300);
          
          // Mostrar mensagem de sucesso
          showMessage('Página de runas excluída com sucesso!', 'success');
          
        } else {
          const error = await response.json();
          throw new Error(error.error || 'Erro ao excluir página de runas');
        }
        
      } catch (error) {
        console.error('Erro ao excluir página de runas:', error);
        
        // Restaurar botão
        this.disabled = false;
        this.textContent = 'Excluir';
        
        // Mostrar mensagem de erro
        showMessage(`Erro ao excluir página de runas: ${error.message}`, 'error');
      }
    });
  });
  
  // Função para mostrar estado vazio
  function showEmptyState() {
    const grid = document.querySelector('.rune-pages-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="empty-rune-pages">
          <div class="card">
            <h3>Nenhuma página de runas encontrada</h3>
            <p>Você ainda não criou nenhuma página de runas. Comece criando uma nova página!</p>
            <a href="/runes/builder" class="nav-btn">Criar Primeira Página</a>
          </div>
        </div>
      `;
    }
  }
  
  // Função para mostrar mensagens
  function showMessage(text, type = 'info') {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.message-notification');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message-notification ${type}`;
    message.textContent = text;
    
    // Estilos da mensagem
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 10000;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      animation: slideInRight 0.3s ease-out;
    `;
    
    // Cores baseadas no tipo
    switch (type) {
      case 'success':
        message.style.backgroundColor = '#28a745';
        break;
      case 'error':
        message.style.backgroundColor = '#dc3545';
        break;
      default:
        message.style.backgroundColor = '#007bff';
    }
    
    document.body.appendChild(message);
    
    // Remover após 5 segundos
    setTimeout(() => {
      if (message.parentNode) {
        message.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
          if (message.parentNode) {
            message.remove();
          }
        }, 300);
      }
    }, 5000);
  }
  
  // Adicionar animações CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(300px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(300px);
      }
    }
    
    .rune-page-card {
      transition: all 0.3s ease;
    }
    
    .rune-page-card:hover {
      transform: translateY(-3px);
    }
    
    .delete-rune-btn:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  `;
  
  document.head.appendChild(style);
  
  // Melhorar visualização das runas
  enhanceRuneDisplay();
  
  function enhanceRuneDisplay() {
    const runePageCards = document.querySelectorAll('.rune-page-card');
    
    runePageCards.forEach(card => {
      // Adicionar hover effects
      card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 8px 25px rgba(200, 169, 100, 0.3)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(200, 169, 100, 0.2)';
      });
      
      // Corrigir informações das runas se necessário
      const details = card.querySelector('.rune-page-details');
      if (details) {
        const paragraphs = details.querySelectorAll('p');
        paragraphs.forEach(p => {
          // Melhorar formatação do texto
          const text = p.textContent;
          if (text.includes('undefined') || text.includes('null')) {
            p.style.color = '#ff6b6b';
            p.textContent = text.replace(/undefined|null/g, '[Erro de carregamento]');
          }
        });
      }
    });
  }
  
  // Função para atualizar timestamps
  function updateTimestamps() {
    const timestamps = document.querySelectorAll('.created-at');
    
    timestamps.forEach(timestamp => {
      const dateText = timestamp.textContent.replace('Criada em: ', '');
      const date = new Date(dateText);
      
      if (!isNaN(date.getTime())) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let relativeTime = '';
        if (diffDays === 1) {
          relativeTime = ' (ontem)';
        } else if (diffDays < 7) {
          relativeTime = ` (${diffDays} dias atrás)`;
        } else if (diffDays < 30) {
          const weeks = Math.floor(diffDays / 7);
          relativeTime = ` (${weeks} semana${weeks > 1 ? 's' : ''} atrás)`;
        }
        
        timestamp.textContent = `Criada em: ${date.toLocaleDateString()}${relativeTime}`;
      }
    });
  }
  
  // Executar atualização de timestamps
  updateTimestamps();
  
  // Adicionar funcionalidade de busca se houver muitas páginas
  const runePages = document.querySelectorAll('.rune-page-card');
  if (runePages.length > 5) {
    addSearchFunctionality();
  }
  
  function addSearchFunctionality() {
    const actionsDiv = document.querySelector('.my-runes-actions');
    if (actionsDiv) {
      const searchContainer = document.createElement('div');
      searchContainer.style.marginTop = '1rem';
      searchContainer.innerHTML = `
        <input 
          type="text" 
          id="rune-search" 
          placeholder="Buscar páginas de runas..." 
          style="
            width: 100%;
            padding: 0.8rem;
            border-radius: 5px;
            border: 1px solid #463714;
            background-color: rgba(70, 55, 20, 0.2);
            color: #CDBE91;
            margin-bottom: 1rem;
          "
        >
      `;
      
      actionsDiv.appendChild(searchContainer);
      
      const searchInput = document.getElementById('rune-search');
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        runePages.forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          const details = card.querySelector('.rune-page-details').textContent.toLowerCase();
          
          if (title.includes(searchTerm) || details.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0.5';
          }
        });
      });
    }
  }
});
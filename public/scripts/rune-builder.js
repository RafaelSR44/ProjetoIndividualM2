document.addEventListener('DOMContentLoaded', function () {
  const runeForm = document.getElementById('runeForm');
  const primaryTreeInputs = document.querySelectorAll('input[name="primaryTree"]');
  const keystoneContainer = document.getElementById('keystone-container');
  const primarySlot1Container = document.getElementById('primary-slot1-container');
  const primarySlot2Container = document.getElementById('primary-slot2-container');
  const primarySlot3Container = document.getElementById('primary-slot3-container');
  const secondaryTreeOptions = document.getElementById('secondary-tree-options');
  const secondarySlotsContainer = document.getElementById('secondary-slots-container');
  const runePreviewContent = document.getElementById('rune-preview-content');

  // Runa data - Esta seria uma versão simplificada, você pode expandir com mais dados
  const runeData = {
    precisao: {
      name: 'Precisão',
      keystones: [
        { id: 'press_the_attack', name: 'Pressione o Ataque' },
        { id: 'lethal_tempo', name: 'Ritmo Fatal' },
        { id: 'fleet_footwork', name: 'Agilidade nos Pés' },
        { id: 'conqueror', name: 'Conquistador' }
      ],
      slot1: [
        { id: 'overheal', name: 'Absorsão Vital' },
        { id: 'triumph', name: 'Triunfo' },
        { id: 'presence_of_mind', name: 'Presença de Espírito' }
      ],
      slot2: [
        { id: 'legend_alacrity', name: 'Lenda: Espontaneidade' },
        { id: 'legend_tenacity', name: 'Lenda: Aceleração' },
        { id: 'legend_bloodline', name: 'Lenda: Linhagem' }
      ],
      slot3: [
        { id: 'coup_de_grace', name: 'Golpe de Misericórdia' },
        { id: 'cut_down', name: 'Dilacerar' },
        { id: 'last_stand', name: 'Até a morte' }
      ]
    },
    dominacao: {
      name: 'Dominação',
      keystones: [
        { id: 'electrocute', name: 'Eletrocutar' },
        { id: 'dark_harvest', name: 'Colheita Sombria' },
        { id: 'hail_of_blades', name: 'Chuva de Laminas' }
      ],
      slot1: [
        { id: 'cheap_shot', name: 'Golpe Desleal' },
        { id: 'taste_of_blood', name: 'Gosto de Sangue' },
        { id: 'sudden_impact', name: 'Impacto Repentino' }
      ],
      slot2: [
        { id: 'zombie_ward', name: 'Sentinela Profunda' },
        { id: 'ghost_poro', name: 'Sexto Sentido' },
        { id: 'eyeball_collection', name: 'Lembrança Aterrorizante' }
      ],
      slot3: [
        { id: 'treasure_hunter', name: 'Caçador de Tesouros' },
        { id: 'relentless_hunter', name: 'Caçador Incansável' },
        { id: 'ultimate_hunter', name: 'Caçador Supremo' }
      ]
    },
    feiticaria: {
      name: 'Feitiçaria',
      keystones: [
        { id: 'arcane_comet', name: 'Cometa Arcano' },
        { id: 'summon_aery', name: 'Invocar Aery' },
        { id: 'phase_rush', name: 'Ímpeto Gradual' }
      ],
      slot1: [
        { id: 'axiom_arc', name: 'Arcanista do Axioma' },
        { id: 'manaflow_band', name: 'Faixa de Fluxo de Mana' },
        { id: 'nimbus_cloak', name: 'Manto de Nimbus' }
      ],
      slot2: [
        { id: 'transcendence', name: 'Transcendência' },
        { id: 'celerity', name: 'Celeridade' },
        { id: 'absolute_focus', name: 'Foco Absoluto' }
      ],
      slot3: [
        { id: 'scorch', name: 'Chamuscar' },
        { id: 'waterwalking', name: 'Caminhar Sobre Águas' },
        { id: 'gathering_storm', name: 'Tempestade Crescente' }
      ]
    },
    determinacao: {
      name: 'Determinação',
      keystones: [
        { id: 'grasp_of_the_undying', name: 'Aperto dos Mortos-vivos' },
        { id: 'aftershock', name: 'Pós-Choque' },
        { id: 'guardian', name: 'Guardião' }
      ],
      slot1: [
        { id: 'demolish', name: 'Demolir' },
        { id: 'font_of_life', name: 'Fonte da Vida' },
        { id: 'shield_bash', name: 'Golpe de Escudo' }
      ],
      slot2: [
        { id: 'conditioning', name: 'Condicionamento' },
        { id: 'second_wind', name: 'Ventos Revigorantes' },
        { id: 'bone_plating', name: 'Osso Revestido' }
      ],
      slot3: [
        { id: 'overgrowth', name: 'Crescimento Excessivo' },
        { id: 'revitalize', name: 'Revitalizar' },
        { id: 'unflinching', name: 'Inabalável' }
      ]
    },
    inspiracao: {
      name: 'Inspiração',
      keystones: [
        { id: 'glacial_augment', name: 'Aprimoramento Glacial' },
        { id: 'unsealed_spellbook', name: 'Livro de Feitiços Deslacrado' },
        { id: 'first_strike', name: 'Primeiro Ataque' }
      ],
      slot1: [
        { id: 'hextech_flashtraption', name: 'Flashtração Hextec' },
        { id: 'magical_footwear', name: 'Calçados Mágicos' },
        { id: 'perfect_timing', name: 'Reembolso' }
      ],
      slot2: [
        { id: 'time_warp_tonic', name: 'Tônico Triplo' },
        { id: 'futures_market', name: 'Tônico de Distorção no Tempo' },
        { id: 'biscuit_delivery', name: 'Entrega de Biscoitos' }
      ],
      slot3: [
        { id: 'cosmic_insight', name: 'Perspicácia Cósmica' },
        { id: 'approach_velocity', name: 'Velocidade de Aproximação' },
        { id: 'minion_dematerializer', name: 'Quebra-Galho' }
      ]
    }
  };

  // Event listeners para seleção de árvore primária
  primaryTreeInputs.forEach(input => {
    input.addEventListener('change', handlePrimaryTreeChange);
  });

  // Form submission
  runeForm.addEventListener('submit', handleFormSubmit);

  // Handler para mudança na árvore primária
  function handlePrimaryTreeChange(e) {
    const selectedTree = e.target.value;
    updateKeystoneOptions(selectedTree);
    updatePrimarySlotOptions(selectedTree);
    updateSecondaryTreeOptions(selectedTree);
    updateRunePreview();
  }

  // Atualizar opções de keystone baseado na árvore selecionada
  function updateKeystoneOptions(treeId) {
    const keystoneOptions = document.getElementById('keystone-options');
    keystoneOptions.innerHTML = '';

    const tree = runeData[treeId];
    if (!tree) return;

    tree.keystones.forEach(keystone => {
      const option = document.createElement('div');
      option.className = 'rune-option';
      option.innerHTML = `
        <input type="radio" id="keystone-${keystone.id}" name="primaryKeystone" value="${keystone.id}" required>
        <label for="keystone-${keystone.id}">
          <img src="/assets/runes/${treeId}/${keystone.id}.png" alt="${keystone.name}">
          <span>${keystone.name}</span>
        </label>
      `;
      keystoneOptions.appendChild(option);
    });

    // Add event listeners to new radio buttons
    document.querySelectorAll('input[name="primaryKeystone"]').forEach(input => {
      input.addEventListener('change', updateRunePreview);
    });

    keystoneContainer.style.display = 'block';
  }

  // Atualizar opções de slots primários baseado na árvore selecionada
  function updatePrimarySlotOptions(treeId) {
    const tree = runeData[treeId];
    if (!tree) return;

    updateSlotOptions('primary-slot1-options', tree.slot1, 'primarySlot1');
    updateSlotOptions('primary-slot2-options', tree.slot2, 'primarySlot2');
    updateSlotOptions('primary-slot3-options', tree.slot3, 'primarySlot3');

    primarySlot1Container.style.display = 'block';
    primarySlot2Container.style.display = 'block';
    primarySlot3Container.style.display = 'block';
  }

  function updateSlotOptions(containerId, options, fieldName) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    options.forEach(option => {
      const element = document.createElement('div');
      element.className = 'rune-option';
      element.innerHTML = `
        <input type="radio" id="${fieldName}-${option.id}" name="${fieldName}" value="${option.id}" required>
        <label for="${fieldName}-${option.id}">
          <img src="/assets/runes/${option.id}.png" alt="${option.name}">
          <span>${option.name}</span>
        </label>
      `;
      container.appendChild(element);
    });

    // Add event listeners to new radio buttons
    document.querySelectorAll(`input[name="${fieldName}"]`).forEach(input => {
      input.addEventListener('change', updateRunePreview);
    });
  }

  // Atualizar opções de árvore secundária (excluindo a primária)
  function updateSecondaryTreeOptions(primaryTreeId) {
    secondaryTreeOptions.innerHTML = '';

    Object.keys(runeData).forEach(treeId => {
      if (treeId !== primaryTreeId) {
        const tree = runeData[treeId];
        const option = document.createElement('div');
        option.className = 'tree-option';
        option.innerHTML = `
          <input type="radio" id="secondary-${treeId}" name="secondaryTree" value="${treeId}" required>
          <label for="secondary-${treeId}">
            <img src="/assets/runes/${treeId}.png" alt="${tree.name}">
            <span>${tree.name}</span>
          </label>
        `;
        secondaryTreeOptions.appendChild(option);
      }
    });

    // Add event listeners to new radio buttons
    document.querySelectorAll('input[name="secondaryTree"]').forEach(input => {
      input.addEventListener('change', handleSecondaryTreeChange);
    });
  }

  // Handler para mudança na árvore secundária
  function handleSecondaryTreeChange(e) {
    const selectedTree = e.target.value;
    updateSecondarySlotsOptions(selectedTree);
    updateRunePreview();
  }

  function updateSecondarySlotsOptions(treeId) {
    const tree = runeData[treeId];
    if (!tree) return;

    // Combine all slots from secondary tree
    const allSlots = [...tree.slot1, ...tree.slot2, ...tree.slot3];

    const container = document.getElementById('secondary-slots-options');
    container.innerHTML = '';

    allSlots.forEach(option => {
      const element = document.createElement('div');
      element.className = 'rune-option';
      element.innerHTML = `
        <input type="checkbox" id="secondary-${option.id}" name="secondarySlots" value="${option.id}" class="secondary-slot-checkbox">
        <label for="secondary-${option.id}">
          <img src="/assets/runes/${option.id}.png" alt="${option.name}">
          <span>${option.name}</span>
        </label>
      `;
      container.appendChild(element);
    });

    // Limit to 2 secondary slots selection
    const checkboxes = document.querySelectorAll('.secondary-slot-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const checked = document.querySelectorAll('.secondary-slot-checkbox:checked');
        if (checked.length > 2) {
          this.checked = false;
        }
        updateRunePreview();
      });
    });

    secondarySlotsContainer.style.display = 'block';
  }

  // Update rune preview
  function updateRunePreview() {
    // Get selected values
    const primaryTree = document.querySelector('input[name="primaryTree"]:checked')?.value;
    const keystone = document.querySelector('input[name="primaryKeystone"]:checked')?.value;
    const primarySlot1 = document.querySelector('input[name="primarySlot1"]:checked')?.value;
    const primarySlot2 = document.querySelector('input[name="primarySlot2"]:checked')?.value;
    const primarySlot3 = document.querySelector('input[name="primarySlot3"]:checked')?.value;
    const secondaryTree = document.querySelector('input[name="secondaryTree"]:checked')?.value;

    const secondarySlots = Array.from(document.querySelectorAll('.secondary-slot-checkbox:checked')).map(cb => cb.value);

    if (!primaryTree) {
      runePreviewContent.innerHTML = '<p class="empty-state">Selecione as runas para visualizar</p>';
      return;
    }

    // Build preview HTML
    let previewHTML = '<div class="rune-page-preview">';

    // Primary tree
    previewHTML += `
      <div class="preview-primary-tree">
        <div class="preview-tree-header">
          <img src="/assets/runes/${primaryTree}.png" alt="${runeData[primaryTree].name}" class="preview-tree-icon">
          <h4>${runeData[primaryTree].name}</h4>
        </div>
    `;

    if (keystone) {
      const keystoneObj = runeData[primaryTree].keystones.find(k => k.id === keystone);
      previewHTML += `
        <div class="preview-keystone">
          <img src="/assets/runes/${primaryTree}/${keystone}.png" alt="${keystoneObj.name}">
          <p>${keystoneObj.name}</p>
        </div>
      `;
    }

    // Display primary slots
    previewHTML += '<div class="preview-primary-slots">';

    // Add selected primary slots...
    // [similar logic for displaying each selected slot]

    previewHTML += '</div></div>';

    // Secondary tree
    if (secondaryTree) {
      previewHTML += `
        <div class="preview-secondary-tree">
          <div class="preview-tree-header">
            <img src="/assets/runes/${secondaryTree}.png" alt="${runeData[secondaryTree].name}" class="preview-tree-icon">
            <h4>${runeData[secondaryTree].name}</h4>
          </div>
      `;

      // Display secondary slots
      if (secondarySlots.length > 0) {
        previewHTML += '<div class="preview-secondary-slots">';
        // Add selected secondary slots...
        previewHTML += '</div>';
      }

      previewHTML += '</div>';
    }

    // Stat shards
    previewHTML += `
      <div class="preview-shards">
        <h4>Fragmentos Estatísticos</h4>
        <div class="preview-shard-list">
          <!-- Display selected shards -->
        </div>
      </div>
    `;

    previewHTML += '</div>';

    runePreviewContent.innerHTML = previewHTML;
  }

  // Handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Validate secondary slots selection
    const secondarySlots = document.querySelectorAll('.secondary-slot-checkbox:checked');
    if (secondarySlots.length !== 2) {
      alert('Selecione exatamente 2 runas secundárias');
      return;
    }

    // Prepare form data
    const formData = {
      name: document.getElementById('runeName').value,
      primaryTree: document.querySelector('input[name="primaryTree"]:checked').value,
      primaryKeystone: document.querySelector('input[name="primaryKeystone"]:checked').value,
      primarySlot1: document.querySelector('input[name="primarySlot1"]:checked').value,
      primarySlot2: document.querySelector('input[name="primarySlot2"]:checked').value,
      primarySlot3: document.querySelector('input[name="primarySlot3"]:checked').value,
      secondaryTree: document.querySelector('input[name="secondaryTree"]:checked').value,
      secondarySlot1: secondarySlots[0].value,
      secondarySlot2: secondarySlots[1].value,
      shard1: document.querySelector('input[name="shard1"]:checked').value,
      shard2: document.querySelector('input[name="shard2"]:checked').value,
      shard3: document.querySelector('input[name="shard3"]:checked').value,
    };

    try {
      const response = await fetch('/runes/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Página de runas salva com sucesso!');
        window.location.href = '/runes/my-runes';
      } else {
        const error = await response.json();
        alert(`Erro ao salvar página de runas: ${error.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar página de runas:', error);
      alert('Erro ao salvar página de runas. Tente novamente mais tarde.');
    }
  }
});
/**
 * Portfolio Logic - Mateo Martinez (@matechino1319)
 */

document.addEventListener('DOMContentLoaded', () => {
  initFiltering();
  initModal();
});

const PROJECT_DETAILS = {
  'yunta': {
    title: 'Yunta — Ecosistema de Automatización Empresarial',
    tag: 'SUITE DE 7 MÓDULOS',
    html: `
      <h4>1. Chatbot de Instagram</h4>
      <p>Agente automatizado conectado mediante webhooks a n8n. Responde consultas frecuentes, califica prospectos y recopila datos de contacto automáticamente.</p>
      
      <h4>2. Chatbot de Sistemas</h4>
      <p>Asistente interno para empleados conectado a WhatsApp mediante Twilio y base de datos Supabase (PostgreSQL). Gestiona tickets y pedidos de soporte de manera conversacional.</p>
      
      <h4>3. Panel de Scripts Web</h4>
      <p>Dashboard web que permite al equipo administrativo ejecutar scripts en segundo plano para procesar informes biométricos, liquidaciones de convenios y reportes de empleados.</p>
      
      <h4>4. Monitor de Puertos</h4>
      <p>Servicio en segundo plano (PowerShell) que monitorea las conexiones de red de los servidores locales. Si detecta un puerto nuevo no autorizado, envía una alerta push inmediata a Telegram.</p>
      
      <h4>5. Gestión de Alquileres & IPC</h4>
      <p>Sistema para administrar propiedades y contratos de locales comerciales. Calcula de forma automática los incrementos acumulados según el Índice de Precios al Consumidor (IPC).</p>
      
      <h4>6. Automatización de Promociones</h4>
      <p>Scripts en Python que analizan las ventas de cajeros y generan reportes de descuentos y beneficios aplicados a jubilados y vecinos.</p>
      
      <h4>7. Analizador de Particiones</h4>
      <p>Herramienta para el diagnóstico y monitoreo de espacio en discos duros para prevenir saturación de servidores.</p>
    `
  },
  'traductor-lsa': {
    title: 'Traductor de Lengua de Señas Argentina (LSA)',
    tag: 'VISIÓN ARTIFICIAL',
    html: `
      <h4>Captura y Extracción de Puntos</h4>
      <p>Utiliza MediaPipe para extraer en tiempo real 42 puntos 3D de las articulaciones de las manos desde la cámara web.</p>
      <div class="modal-code-block">Cámara Web → MediaPipe (42 Puntos 3D) → Vector Normalizado</div>
      <h4>Clasificación & Streaming</h4>
      <p>Un servidor FastAPI recibe las coordenadas por WebSockets a 30 FPS, clasifica la seña y devuelve la palabra traducida con síntesis de voz en el navegador.</p>
    `
  },
  'atom': {
    title: 'ATOM — Asistente de Escritorio por Voz',
    tag: 'AUTOMATIZACIÓN WINDOWS & LLM',
    html: `
      <h4>Detección de Voz</h4>
      <p>Monitoreo continuo del micrófono que activa el asistente únicamente al escuchar la palabra clave <i>"Atom"</i>.</p>
      <div class="modal-code-block">Micrófono → Detección Wake-Word → Inferencia Groq → Automatizaciones</div>
      <h4>Control de Aplicaciones</h4>
      <p>Integra Windows UIAutomation para redactar y enviar mensajes en WhatsApp Desktop, Selenium para controlar música en YouTube saltando publicidad, y lanzamiento de aplicaciones.</p>
    `
  },
  'roma': {
    title: 'Roma Automotores — Calculadora de Crédito Prendario',
    tag: 'FINANZAS & APIS',
    html: `
      <h4>Motor de Cálculo Financiero</h4>
      <p>Implementación matemática para simular planes de crédito prendario (PSA Finance y UVA), calculando cuotas fijas, gastos de transferencia, sellados y aforos según año del vehículo.</p>
      <div class="modal-code-block">Frontend Operador → Backend Flask → roma_prendario.py → InfoAuto API</div>
      <h4>Integración InfoAuto</h4>
      <p>Conexión en tiempo real con la API oficial de InfoAuto para consultar listas de precios y marcas actualizadas al instante.</p>
    `
  }
};

function initFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initModal() {
  const modal = document.getElementById('detail-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalBody = document.getElementById('modal-body');
  const inspectBtns = document.querySelectorAll('.btn-outline');

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const data = PROJECT_DETAILS[targetId];

      if (data) {
        modalTitle.textContent = data.title;
        modalTag.textContent = data.tag;
        modalBody.innerHTML = data.html;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

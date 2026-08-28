/**
 * Portfolio Logic - Mateo Martinez (@matechino1319)
 */

document.addEventListener('DOMContentLoaded', () => {
  initFiltering();
  initModal();
});

const PROJECT_DETAILS = {
  'chatbot-instagram': {
    title: 'Chatbot de Instagram',
    tag: 'AUTOMATIZACIÓN & FLUX N8N',
    html: `
      <h4>Funcionamiento</h4>
      <p>Agente conectado a la API de Instagram mediante webhooks en n8n. Responde automáticamente a mensajes directos (DMs) entrantes, detecta intención de compra y califica prospectos comerciales sin demoras.</p>
      <div class="modal-code-block">Instagram DM → Webhook n8n → Router de Intención → Respuesta Automatizada</div>
      <h4>Tecnologías</h4>
      <p>n8n, Instagram Graph API, Webhooks, JSON.</p>
    `
  },
  'chatbot-sistemas': {
    title: 'Chatbot de Sistemas',
    tag: 'HELP DESK & CONVERSACIONAL',
    html: `
      <h4>Funcionamiento</h4>
      <p>Mesa de ayuda conversacional interna para el personal de la empresa vía WhatsApp. Utiliza Twilio para la mensajería y Supabase (PostgreSQL) para gestionar el historial de sesiones y tickets de soporte.</p>
      <div class="modal-code-block">WhatsApp (Empleado) → Twilio Trigger → n8n → Supabase DB</div>
      <h4>Tecnologías</h4>
      <p>Twilio WhatsApp API, Supabase, PostgreSQL, n8n.</p>
    `
  },
  'panel-scripts': {
    title: 'Panel de Scripts Web',
    tag: 'GESTIÓN & AUTOMATIZACIÓN',
    html: `
      <h4>Funcionamiento</h4>
      <p>Aplicación web que permite a los operadores administrativos ejecutar procesos en segundo plano: cálculo de presentismo biométrico, reportes de convenios colectivos y liquidaciones de sueldos.</p>
      <div class="modal-code-block">UI Web → Backend Flask → Ejecutor Asíncrono → Reporte Excel/CSV</div>
      <h4>Tecnologías</h4>
      <p>Python, Flask, SQLite, HTML5, CSS3, JavaScript.</p>
    `
  },
  'monitor-puertos': {
    title: 'Monitor de Puertos de Red',
    tag: 'SEGURIDAD & TELEMETRÍA',
    html: `
      <h4>Funcionamiento</h4>
      <p>Servicio continuo en PowerShell que analiza los sockets TCP/UDP abiertos en los servidores. Compara contra un baseline de puertos permitidos y ante conexiones extrañas envía un reporte inmediato al bot de Telegram.</p>
      <div class="modal-code-block">Socket Scanner (PowerShell) → Diff Engine → Alerta Push Telegram</div>
      <h4>Tecnologías</h4>
      <p>PowerShell Core, Windows API, Telegram Bot API.</p>
    `
  },
  'alquileres-yunta': {
    title: 'Gestión de Alquileres & Reajuste IPC',
    tag: 'FINANZAS & INMOBILIARIO',
    html: `
      <h4>Funcionamiento</h4>
      <p>Plataforma para administrar contratos de locales comerciales. Calcula de forma automática el valor de la cuota ajustada según la inflación oficial acumulada (IPC).</p>
      <div class="modal-code-block">Contrato → Índice IPC Oficial → Cálculo de Variación → Liquidación</div>
      <h4>Tecnologías</h4>
      <p>JavaScript ES6+, Python, SQLite.</p>
    `
  },
  'promociones-yunta': {
    title: 'Automatización de Promociones',
    tag: 'ANÁLISIS DE DATOS COMERCIALES',
    html: `
      <h4>Funcionamiento</h4>
      <p>Procesamiento automatizado de tickets de venta y facturación para analizar el impacto de programas de beneficios (jubilados, vecinos) y rendimiento por cajero.</p>
      <h4>Tecnologías</h4>
      <p>Python, Pandas, Análisis de Datos.</p>
    `
  },
  'analizador-particiones': {
    title: 'Analizador de Particiones',
    tag: 'DIAGNÓSTICO DE INFRAESTRUCTURA',
    html: `
      <h4>Funcionamiento</h4>
      <p>Utilidad para auditar el estado del almacenamiento en discos y servidores locales, detectando archivos huérfanos y saturación de espacio.</p>
      <h4>Tecnologías</h4>
      <p>Python, OS Utilities.</p>
    `
  },
  'traductor-lsa': {
    title: 'Traductor de Lengua de Señas (LSA)',
    tag: 'VISIÓN POR COMPUTADORA',
    html: `
      <h4>Funcionamiento</h4>
      <p>MediaPipe extrae 42 puntos 3D de las articulaciones de las manos. Un backend FastAPI procesa las coordenadas vía WebSockets y devuelve la traducción en texto y voz.</p>
      <div class="modal-code-block">Cámara → MediaPipe (42 Puntos 3D) → FastAPI WebSockets → Síntesis de Voz</div>
      <h4>Tecnologías</h4>
      <p>Python, MediaPipe, FastAPI, WebSockets, OpenCV.</p>
    `
  },
  'atom': {
    title: 'ATOM — Asistente de Escritorio por Voz',
    tag: 'AUTOMATIZACIÓN WINDOWS & LLM',
    html: `
      <h4>Funcionamiento</h4>
      <p>Asistente por voz que responde con modelos Groq Llama 3.3. Integra automatización Win32/UIAutomation para WhatsApp Desktop y Selenium para reproducir música en YouTube.</p>
      <div class="modal-code-block">Micrófono (Wake-word) → Groq Llama 3.3 → Control WhatsApp & Apps</div>
      <h4>Tecnologías</h4>
      <p>Python, Groq SDK, Edge-TTS, Win32 UIA, Selenium.</p>
    `
  },
  'roma': {
    title: 'Roma Automotores — Motor Prendario',
    tag: 'MOTOR FINANCIERO & APIS',
    html: `
      <h4>Funcionamiento</h4>
      <p>Calculadora de préstamos prendarios (PSA Finance y UVA) con consulta en vivo a la API oficial de InfoAuto para obtener precios de mercado y marcas actualizadas.</p>
      <div class="modal-code-block">Frontend Operador → Flask Backend → roma_prendario.py → InfoAuto API</div>
      <h4>Tecnologías</h4>
      <p>Python, Flask, InfoAuto API, Pytest, JavaScript.</p>
    `
  }
};

function initFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-box');

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
  const inspectBtns = document.querySelectorAll('.btn-detail');

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

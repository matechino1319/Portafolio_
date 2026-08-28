/**
 * Portfolio Interactive Logic - Mateo Martinez (@matechino1319)
 */

document.addEventListener('DOMContentLoaded', () => {
  initFiltering();
  initModal();
  initScrollEffects();
});

// Architecture Knowledge Base for Projects
const PROJECT_ARCHITECTURES = {
  'traductor-lsa': {
    title: 'Traductor de Lengua de Señas Argentina (LSA)',
    tag: 'COMPUTER VISION & WEBSOCKETS',
    html: `
      <h4>1. Pipeline de Captura & Landmarks</h4>
      <p>MediaPipe Holistic procesa el stream de video de la cámara extrayendo 42 puntos 3D de articulaciones de manos y postura normalizada respecto al plano de cámara.</p>
      <div class="modal-code-block">Camera Input (HTML5 Canvas / OpenCV)
   ↓
MediaPipe Holistic Landmark Extractor (42 Puntos 3D Normalizados)
   ↓
Feature Vector Serialization (X, Y, Z coordinates)</div>
      <h4>2. Servidor de Inferencia & WebSockets</h4>
      <p>FastAPI expone un endpoint WebSocket asíncrono que recibe los vectores normalizados, clasifica el gesto con modelos Random Forest / LSTM PyTorch y transmite la palabra traducida con síntesis de voz (Web Speech API / pyttsx3).</p>
      <h4>3. Stack Técnico</h4>
      <p>FastAPI, WebSockets, Python, MediaPipe Holistic, PyTorch, Scikit-learn, OpenCV, HTML5 Canvas.</p>
    `
  },
  'atom': {
    title: 'ATOM — Asistente Virtual IA & Automatización',
    tag: 'LLM INFERENCE & OS AUTOMATION',
    html: `
      <h4>1. Detección Wake-Word & Pipeline de Voz</h4>
      <p>Hilo daemon continuo que procesa audio ambiental con <code>SpeechRecognition</code> y activa el asistente únicamente ante la palabra clave <i>"atom"</i>.</p>
      <div class="modal-code-block">Microphone (Audio Stream)
   ↓
detector.py (Wake-Word Listener)
   ↓
brain.py (Router de Intenciones Groq Llama-3.3-70B)
   ↓
[WhatsApp UIA | YouTube Selenium | Win32 Launcher | Code Sandbox]</div>
      <h4>2. Inferencia & Automatizaciones</h4>
      <p>Groq API procesa los prompts estructurados a más de 300 tokens/segundo. Si el usuario solicita controlar WhatsApp, un controlador Win32 UIAutomation navega y redacta mensajes de forma nativa sin navegadores de fondo.</p>
      <h4>3. Stack Técnico</h4>
      <p>Python, Groq SDK (Llama 3.3), Edge-TTS, Tkinter HUD, Selenium WebDriver, Windows UIAutomation, PyAutoGUI.</p>
    `
  },
  'roma': {
    title: 'Roma Automotores — Motor Prendario & InfoAuto',
    tag: 'FINTECH & FINANCIAL ENGINES',
    html: `
      <h4>1. Motor de Amortización Prendaria</h4>
      <p>Implementación matemática pura del cálculo de cuotas fijas PSA Finance y líneas UVA según matrices oficiales de mercado.</p>
      <div class="modal-code-block">Frontend Operador (Monto, Plazo, Anticipo, Permuta)
   ↓
Flask API Gateway (backend.py)
   ↓
roma_prendario.py (Motor de Aforos, TNA, Sellados, Cuota/Ingreso)
   ↓
InfoAuto API Proxy (Valuaciones oficiales y cotización en vivo)</div>
      <h4>2. Suite de Pruebas Unitarias</h4>
      <p>Casos de prueba automatizados con Pytest que validan aforos por año del vehículo, límites de préstamo y desglose de gastos de transferencia.</p>
      <h4>3. Stack Técnico</h4>
      <p>Python 3.11, Flask, Pytest, InfoAuto REST API, Vanilla JavaScript, HTML5/CSS3.</p>
    `
  },
  'yunta': {
    title: 'Yunta Ecosystem — Suite de Automatización & Bots',
    tag: 'WORKFLOW AUTOMATION & AGENTS',
    html: `
      <h4>1. Agentes Conversacionales en Redes Sociales</h4>
      <p>Webhooks en n8n conectados a Instagram Direct y WhatsApp (vía Twilio), gestionando sesiones persistentes de usuarios en Supabase (PostgreSQL).</p>
      <div class="modal-code-block">Canales (Instagram / Twilio WhatsApp)
   ↓ Webhooks
Orquestador n8n Workflows
   ↓ Auth & Sesiones
Supabase (PostgreSQL Cloud)
   ↓
Notificaciones & Tareas en Background</div>
      <h4>2. Módulos Operativos</h4>
      <p>Panel web para lanzamiento seguro de scripts biométricos de personal, liquidaciones laborales y monitor de red con alertas en Telegram.</p>
      <h4>3. Stack Técnico</h4>
      <p>n8n, Supabase, PostgreSQL, Python, PowerShell, Twilio API, Telegram Bot API.</p>
    `
  },
  'alquileres': {
    title: 'Alquileres LY — Gestión Inmobiliaria & Algoritmo IPC',
    tag: 'REAL ESTATE ENGINE & RECURRING BILLING',
    html: `
      <h4>1. Motor de Reajuste por Inflación (IPC)</h4>
      <p>Algoritmo que calcula aumentos contractuales acumulados consultando series históricas de inflación oficial para locales comerciales.</p>
      <div class="modal-code-block">Contrato Inmobiliario (Vigencia, Base Monetaria, Cláusula)
   ↓
Algoritmo de Variación IPC Acumulada
   ↓
Liquidación de Cuota & Facturación Periódica
   ↓
Reporte Contable & Vencimientos</div>
      <h4>2. Arquitectura del Sistema</h4>
      <p>Single Page Application ligera construida con JavaScript moderno y backend modular en Python con base de datos relacional SQLite.</p>
      <h4>3. Stack Técnico</h4>
      <p>JavaScript ES6+, Python, SQLite, HTML5, CSS Glassmorphism.</p>
    `
  },
  'port-monitor': {
    title: 'Monitor de Puertos & Detección de Amenazas',
    tag: 'INFRASTRUCTURE & NETWORK TELEMETRY',
    html: `
      <h4>1. Baseline & Escaneo Diferencial</h4>
      <p>Daemon en segundo plano que aprende los puertos y procesos autorizados del sistema. Ante cualquier apertura de puerto no reconocida, dispara una alarma inmediata.</p>
      <div class="modal-code-block">System Network Stack (TCP/UDP Listeners)
   ↓
PowerShell Telemetry Daemon (Periódico cada N seg)
   ↓
Comparación contra Baseline Autorizado (Diff Engine)
   ↓ Anomaly Detected
Telegram Bot Alert (IP, Puerto, PID, Proceso)</div>
      <h4>2. Alertas Push en Vivo</h4>
      <p>Notificación con payload enriquecido (nombre del ejecutable, PID, puerto, timestamp) enviada a través de la API oficial de Telegram.</p>
      <h4>3. Stack Técnico</h4>
      <p>PowerShell Core, Windows API, Telegram Bot API.</p>
    `
  }
};

// 1. Filtering Logic
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
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 2. Modal Logic
function initModal() {
  const modal = document.getElementById('arch-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalBody = document.getElementById('modal-body');
  const inspectBtns = document.querySelectorAll('.btn-inspect');

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const data = PROJECT_ARCHITECTURES[targetId];

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

// 3. Scroll and Nav Effects
function initScrollEffects() {
  const header = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(7, 9, 14, 0.9)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.background = 'rgba(14, 19, 31, 0.65)';
      header.style.boxShadow = 'none';
    }
  });
}

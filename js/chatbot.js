/* ============================================================
   CANADA IMMIGRATION CONCIERGE — CHATBOT WIDGET
   Scripted assistant with preloaded prompts + keyword matching
   ============================================================ */

(function () {
  'use strict';

  /* ---------- KNOWLEDGE BASE ---------- */
  const responses = [
    {
      keywords: ['package', 'price', 'cost', 'how much', 'pricing', 'fee', 'buy', 'purchase', 'payment plan', 'installment'],
      reply: `We offer three flat-fee packages:<br><br>
        🥉 <strong>Soft Landing — $1,199 USD</strong><br>For singles &amp; couples. 30 days support.<br><br>
        🥇 <strong>Family Settlement — $1,999 USD</strong> ⭐ Most Popular<br>Everything families need. School search, healthcare, 60 days support.<br><br>
        💎 <strong>Premium Concierge — $2,999 USD</strong><br>White-glove service, 90 days, everything covered.`,
      link: { text: 'View all packages & pricing →', href: 'packages.html' }
    },
    {
      keywords: ['service', 'what do you do', 'what do you cover', 'help with', 'support', 'what is included', 'what\'s included'],
      reply: `We cover 10+ service categories:<br><br>
        🏡 Housing &amp; Relocation<br>
        🏛 Government Registration (SIN, health card, banking)<br>
        👨‍👩‍👧 Family, Children &amp; Schools<br>
        🏥 Healthcare Navigation<br>
        🐾 Pet Import<br>
        🚗 Vehicle Import &amp; Driver's Licence<br>
        🌈 LGBTQ+ Support<br>
        🌍 Cultural &amp; Community Connection<br>
        🏔 Lifestyle &amp; Regional Matching<br>
        🍁 Immigration pathway overview &amp; licensed referrals (always free)`,
      link: { text: 'See all services →', href: 'services.html' }
    },
    {
      keywords: ['immigration', 'visa', 'express entry', 'work permit', 'study permit', 'pr', 'permanent residency', 'citizenship', 'rcic', 'lawyer', 'application', 'sponsorship', 'nominee'],
      reply: `We are not licensed immigration consultants or lawyers — but we can give you a general overview of Canada's main immigration pathways and help you understand what's out there.<br><br>
        When you're ready to move forward with an application, we'll connect you with a licensed RCIC or Canadian immigration lawyer from our trusted partner network. <strong>The referral is always free.</strong>`,
      link: { text: 'See immigration pathways overview →', href: 'immigration.html' }
    },
    {
      keywords: ['book', 'call', 'consult', 'appointment', 'schedule', 'meeting', 'talk', 'speak', 'contact', 'reach out', 'get started', 'start'],
      reply: `We'd love to chat! 🙂<br><br>
        📞 <strong>Free 15-min Intro Call</strong> — No obligation. We discuss your move and explain exactly how we can help.<br><br>
        📅 <strong>Discovery Session — $65 USD</strong> — 30 minutes, in-depth.<br><br>
        📋 <strong>Strategy Session — $195 USD</strong> — 60 minutes + written plan.<br><br>
        Paid consultation fees are credited toward any package purchased within 30 days.`,
      link: { text: 'Book a call now →', href: 'contact.html' }
    },
    {
      keywords: ['where', 'city', 'toronto', 'vancouver', 'montreal', 'calgary', 'ottawa', 'province', 'region', 'live', 'best city', 'where to move'],
      reply: `Choosing where to live in Canada is one of the biggest decisions — and one of our specialties!<br><br>
        We compare cities based on your priorities: climate, cost of living, job market, school quality, community, and lifestyle.<br><br>
        Popular choices for Americans: Toronto, Vancouver, Calgary, Ottawa, Halifax, and Victoria.<br><br>
        Our guides cover the key trade-offs in plain language.`,
      link: { text: 'Read our moving to Canada guides →', href: 'moving-to-canada.html' }
    },
    {
      keywords: ['school', 'children', 'kids', 'child', 'education', 'daycare', 'kindergarten', 'french immersion', 'pediatric'],
      reply: `Moving with kids? We specialize in this. 👨‍👩‍👧<br><br>
        We help with: school system overview (public, Catholic, private, French immersion), school search &amp; registration, catchment zones, daycare options, pediatric care, sports programs, and more.<br><br>
        School search for up to 2 children is included in the <strong>Family Settlement</strong> and <strong>Premium Concierge</strong> packages.`,
      link: { text: 'See Family & Education services →', href: 'services.html' }
    },
    {
      keywords: ['health', 'doctor', 'healthcare', 'ohip', 'medical', 'hospital', 'prescri', 'pharmacist', 'mental health', 'therapist', 'insurance'],
      reply: `Canadian healthcare is excellent — but confusing to navigate as a newcomer. 🏥<br><br>
        We help with: provincial health card registration (there's a waiting period in most provinces), finding a family doctor, walk-in clinic guidance, specialist referrals, mental health resources, dental &amp; vision, and pharmacy setup.<br><br>
        <em>Note: We don't provide medical advice — we help you navigate the system.</em>`,
      link: { text: 'See Healthcare services →', href: 'services.html' }
    },
    {
      keywords: ['pet', 'dog', 'cat', 'animal', 'vet', 'import pet', 'bring my pet'],
      reply: `Your pets are family — we get it. 🐾<br><br>
        We help with: CFIA documentation &amp; health certificates, vaccine requirements, airline/ground transport guidance, border crossing with pets, finding vets &amp; emergency clinics, pet insurance, and local bylaws (leash laws, breed restrictions).<br><br>
        Pet import guidance is included in the <strong>Premium Concierge</strong> package, or available à la carte for $179–$299.`,
      link: { text: 'Learn about Pet relocation services →', href: 'services.html' }
    },
    {
      keywords: ['car', 'vehicle', 'drive', 'licence', 'license', 'import car', 'riv', 'import my car', 'driving'],
      reply: `Importing a vehicle involves more steps than most people expect. 🚗<br><br>
        We guide you through: the RIV (Registrar of Imported Vehicles) process, CBSA border paperwork, compliance modifications, province registration, driver's licence exchange (varies by US state), and Canadian auto insurance.<br><br>
        Driver's licence exchange guidance is included in all packages. Full vehicle import guidance is in <strong>Premium Concierge</strong> or available à la carte for $279–$429.`,
      link: { text: 'See Vehicles & Driving services →', href: 'services.html' }
    },
    {
      keywords: ['lgbtq', 'gay', 'lesbian', 'trans', 'queer', 'same-sex', 'rainbow', 'pride', 'gender'],
      reply: `Canada is one of the most progressive countries in the world for LGBTQ+ rights. 🌈<br><br>
        We help with: finding the most welcoming cities &amp; neighborhoods, LGBTQ+ community groups, inclusive healthcare providers, trans-specific healthcare navigation, faith-affirming communities, and safe housing guidance.<br><br>
        All of our services are judgment-free. Every background and identity is welcome here.`,
      link: { text: 'See LGBTQ+ support services →', href: 'services.html' }
    },
    {
      keywords: ['monthly', 'ongoing', 'subscription', 'plan', 'month', 'retainer', 'continue', 'after arrival'],
      reply: `We also offer monthly ongoing support plans:<br><br>
        📌 <strong>Essential — $499/month</strong><br>2–3 calls/month, email support, all categories.<br><br>
        ⭐ <strong>Signature — $799/month</strong><br>Weekly calls, WhatsApp access, full planning support.<br><br>
        💎 <strong>Concierge — $1,499/month</strong><br>Dedicated advisor, priority same-day response.<br><br>
        Cancel or pause anytime. Great for people still planning or wanting continued support after arrival.`,
      link: { text: 'See all monthly plans →', href: 'packages.html' }
    },
    {
      keywords: ['about', 'who are you', 'company', 'team', 'advisor', 'staff', 'language', 'english', 'french', 'spanish', 'remote'],
      reply: `We're a remote-first relocation concierge service for newcomers to Canada. 🇨🇦<br><br>
        Our team of multilingual advisors provides practical, non-legal settlement support in <strong>English, French, and Spanish</strong>.<br><br>
        We're not lawyers — we're navigators. When legal help is needed, we refer you to our RCIC partner network at no charge.<br><br>
        Every client gets a dedicated personal advisor who stays with them throughout their journey.`,
      link: { text: 'Learn more about us →', href: 'about.html' }
    },
    {
      keywords: ['faq', 'question', 'refund', 'cancel', 'how does it work', 'how long', 'timeline', 'status'],
      reply: `Great questions — our FAQ page has detailed answers on:<br><br>
        • How immigration referrals work<br>
        • Payment plans &amp; installments<br>
        • Whether you need immigration status first<br>
        • Languages we work in<br>
        • How the dedicated advisor model works<br>
        • Refund &amp; cancellation policy<br>
        • How quickly we get started`,
      link: { text: 'Read the full FAQ →', href: 'faq.html' }
    }
  ];

  const defaultReply = {
    reply: `I'm not sure I have a specific answer for that, but I'd love to help! 🙂<br><br>
      Here are some quick options:<br>
      • <a href="packages.html" style="color:#C0392B;font-weight:600">Browse packages &amp; pricing</a><br>
      • <a href="services.html" style="color:#C0392B;font-weight:600">See all services</a><br>
      • <a href="contact.html" style="color:#C0392B;font-weight:600">Book a free 15-min call</a><br>
      • <a href="faq.html" style="color:#C0392B;font-weight:600">Read the FAQ</a><br><br>
      Or email us directly at <a href="mailto:hello@canadianimmigrationconcierge.ca" style="color:#C0392B;font-weight:600">hello@canadianimmigrationconcierge.ca</a>`
  };

  const quickReplies = [
    { label: '💰 Packages & Pricing', key: 'package' },
    { label: '🏡 Services We Offer', key: 'service' },
    { label: '🍁 Immigration Pathways', key: 'immigration' },
    { label: '📞 Book a Free Call', key: 'book' },
    { label: '🍁 Where to Live in Canada', key: 'where' },
    { label: '👨‍👩‍👧 Moving with Kids', key: 'school' },
    { label: '🐾 Moving with Pets', key: 'pet' },
    { label: '🌈 LGBTQ+ Support', key: 'lgbtq' }
  ];

  /* ---------- BUILD WIDGET HTML ---------- */
  function buildWidget() {
    const widget = document.createElement('div');
    widget.id = 'cic-chat-widget';
    widget.innerHTML = `
      <button id="cic-chat-btn" aria-label="Open chat assistant">
        <span class="cic-icon-open">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </span>
        <span class="cic-icon-close">✕</span>
        <span class="cic-notification" id="cicNotif">1</span>
      </button>
      <div id="cic-chat-panel" aria-hidden="true">
        <div class="cic-header">
          <img src="images/logo.png" alt="Canada Immigration Concierge" class="cic-header-logo">
          <div class="cic-header-info">
            <strong>Immigration Assistant</strong>
            <span class="cic-status">● Online — responds instantly</span>
          </div>
          <button class="cic-close-btn" id="cicCloseBtn" aria-label="Close chat">✕</button>
        </div>
        <div class="cic-messages" id="cicMessages"></div>
        <div class="cic-quick-wrap" id="cicQuickWrap">
          <p class="cic-quick-label">Quick topics:</p>
          <div class="cic-quick-replies" id="cicQuickReplies"></div>
        </div>
        <div class="cic-input-row">
          <input type="text" id="cicInput" placeholder="Ask a question…" autocomplete="off" maxlength="200">
          <button id="cicSend" aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
  }

  /* ---------- ADD STYLES ---------- */
  function addStyles() {
    const css = `
      #cic-chat-widget {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        z-index: 9999;
        font-family: 'DM Sans', sans-serif;
      }
      #cic-chat-btn {
        width: 60px; height: 60px;
        background: #C0392B;
        color: #fff;
        border: none; border-radius: 50%;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 20px rgba(192,57,43,0.45);
        transition: transform .3s cubic-bezier(.65,0,.35,1), background .2s;
        position: relative;
      }
      #cic-chat-btn:hover { background: #8B1A11; transform: scale(1.06); }
      .cic-icon-close { display: none; font-size: 1.1rem; font-weight: 700; }
      #cic-chat-widget.open .cic-icon-open { display: none; }
      #cic-chat-widget.open .cic-icon-close { display: block; }
      .cic-notification {
        position: absolute;
        top: -4px; right: -4px;
        width: 20px; height: 20px;
        background: #1a1a1a;
        color: #fff;
        border-radius: 50%;
        font-size: 0.7rem;
        font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        border: 2px solid #fff;
        animation: cic-pulse 2s infinite;
      }
      .cic-notification.hidden { display: none; }
      @keyframes cic-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      #cic-chat-panel {
        position: absolute;
        bottom: 76px; right: 0;
        width: 360px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 12px 48px rgba(28,28,28,0.18);
        display: flex; flex-direction: column;
        overflow: hidden;
        max-height: 560px;
        opacity: 0;
        transform: translateY(12px) scale(0.96);
        pointer-events: none;
        transition: opacity .3s cubic-bezier(.65,0,.35,1), transform .3s cubic-bezier(.65,0,.35,1);
        transform-origin: bottom right;
      }
      #cic-chat-widget.open #cic-chat-panel {
        opacity: 1;
        transform: none;
        pointer-events: all;
      }
      .cic-header {
        background: #1a1a1a;
        color: #fff;
        padding: 0.9rem 1rem;
        display: flex; align-items: center; gap: 0.75rem;
        flex-shrink: 0;
      }
      .cic-header-logo { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; filter: brightness(0) invert(1); flex-shrink: 0; }
      .cic-header-info { flex: 1; }
      .cic-header-info strong { display: block; font-size: 0.88rem; }
      .cic-status { font-size: 0.72rem; color: rgba(255,255,255,0.55); }
      .cic-close-btn { background: none; border: none; color: rgba(255,255,255,0.5); font-size: 1rem; cursor: pointer; padding: 4px; line-height: 1; flex-shrink: 0; }
      .cic-close-btn:hover { color: #fff; }
      .cic-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        display: flex; flex-direction: column; gap: 0.75rem;
        scroll-behavior: smooth;
      }
      .cic-msg {
        max-width: 88%;
        padding: 0.7rem 0.9rem;
        border-radius: 12px;
        font-size: 0.84rem;
        line-height: 1.6;
        animation: cic-fade-in .25s ease;
      }
      @keyframes cic-fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      .cic-msg.bot {
        background: #FAF7F2;
        border: 1px solid rgba(28,28,28,0.08);
        color: #1a1a1a;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      .cic-msg.user {
        background: #C0392B;
        color: #fff;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
      .cic-msg a { color: #C0392B; font-weight: 600; }
      .cic-msg.bot a { color: #C0392B; }
      .cic-msg-link {
        display: inline-block;
        margin-top: 0.6rem;
        padding: 0.45rem 0.85rem;
        background: #C0392B;
        color: #fff !important;
        border-radius: 6px;
        font-size: 0.78rem;
        font-weight: 700;
        text-decoration: none;
        transition: background .2s;
      }
      .cic-msg-link:hover { background: #8B1A11; }
      .cic-typing {
        display: flex; gap: 4px; align-items: center;
        padding: 0.75rem 1rem;
        background: #FAF7F2;
        border-radius: 12px;
        border-bottom-left-radius: 4px;
        width: fit-content;
        border: 1px solid rgba(28,28,28,0.08);
      }
      .cic-typing span {
        width: 7px; height: 7px;
        background: #9A928A;
        border-radius: 50%;
        animation: cic-bounce .8s infinite;
      }
      .cic-typing span:nth-child(2) { animation-delay: .15s; }
      .cic-typing span:nth-child(3) { animation-delay: .3s; }
      @keyframes cic-bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-6px); }
      }
      .cic-quick-wrap {
        padding: 0.6rem 1rem;
        border-top: 1px solid rgba(28,28,28,0.08);
        background: #fff;
        flex-shrink: 0;
      }
      .cic-quick-label { font-size: 0.7rem; color: #9A928A; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; }
      .cic-quick-replies { display: flex; flex-wrap: wrap; gap: 0.4rem; }
      .cic-chip {
        padding: 0.35rem 0.7rem;
        background: #FAF7F2;
        border: 1px solid rgba(28,28,28,0.12);
        border-radius: 100px;
        font-size: 0.75rem;
        font-weight: 500;
        color: #5C5550;
        cursor: pointer;
        transition: background .18s, border-color .18s, color .18s;
        font-family: 'DM Sans', sans-serif;
        white-space: nowrap;
      }
      .cic-chip:hover { background: #F5E6E4; border-color: #C0392B; color: #8B1A11; }
      .cic-input-row {
        display: flex; align-items: center; gap: 0.5rem;
        padding: 0.75rem 1rem;
        border-top: 1px solid rgba(28,28,28,0.08);
        background: #fff;
        flex-shrink: 0;
      }
      #cicInput {
        flex: 1;
        border: 1.5px solid rgba(28,28,28,0.12);
        border-radius: 8px;
        padding: 0.55rem 0.8rem;
        font-size: 0.84rem;
        font-family: 'DM Sans', sans-serif;
        color: #1a1a1a;
        outline: none;
        transition: border-color .2s;
      }
      #cicInput:focus { border-color: #C0392B; }
      #cicSend {
        width: 36px; height: 36px;
        background: #C0392B;
        color: #fff;
        border: none; border-radius: 8px;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        transition: background .2s;
      }
      #cicSend:hover { background: #8B1A11; }
      @media (max-width: 420px) {
        #cic-chat-panel { width: calc(100vw - 2rem); right: 0; }
      }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- CORE LOGIC ---------- */
  let isOpen = false;

  function findResponse(text) {
    const lower = text.toLowerCase();
    for (const r of responses) {
      if (r.keywords.some(k => lower.includes(k))) return r;
    }
    return null;
  }

  function addMessage(content, type, link) {
    const msgs = document.getElementById('cicMessages');
    const div = document.createElement('div');
    div.className = `cic-msg ${type}`;
    div.innerHTML = content;
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'cic-msg-link';
      a.textContent = link.text;
      div.appendChild(document.createElement('br'));
      div.appendChild(a);
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function showTyping() {
    const msgs = document.getElementById('cicMessages');
    const div = document.createElement('div');
    div.className = 'cic-typing';
    div.id = 'cicTyping';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('cicTyping');
    if (t) t.remove();
  }

  function respond(text, isChip) {
    const label = isChip ? text : null;
    addMessage(label || text, 'user');
    hideQuickReplies();
    showTyping();
    setTimeout(() => {
      removeTyping();
      const r = findResponse(isChip ? text : text) || defaultReply;
      addMessage(r.reply, 'bot', r.link || null);
      showQuickReplies();
    }, 700 + Math.random() * 400);
  }

  function hideQuickReplies() {
    const w = document.getElementById('cicQuickWrap');
    if (w) w.style.display = 'none';
  }

  function showQuickReplies() {
    const w = document.getElementById('cicQuickWrap');
    if (w) w.style.display = '';
  }

  function toggleWidget() {
    const widget = document.getElementById('cic-chat-widget');
    const panel  = document.getElementById('cic-chat-panel');
    const notif  = document.getElementById('cicNotif');
    isOpen = !isOpen;
    widget.classList.toggle('open', isOpen);
    panel.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) {
      notif.classList.add('hidden');
      setTimeout(() => document.getElementById('cicInput')?.focus(), 350);
    }
  }

  function buildQuickReplies() {
    const container = document.getElementById('cicQuickReplies');
    quickReplies.forEach(qr => {
      const btn = document.createElement('button');
      btn.className = 'cic-chip';
      btn.textContent = qr.label;
      btn.addEventListener('click', () => {
        addMessage(qr.label, 'user');
        hideQuickReplies();
        showTyping();
        setTimeout(() => {
          removeTyping();
          const r = responses.find(res => res.keywords.includes(qr.key)) || defaultReply;
          addMessage(r.reply, 'bot', r.link || null);
          showQuickReplies();
        }, 700 + Math.random() * 300);
      });
      container.appendChild(btn);
    });
  }

  function initEvents() {
    document.getElementById('cic-chat-btn').addEventListener('click', toggleWidget);
    document.getElementById('cicCloseBtn').addEventListener('click', toggleWidget);

    const input = document.getElementById('cicInput');
    const send  = document.getElementById('cicSend');

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      respond(text, false);
    }

    send.addEventListener('click', sendMessage);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
  }

  /* ---------- INIT ---------- */
  function init() {
    addStyles();
    buildWidget();
    buildQuickReplies();
    initEvents();

    // Welcome message after short delay
    setTimeout(() => {
      addMessage(`👋 Hi! I'm the Canada Immigration Concierge assistant.<br><br>
        I can help you learn about our services, packages, and moving to Canada. What would you like to know?`, 'bot');
    }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

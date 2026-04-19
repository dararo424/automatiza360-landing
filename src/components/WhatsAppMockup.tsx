import { useEffect, useState } from 'react';

interface Message { id: number; from: 'user' | 'bot'; text: string; delay: number }
interface Scenario { label: string; emoji: string; messages: Message[] }

const SCENARIOS: Scenario[] = [
  {
    label: 'Restaurante',
    emoji: '🍽️',
    messages: [
      { id: 1, from: 'user', text: '¿Tienen el menú del día?', delay: 0 },
      { id: 2, from: 'bot', text: '¡Hola! 😊 Menú de hoy:\n\n🥗 Ensalada César $12.000\n🍝 Pasta Carbonara $18.000\n🥩 Lomo al trapo $25.000\n\n¿Te anoto algo?', delay: 1200 },
      { id: 3, from: 'user', text: '1 Pasta Carbonara por favor', delay: 3000 },
      { id: 4, from: 'bot', text: '✅ Pedido #P-042 registrado\n• 1× Pasta Carbonara $18.000\n\nTe aviso cuando esté listo 🍝', delay: 4200 },
    ],
  },
  {
    label: 'Salón de belleza',
    emoji: '💅',
    messages: [
      { id: 1, from: 'user', text: 'Quiero agendar una manicure', delay: 0 },
      { id: 2, from: 'bot', text: 'Hola 💅 Tenemos disponibilidad esta semana:\n\n• Martes 3pm con Valentina\n• Miércoles 11am con Daniela\n• Viernes 4pm con Valentina\n\n¿Cuál te queda mejor?', delay: 1200 },
      { id: 3, from: 'user', text: 'El martes 3pm', delay: 2800 },
      { id: 4, from: 'bot', text: '✅ Cita confirmada!\n\n📅 Martes, 3:00pm\n💅 Manicure con Valentina\n\nTe recuerdo el día anterior 🔔', delay: 4000 },
    ],
  },
  {
    label: 'Tienda tech',
    emoji: '💻',
    messages: [
      { id: 1, from: 'user', text: 'Cuánto vale el iPhone 15 Pro?', delay: 0 },
      { id: 2, from: 'bot', text: 'Hola! 📱 iPhone 15 Pro:\n\n• 128GB $4.890.000\n• 256GB $5.290.000\n• 512GB $5.990.000\n\nTodos con garantía 1 año. ¿Te interesa alguno?', delay: 1200 },
      { id: 3, from: 'user', text: 'El de 256GB, lo tienen en negro?', delay: 3000 },
      { id: 4, from: 'bot', text: '✅ Sí, tenemos en negro titanio.\n💳 Precio: $5.290.000\n📦 Entrega: hoy mismo\n\n¿Lo separamos?', delay: 4300 },
    ],
  },
];

export function WhatsAppMockup() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [cycle, setCycle] = useState(0);

  const scenario = SCENARIOS[scenarioIdx];

  useEffect(() => {
    setVisible([]);
    setTyping(false);
    const timers: ReturnType<typeof setTimeout>[] = [];

    scenario.messages.forEach((msg) => {
      if (msg.from === 'bot') {
        timers.push(setTimeout(() => setTyping(true), msg.delay - 700));
      }
      timers.push(setTimeout(() => {
        setTyping(false);
        setVisible((prev) => [...prev, msg.id]);
      }, msg.delay));
    });

    const lastDelay = scenario.messages[scenario.messages.length - 1].delay;
    timers.push(setTimeout(() => {
      setVisible([]);
      setTyping(false);
      setCycle((c) => c + 1);
      setScenarioIdx((i) => (i + 1) % SCENARIOS.length);
    }, lastDelay + 2500));

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  const shown = scenario.messages.filter((m) => visible.includes(m.id));

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Industry tabs */}
      <div className="flex gap-2 justify-center mb-4">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => { setScenarioIdx(i); setVisible([]); setTyping(false); setCycle((c) => c + 1); }}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              i === scenarioIdx
                ? 'bg-brand-green text-brand-dark border-brand-green font-semibold'
                : 'border-white/20 text-slate-400 hover:border-white/40'
            }`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="relative bg-[#111B21] rounded-3xl shadow-2xl overflow-hidden border border-white/10" style={{ aspectRatio: '9/16', maxHeight: '500px' }}>
        {/* Header */}
        <div className="bg-[#1F2C34] px-4 py-2.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center text-lg">
            {scenario.emoji}
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-none">Bot Automatiza360</p>
            <p className="text-green-400 text-xs mt-0.5">● en línea</p>
          </div>
        </div>

        {/* Chat */}
        <div className="px-3 py-3 space-y-2 overflow-hidden h-full pb-14" style={{ background: '#0B141A' }}>
          {shown.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-[bubbleIn_0.25s_ease-out]`}>
              <div
                className={`max-w-[82%] rounded-xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                  msg.from === 'user'
                    ? 'bg-[#005C4B] text-white rounded-tr-none'
                    : 'bg-[#1F2C34] text-slate-200 rounded-tl-none'
                }`}
                style={{ whiteSpace: 'pre-line' }}
              >
                {msg.text}
                <span className="block text-right text-[9px] opacity-40 mt-1">
                  {new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-[#1F2C34] rounded-xl rounded-tl-none px-4 py-3">
                <span className="flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1F2C34] px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-[#2A3942] rounded-full px-3 py-1.5 text-xs text-slate-500">
            Escribe un mensaje...
          </div>
          <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-brand-dark" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-4 bg-brand-green/15 rounded-3xl blur-2xl -z-10" />
    </div>
  );
}

interface Props { onBack: () => void }

export function TerminosPage({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1">
            ← Volver
          </button>
          <span className="font-display font-bold text-white">
            Automatiza<span className="text-brand-green">360</span>
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 prose prose-invert prose-slate max-w-none">
        <h1 className="font-display text-3xl font-bold text-white mb-2">Términos y Condiciones</h1>
        <p className="text-slate-400 text-sm mb-10">Última actualización: abril de 2026</p>

        <Section title="1. Aceptación de los términos">
          <p>Al registrarse, acceder o utilizar los servicios de <strong>Automatiza360</strong> (en adelante "el Servicio"), usted acepta quedar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna disposición, no podrá hacer uso del Servicio.</p>
          <p>Automatiza360 es operado por <strong>RGYT SAS</strong>, sociedad constituida conforme a las leyes de la República de Colombia.</p>
        </Section>

        <Section title="2. Descripción del servicio">
          <p>Automatiza360 es una plataforma de automatización de atención al cliente a través de WhatsApp Business API. El Servicio permite a negocios:</p>
          <ul>
            <li>Desplegar bots de inteligencia artificial para atención 24/7.</li>
            <li>Gestionar pedidos, citas, tickets y cotizaciones desde WhatsApp.</li>
            <li>Acceder a un panel de administración web con métricas e historial de conversaciones.</li>
            <li>Administrar su negocio desde WhatsApp mediante un agente de IA exclusivo para propietarios.</li>
          </ul>
          <p>El Servicio se presta en modalidad SaaS (Software como Servicio) bajo los planes descritos en nuestra página de precios.</p>
        </Section>

        <Section title="3. Registro y cuenta">
          <p>Para usar el Servicio debe crear una cuenta con información veraz, completa y actualizada. Usted es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades que ocurran bajo su cuenta.</p>
          <p>Automatiza360 se reserva el derecho de suspender o eliminar cuentas que proporcionen información falsa o que violen estos términos.</p>
        </Section>

        <Section title="4. Planes, precios y facturación">
          <p>El Servicio se ofrece en tres planes con cobro mensual en pesos colombianos (COP):</p>
          <ul>
            <li><strong>Starter:</strong> hasta 500 conversaciones únicas/mes.</li>
            <li><strong>Pro:</strong> hasta 2.000 conversaciones únicas/mes.</li>
            <li><strong>Business:</strong> conversaciones ilimitadas y funcionalidades avanzadas.</li>
          </ul>
          <p>Los precios pueden ajustarse con un aviso previo de 30 días. El cobro se realiza por anticipado al inicio de cada período. Los pagos se procesan a través de <strong>Wompi</strong> (Bancolombia). Automatiza360 no almacena datos de tarjetas de crédito.</p>
        </Section>

        <Section title="5. Período de prueba">
          <p>Todos los planes incluyen un período de prueba gratuito de <strong>14 días</strong> sin necesidad de tarjeta de crédito. Al finalizar el trial, el Servicio se suspenderá automáticamente hasta que el usuario seleccione un plan de pago. No se realizarán cobros sin consentimiento expreso.</p>
        </Section>

        <Section title="6. Cancelación y reembolsos">
          <p>El usuario puede cancelar su suscripción en cualquier momento desde el panel de control en <strong>Mi Plan → Cancelar suscripción</strong>. La cancelación es efectiva al final del período de facturación vigente; no se realizan reembolsos proporcionales por días no utilizados.</p>
          <p>Automatiza360 puede cancelar o suspender el Servicio si el usuario incumple estos términos, con o sin previo aviso según la gravedad de la infracción.</p>
        </Section>

        <Section title="7. Uso aceptable">
          <p>El usuario se compromete a no utilizar el Servicio para:</p>
          <ul>
            <li>Enviar mensajes no solicitados (spam) o campañas masivas sin consentimiento de los destinatarios.</li>
            <li>Distribuir contenido ilegal, engañoso, difamatorio, obsceno o que infrinja derechos de terceros.</li>
            <li>Suplantar identidades o realizar fraude.</li>
            <li>Vulnerar las <a href="https://www.whatsapp.com/legal/business-policy" target="_blank" rel="noopener noreferrer" className="text-brand-green">Políticas de WhatsApp Business</a> de Meta Platforms.</li>
            <li>Intentar acceder sin autorización a sistemas de otros tenants o a la infraestructura del Servicio.</li>
          </ul>
          <p>El incumplimiento de estas condiciones puede resultar en la suspensión inmediata de la cuenta y, si aplica, en la denuncia ante las autoridades competentes.</p>
        </Section>

        <Section title="8. Propiedad intelectual">
          <p>Automatiza360 y su logotipo son marcas de RGYT SAS. El código, diseño, documentación y contenidos del Servicio son propiedad exclusiva de RGYT SAS y están protegidos por las leyes de propiedad intelectual colombianas e internacionales.</p>
          <p>El usuario conserva todos los derechos sobre el contenido que cargue o genere en el Servicio (menús, catálogos, mensajes). Al utilizar el Servicio, otorga a Automatiza360 una licencia limitada para procesar dicho contenido con el único fin de prestar el Servicio.</p>
        </Section>

        <Section title="9. Disponibilidad y limitación de responsabilidad">
          <p>Automatiza360 procura mantener una disponibilidad del 99 % mensual, pero no garantiza un servicio ininterrumpido. No somos responsables de interrupciones causadas por terceros (Twilio, Google, Meta, proveedores de nube) ni por eventos de fuerza mayor.</p>
          <p>En ningún caso la responsabilidad de Automatiza360 frente al usuario superará el monto pagado por el Servicio en los últimos 3 meses.</p>
        </Section>

        <Section title="10. Servicios de terceros">
          <p>El Servicio integra tecnologías de terceros, incluyendo:</p>
          <ul>
            <li><strong>Twilio</strong> — infraestructura de mensajería WhatsApp.</li>
            <li><strong>Google Gemini</strong> — modelo de IA para el bot de atención al cliente.</li>
            <li><strong>Anthropic Claude</strong> — modelo de IA para el agente de administración.</li>
            <li><strong>Supabase / PostgreSQL</strong> — almacenamiento de datos.</li>
            <li><strong>Railway / Vercel</strong> — infraestructura en la nube.</li>
            <li><strong>Wompi</strong> — procesamiento de pagos.</li>
          </ul>
          <p>El uso de estos servicios está sujeto a los términos y políticas de privacidad de cada proveedor.</p>
        </Section>

        <Section title="11. Modificaciones">
          <p>Automatiza360 puede modificar estos Términos en cualquier momento. Los cambios serán notificados por correo electrónico con al menos 15 días de anticipación. El uso continuado del Servicio tras la fecha de vigencia de los nuevos términos implica aceptación de los mismos.</p>
        </Section>

        <Section title="12. Ley aplicable y jurisdicción">
          <p>Estos Términos se rigen por las leyes de la República de Colombia. Cualquier controversia que no pueda resolverse amigablemente será sometida a la jurisdicción de los jueces competentes de la ciudad de <strong>Bogotá D.C.</strong></p>
        </Section>

        <Section title="13. Contacto">
          <p>Para consultas sobre estos Términos y Condiciones, comuníquese con nosotros en:</p>
          <p><a href="mailto:legal@automatiza360.com" className="text-brand-green">legal@automatiza360.com</a></p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">{title}</h2>
      <div className="text-slate-300 space-y-3 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-brand-green [&_strong]:text-white">
        {children}
      </div>
    </section>
  );
}

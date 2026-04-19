interface Props { onBack: () => void }

export function PrivacidadPage({ onBack }: Props) {
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

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="font-display text-3xl font-bold text-white mb-2">Política de Privacidad y Tratamiento de Datos Personales</h1>
        <p className="text-slate-400 text-sm mb-2">Última actualización: abril de 2026</p>
        <p className="text-slate-400 text-sm mb-10">
          De conformidad con la <strong className="text-slate-300">Ley 1581 de 2012</strong> y el <strong className="text-slate-300">Decreto 1377 de 2013</strong> de la República de Colombia.
        </p>

        <Section title="1. Responsable del tratamiento">
          <p><strong>RGYT SAS</strong><br />
          NIT: [pendiente de registro]<br />
          Domicilio: Bogotá D.C., Colombia<br />
          Correo: <a href="mailto:privacidad@automatiza360.com">privacidad@automatiza360.com</a></p>
        </Section>

        <Section title="2. Datos personales que recopilamos">
          <p>Automatiza360 recopila y trata los siguientes tipos de datos:</p>
          <table>
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Datos</th>
                <th>Fuente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Datos de cuenta</td>
                <td>Nombre, correo electrónico, contraseña (hash), número de WhatsApp</td>
                <td>Registro del usuario</td>
              </tr>
              <tr>
                <td>Datos del negocio</td>
                <td>Nombre del negocio, industria, descripción, dirección, horario</td>
                <td>Configuración del tenant</td>
              </tr>
              <tr>
                <td>Datos de clientes finales</td>
                <td>Número de WhatsApp, nombre, historial de conversaciones, pedidos, citas</td>
                <td>Interacciones via WhatsApp con el bot</td>
              </tr>
              <tr>
                <td>Datos de uso</td>
                <td>Cantidad de conversaciones, fecha/hora de acceso, logs del sistema</td>
                <td>Uso del Servicio</td>
              </tr>
              <tr>
                <td>Datos de pago</td>
                <td>Solo referencia de transacción (no almacenamos datos de tarjeta)</td>
                <td>Wompi</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="3. Finalidad del tratamiento">
          <p>Los datos personales son tratados para las siguientes finalidades:</p>
          <ul>
            <li>Prestar y mejorar el Servicio de automatización de WhatsApp.</li>
            <li>Gestionar la relación contractual con el usuario (facturación, soporte, notificaciones).</li>
            <li>Procesar pagos y verificar suscripciones.</li>
            <li>Generar respuestas automáticas de los bots de IA en nombre del negocio suscrito.</li>
            <li>Enviar comunicaciones transaccionales (confirmaciones, alertas de límite, recordatorios de trial).</li>
            <li>Cumplir con obligaciones legales y regulatorias.</li>
            <li>Prevenir fraude y garantizar la seguridad del Servicio.</li>
          </ul>
          <p><strong>Automatiza360 no vende ni cede datos personales a terceros con fines comerciales.</strong></p>
        </Section>

        <Section title="4. Rol de Automatiza360 frente a los datos de clientes finales">
          <p>Cuando los clientes de un negocio suscrito interactúan con el bot de WhatsApp, Automatiza360 actúa como <strong>encargado del tratamiento</strong> en nombre del negocio (responsable). El negocio suscrito es responsable de obtener las autorizaciones necesarias de sus propios clientes para el tratamiento de sus datos mediante la plataforma.</p>
          <p>Automatiza360 procesa dichos datos únicamente para prestar el Servicio y no los utiliza para fines propios distintos a los contractualmente pactados.</p>
        </Section>

        <Section title="5. Transferencia a terceros y proveedores de nube">
          <p>Para prestar el Servicio, compartimos datos con los siguientes proveedores bajo acuerdos de confidencialidad y procesamiento de datos:</p>
          <ul>
            <li><strong>Twilio Inc.</strong> (EE.UU.) — transmisión de mensajes WhatsApp.</li>
            <li><strong>Google LLC</strong> (EE.UU.) — procesamiento de IA (Gemini).</li>
            <li><strong>Anthropic PBC</strong> (EE.UU.) — procesamiento de IA (Claude).</li>
            <li><strong>Supabase Inc.</strong> (EE.UU.) — base de datos PostgreSQL.</li>
            <li><strong>Railway Corp.</strong> (EE.UU.) — infraestructura del backend.</li>
            <li><strong>Vercel Inc.</strong> (EE.UU.) — alojamiento del frontend.</li>
            <li><strong>Bancolombia S.A. / Wompi</strong> (Colombia) — procesamiento de pagos.</li>
          </ul>
          <p>Estas transferencias internacionales se realizan bajo las garantías establecidas en la Ley 1581 de 2012 y las políticas de privacidad de cada proveedor.</p>
        </Section>

        <Section title="6. Tiempo de retención">
          <ul>
            <li><strong>Datos de cuenta activa:</strong> durante la vigencia del contrato y hasta 5 años después de la cancelación (obligaciones legales y fiscales).</li>
            <li><strong>Historial de conversaciones:</strong> 12 meses desde la fecha del mensaje.</li>
            <li><strong>Logs del sistema:</strong> 90 días.</li>
            <li><strong>Datos de facturación:</strong> 10 años (obligación tributaria colombiana).</li>
          </ul>
        </Section>

        <Section title="7. Derechos del titular">
          <p>De conformidad con la Ley 1581 de 2012, usted tiene derecho a:</p>
          <ul>
            <li><strong>Conocer</strong> los datos personales que tenemos sobre usted.</li>
            <li><strong>Actualizar y rectificar</strong> datos inexactos o incompletos.</li>
            <li><strong>Solicitar la supresión</strong> de sus datos cuando no sea necesaria su conservación.</li>
            <li><strong>Revocar la autorización</strong> para el tratamiento cuando no exista obligación legal de conservarlos.</li>
            <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC).</li>
          </ul>
          <p>Para ejercer estos derechos, envíe su solicitud a <a href="mailto:privacidad@automatiza360.com">privacidad@automatiza360.com</a>. Respondemos en un plazo máximo de 15 días hábiles.</p>
        </Section>

        <Section title="8. Seguridad">
          <p>Implementamos medidas técnicas y organizacionales para proteger sus datos:</p>
          <ul>
            <li>Cifrado TLS en todas las comunicaciones en tránsito.</li>
            <li>Contraseñas almacenadas con hash bcrypt (nunca en texto plano).</li>
            <li>Autenticación mediante JWT con expiración configurable.</li>
            <li>Aislamiento de datos por tenant — ningún negocio puede acceder a datos de otro.</li>
            <li>Acceso a producción restringido a personal autorizado.</li>
          </ul>
        </Section>

        <Section title="9. Cookies y tecnologías de seguimiento">
          <p>El sitio web utiliza cookies técnicas necesarias para el funcionamiento del panel de control (sesión de usuario). No utilizamos cookies de rastreo publicitario de terceros en el panel de administración.</p>
          <p>El sitio de marketing (<strong>automatiza360.com</strong>) puede utilizar herramientas de analítica de acceso (como Meta Pixel o Google Analytics) para medir el rendimiento de campañas. Puede desactivarlas mediante las opciones de su navegador.</p>
        </Section>

        <Section title="10. Menores de edad">
          <p>El Servicio está dirigido exclusivamente a personas mayores de 18 años en representación de negocios. No recopilamos intencionalmente datos de menores de edad.</p>
        </Section>

        <Section title="11. Cambios a esta política">
          <p>Podemos actualizar esta Política periódicamente. Los cambios materiales serán notificados por correo electrónico con al menos 10 días de anticipación a su entrada en vigor. El uso continuado del Servicio implica aceptación de la versión actualizada.</p>
        </Section>

        <Section title="12. Contacto y quejas">
          <p>Para ejercer sus derechos, presentar quejas o solicitar información adicional sobre el tratamiento de sus datos:</p>
          <p>
            <strong className="text-white">RGYT SAS — Oficial de Protección de Datos</strong><br />
            <a href="mailto:privacidad@automatiza360.com">privacidad@automatiza360.com</a><br />
            Bogotá D.C., Colombia
          </p>
          <p>Si no recibe respuesta satisfactoria, puede presentar una queja ante la <strong>Superintendencia de Industria y Comercio</strong> en <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer">www.sic.gov.co</a>.</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">{title}</h2>
      <div className="text-slate-300 space-y-3 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-brand-green [&_strong]:text-white [&_table]:w-full [&_table]:border-collapse [&_th]:text-left [&_th]:text-xs [&_th]:text-slate-400 [&_th]:uppercase [&_th]:tracking-wide [&_th]:pb-2 [&_th]:border-b [&_th]:border-white/10 [&_td]:py-2 [&_td]:pr-4 [&_td]:text-sm [&_td]:border-b [&_td]:border-white/5">
        {children}
      </div>
    </section>
  );
}

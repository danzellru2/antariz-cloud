// api/send.js

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Validación ────────────────────────────────────────────────────────────
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Correo electrónico inválido.' });
  }

  // ── Fecha ─────────────────────────────────────────────────────────────────
  const fechaHora = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Monterrey',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // ── Template HTML ─────────────────────────────────────────────────────────
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,sans-serif;color:#e2e2e2;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:#111111;border:1px solid #1f1f1f;border-radius:16px;overflow:hidden;">

      <!-- HEADER -->
      <div style="background:#0d0d0d;border-bottom:1px solid #1a1a1a;padding:28px 32px;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#22c55e;margin-right:12px;vertical-align:middle;"></span>
        <span style="font-size:18px;font-weight:700;color:#ffffff;vertical-align:middle;">Nuevo mensaje de contacto</span>
        <div style="font-size:12px;color:#555;margin-top:8px;text-transform:uppercase;letter-spacing:0.5px;">
          ${fechaHora}
        </div>
      </div>

      <!-- BODY -->
      <div style="padding:32px;">

        <!-- Banner -->
        <div style="background:#0f1f14;border:1px solid #1a3d26;border-left:3px solid #22c55e;border-radius:8px;padding:14px 18px;margin-bottom:28px;font-size:13px;color:#86efac;">
          ⚡ Alguien quiere iniciar su evolución en la nube. Respóndele pronto.
        </div>

        <!-- Nombre -->
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#444;margin-bottom:6px;">Nombre completo</div>
          <div style="background:#0d0d0d;border:1px solid #1e1e1e;border-radius:10px;padding:14px 18px;font-size:15px;color:#e8e8e8;">
            ${name}
          </div>
        </div>

        <!-- Email -->
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#444;margin-bottom:6px;">Correo electrónico</div>
          <div style="background:#0d0d0d;border:1px solid #1e1e1e;border-radius:10px;padding:14px 18px;font-size:15px;">
            <a href="mailto:${email}" style="color:#22c55e;text-decoration:none;">${email}</a>
          </div>
        </div>

        <!-- Mensaje -->
        <div style="margin-bottom:28px;">
          <div style="font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#444;margin-bottom:6px;">Proyecto o mensaje</div>
          <div style="background:#0d0d0d;border:1px solid #1e1e1e;border-radius:10px;padding:14px 18px;font-size:14px;color:#c8c8c8;line-height:1.7;min-height:80px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>

        <!-- Divider -->
        <div style="border-top:1px solid #1a1a1a;margin-bottom:20px;"></div>

        <!-- Meta -->
        <div style="font-size:12px;color:#333;margin-bottom:6px;">
          <span>Fecha y hora: </span><span style="color:#555;">${fechaHora}</span>
        </div>
        <div style="font-size:12px;color:#333;margin-bottom:24px;">
          <span>Origen: </span><span style="color:#555;">Formulario web — Conecta con Nosotros</span>
        </div>

        <!-- CTA -->
        <a href="mailto:${email}?subject=Re: Tu mensaje en nuestra web"
           style="display:inline-block;background:#22c55e;color:#000000;font-weight:700;font-size:14px;padding:13px 28px;border-radius:10px;text-decoration:none;">
          Responder a ${name} →
        </a>

      </div>

      <!-- FOOTER -->
      <div style="background:#0d0d0d;border-top:1px solid #1a1a1a;padding:20px 32px;text-align:center;font-size:12px;color:#333;">
        Generado automáticamente desde tu sitio web · Powered by Resend
      </div>

    </div>
  </div>
</body>
</html>
  `;

  // ── Envío con Resend ──────────────────────────────────────────────────────
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['danzellpaolo1@gmail.com'],
        reply_to: email,
        subject: `✉️ Nuevo mensaje de ${name}`,
        html,
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
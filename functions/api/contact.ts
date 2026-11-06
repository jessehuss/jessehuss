type Env = {
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
  TO_EMAIL?: string;
};

type Body = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function clientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Bound map size
  if (hits.size > 2000) {
    const first = hits.keys().next().value;
    if (first) hits.delete(first);
  }
  return recent.length > RATE_MAX;
}

function asTrimmedString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (rateLimited(clientIp(request))) {
    return json({ error: 'Too many messages from this network. Please try again later.' }, 429);
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  // Honeypot — bots fill this; humans never see it
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return json({ message: 'Thanks — your message is on its way.' }, 200);
  }

  const name = asTrimmedString(body.name, 120);
  const email = asTrimmedString(body.email, 200);
  const message = asTrimmedString(body.message, 5000);

  if (!name || !email || !message) {
    return json({ error: 'Please fill in your name, email, and message.' }, 400);
  }
  if (!validEmail(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  const from = env.FROM_EMAIL || 'admin@jessehuss.com';
  const to = env.TO_EMAIL;

  if (!apiKey || !to) {
    return json(
      {
        error:
          'The contact form is not fully configured yet. Please try again later.',
      },
      503
    );
  }

  const subject = `jessehuss.com contact from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}\n`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Jesse Huss <${from}>`,
      to: [to],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('Resend error', res.status, detail.slice(0, 300));
    return json({ error: 'Could not send your message. Please try again shortly.' }, 502);
  }

  return json({ message: 'Thanks — your message is on its way.' }, 200);
};

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
      },
    });
  }
  if (context.request.method === 'GET') {
    return json({
      configured: Boolean(context.env.RESEND_API_KEY && context.env.TO_EMAIL),
      hasResend: Boolean(context.env.RESEND_API_KEY),
      hasTo: Boolean(context.env.TO_EMAIL),
      hasFrom: Boolean(context.env.FROM_EMAIL),
    });
  }
  return json({ error: 'Method not allowed.' }, 405);
};

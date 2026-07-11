import { Resend } from 'resend'

const TO_EMAIL = process.env.QUOTE_TO_EMAIL || 'info@taylor-plumbing.com'
const FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || 'Taylor Plumbing Website <onboarding@resend.dev>'

// Keep comfortably under Vercel's serverless body size limit (4.5MB) once base64-encoded.
const MAX_ATTACHMENTS_BYTES = 4 * 1024 * 1024

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Email service is not configured' })
  }

  const { name, email, phone, jobType, message, attachments } = req.body || {}

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email and phone are required' })
  }

  const safeAttachments = Array.isArray(attachments) ? attachments.slice(0, 5) : []
  const totalBytes = safeAttachments.reduce((sum, a) => sum + Math.ceil((a.content?.length || 0) * 0.75), 0)
  if (totalBytes > MAX_ATTACHMENTS_BYTES) {
    return res.status(413).json({ error: 'Attachments are too large' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New quote request from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Job type: ${jobType || 'Not specified'}`,
        '',
        'Problem description:',
        message || 'Not provided',
      ].join('\n'),
      attachments: safeAttachments.map((a) => ({ filename: a.filename, content: a.content })),
    })

    if (error) {
      console.error('Resend error', error)
      return res.status(502).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to send quote email', err)
    return res.status(502).json({ error: 'Failed to send email' })
  }
}

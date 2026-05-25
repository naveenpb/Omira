import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, condition, crmTag, locale, source } = body

    // ── 1. Honeypot check (silently succeed for bots) ────────────────
    if (body.website_url) {
      return NextResponse.json({ success: true })
    }

    // ── 2. Basic validation ──────────────────────────────────────────
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, email' },
        { status: 400 }
      )
    }

    const errors: Record<string, string> = {}

    // Indian mobile: starts with 6-9, 10 digits
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const blockedDomains = ['test.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com']
    const emailDomain = email.split('@')[1]?.toLowerCase()
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.'
    } else if (blockedDomains.includes(emailDomain)) {
      errors.email = 'Disposable email addresses are not accepted.'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 422 })
    }

    // ── 3. HubSpot CRM submission ────────────────────────────────────
    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN
    if (hubspotToken) {
      const [firstName, ...lastParts] = name.trim().split(' ')
      const hubspotPayload = {
        properties: {
          firstname: firstName,
          lastname: lastParts.join(' ') || '',
          email,
          phone,
          // Custom HubSpot properties — create these in HubSpot portal settings:
          clinical_condition: condition || crmTag || 'general',
          lead_source_language: locale || 'en',
          lead_source_page: source || 'website-modal',
          lifecyclestage: 'lead',
          hs_lead_status: 'NEW',
        },
      }

      const hubspotRes = await fetch(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${hubspotToken}`,
          },
          body: JSON.stringify(hubspotPayload),
        }
      )

      if (!hubspotRes.ok && hubspotRes.status !== 409) {
        // 409 = contact already exists — not an error
        const errBody = await hubspotRes.json().catch(() => ({}))
        console.error('[Lead API] HubSpot error:', errBody)
        // Don't block the user — fall through to Web3Forms backup
      }
    }

    // ── 4. Web3Forms backup (email notification) ─────────────────────
    const web3Key = process.env.WEB3FORMS_KEY
    if (web3Key) {
      const formData = new FormData()
      formData.append('access_key', web3Key)
      formData.append(
        'subject',
        `🚨 New Lead: ${condition || crmTag || 'General'} | Omira Wellness`
      )
      formData.append('from_name', 'Omira Wellness')
      formData.append('name', name)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('condition', condition || crmTag || 'general')
      formData.append('language', locale || 'en')
      if (body.message) formData.append('message', body.message)
      if (body.enquiryType) formData.append('enquiry_type', body.enquiryType)
      if (source) formData.append('source_page', source)

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      }).catch((err) => console.error('[Lead API] Web3Forms error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Lead API] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}

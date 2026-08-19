import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No authorization code received' }, { status: 400 })
  }

  const appId = process.env.EBAY_APP_ID!
  const certId = process.env.EBAY_CERT_ID!
  const ruName = process.env.EBAY_RUNAME!

  const basicAuth = Buffer.from(`${appId}:${certId}`).toString('base64')

  const tokenResponse = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: ruName,
    }),
  })

  const tokenData = await tokenResponse.json()

  if (!tokenResponse.ok) {
    return NextResponse.json({ error: 'Token exchange failed', details: tokenData }, { status: 500 })
  }

  // For now, just show the token was received successfully
  // Next step will store this securely
  return NextResponse.json({
    success: true,
    message: 'eBay account connected successfully',
    expires_in: tokenData.expires_in,
  })
}

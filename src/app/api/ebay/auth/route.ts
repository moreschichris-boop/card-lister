import { NextResponse } from 'next/server'

export async function GET() {
  const appId = process.env.EBAY_APP_ID!
  const ruName = process.env.EBAY_RUNAME!

  const scopes = [
    'https://api.ebay.com/oauth/api_scope/sell.inventory',
    'https://api.ebay.com/oauth/api_scope/sell.account',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment',
  ].join(' ')

  const authUrl = `https://auth.ebay.com/oauth2/authorize?client_id=${appId}&redirect_uri=${ruName}&response_type=code&scope=${encodeURIComponent(scopes)}`

  return NextResponse.redirect(authUrl)
}

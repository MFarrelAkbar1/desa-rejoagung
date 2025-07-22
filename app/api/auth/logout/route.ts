
// app/api/auth/logout/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Optional: Implement token blacklist if needed
  // For now, we just return success since we're using localStorage
  return NextResponse.json({ success: true })
}
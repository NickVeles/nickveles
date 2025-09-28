import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      )
    }

    const correctPassword = process.env.PROFILE_PASSWORD

    // If PROFILE_PASSWORD is not set, treat all attempts as incorrect
    if (!correctPassword) {
      return NextResponse.json(
        { success: false, message: 'Authentication not configured' },
        { status: 401 }
      )
    }

    const isValid = password === correctPassword

    return NextResponse.json(
      { success: isValid },
      { status: isValid ? 200 : 401 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
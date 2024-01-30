import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    console.log(req.headers.get('x-forwarded-for'));
    const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
    return NextResponse.json({ ip })
}
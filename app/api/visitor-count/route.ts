import { NextResponse } from 'next/server';

let visitorCount = 0;  // This will reset when the server restarts, you might want to use a database in production

export async function GET() {
  visitorCount++;
  return NextResponse.json({ count: visitorCount });
} 
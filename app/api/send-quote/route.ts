import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_BACKEND}/sqs/publish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "publish from next" }),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Fail send to NestJS' }, { status: 500 });
    }
}

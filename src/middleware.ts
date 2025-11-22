import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/profile', '/cart', '/logout'];
const authPages = ['/login', '/register', '/forgot-password'];

export default async function middleware(req: NextRequest) {
    const token = await getToken({req});

    if (protectedPages.includes(req.nextUrl.pathname)) {
        if (token) {
            return NextResponse.next();
        }else {
            const redirectUrl = new URL('/login', process.env.NEXTAUTH_URL);
            redirectUrl.searchParams.set('callback-url', req.nextUrl.pathname)  
            return NextResponse.redirect(redirectUrl)
        }
    }

    if (authPages.includes(req.nextUrl.pathname)) {
        if (!token) {
            return NextResponse.next();
        }else{
            const redirectUrl = new URL('/', process.env.NEXTAUTH_URL);
            return NextResponse.redirect(redirectUrl)
        }
    }

    if (req.nextUrl.pathname === '/verify-code') {
        const fp = req.nextUrl.searchParams.get('fp');
        const email = req.nextUrl.searchParams.get('email')

        if (!fp || !email) {
            const redirectUrl = new URL('/login', process.env.NEXTAUTH_URL);
            return NextResponse.redirect(redirectUrl)
        } else {
            return NextResponse.next()
        }
    }

    if (req.nextUrl.pathname === '/reset-password') {
        const verified = req.nextUrl.searchParams.get('verified');
        const email = req.nextUrl.searchParams.get('email');

        if (!verified || !email) {
            const redirectUrl = new URL('/login', process.env.NEXTAUTH_URL);
            return NextResponse.redirect(redirectUrl)
        } else{
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}   
'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ThemeManager() {
    const { status } = useSession();
    const pathname = usePathname();

    useEffect(() => {
        // If the user is unauthenticated or on public pages, use the Stitched Ethereal Light Theme
        // If authenticated and on dashboard pages, use the Liquid Glass Dark Theme
        const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname === '/landing';
        
        const html = document.documentElement;
        
        if (status === 'unauthenticated' || isPublicPage) {
            html.setAttribute('data-theme', 'stitch-light');
            html.classList.remove('dark');
        } else if (status === 'authenticated') {
            html.setAttribute('data-theme', 'liquid-dark');
            html.classList.add('dark');
        }
    }, [status, pathname]);

    return null;
}

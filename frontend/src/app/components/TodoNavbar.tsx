// src/components/TodoNavbar.tsx
'use client';

import Image from 'next/image';

export default function TodoNavbar() {
    return (
        <nav className="bg-white text-black px-6 py-4 flex items-center shadow-md">
            {/* Sample icon */}
            <div className="mr-4">
                <Image
                    src="/todo-icon.svg" // Make sure this exists in /public
                    alt="Todo Icon"
                    width={32}
                    height={32}
                />
            </div>
            <h1 className="text-2xl font-bold tracking-wide">TODO</h1>
        </nav>
    );
}

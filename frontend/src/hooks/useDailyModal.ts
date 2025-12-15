// src/hooks/useDailyModal.ts
import { useEffect, useState } from 'react';

export function useDailyModal(key = 'daily-warning-modal') {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const today = new Date().toISOString().split('T')[0];
        const lastSeen = localStorage.getItem(key);

        if (lastSeen !== today) {
            setIsOpen(true);
            localStorage.setItem(key, today);
        }
    }, [key]);

    return { isOpen, close: () => setIsOpen(false) };
}

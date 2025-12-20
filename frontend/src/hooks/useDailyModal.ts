// src/hooks/useDailyModal.ts
import { useFlix } from '@/contexts/FlixContext';
import { useEffect, useState } from 'react';

export function useDailyModal(key = 'daily-warning-modal') {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useFlix()

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (user?.donator) return

        const today = new Date().toISOString().split('T')[0];
        const lastSeen = localStorage.getItem(key);

        if (lastSeen !== today) {
            setIsOpen(true);
            localStorage.setItem(key, today);
        }
    }, [key, user]);

    return { isOpen, close: () => setIsOpen(false) };
}

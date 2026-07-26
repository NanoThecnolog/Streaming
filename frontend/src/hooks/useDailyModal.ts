// src/hooks/useDailyModal.ts
import { useFlix } from '@/contexts/FlixContext';
import { useEffect, useState } from 'react';

export function useDailyModal(key = 'daily-warning-modal') {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useFlix()

    useEffect(() => {
        if (typeof window === 'undefined') return;
        //if (user?.donator) return

        //setIsOpen(true)

        const nextAllowed = localStorage.getItem(key);

        if (!nextAllowed || new Date() >= new Date(nextAllowed)) {
            setIsOpen(true);

            const nextShow = new Date();
            nextShow.setDate(nextShow.getDate() + 3);

            localStorage.setItem(key, nextShow.toISOString());
        }

        /*const today = new Date()
        today.setDate(today.getDate() + 3)
        const treeDays = today.toISOString().split('T')[0];
        const lastSeen = localStorage.getItem(key);

        if (lastSeen !== treeDays) {
            setIsOpen(true);
            localStorage.setItem(key, today.toISOString().split('T')[0]);
        }*/
    }, [key, user]);

    return { isOpen, close: () => setIsOpen(false) };
}

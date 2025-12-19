// src/hooks/useDailyModal.ts
import { useFlix } from '@/contexts/FlixContext';
import { useEffect, useState } from 'react';

export function useWarningAccessModal(key: boolean) {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useFlix()

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!user) return
        if (user.donator) return

        if (!key) {
            setIsOpen(true)
            return
        }
        setIsOpen(false)
    }, [key]);

    return { isOpen, close: () => setIsOpen(false) };
}

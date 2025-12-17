// src/hooks/useDailyModal.ts
import { useEffect, useState } from 'react';

export function useWarningAccessModal(key: boolean) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!key) {
            setIsOpen(true)
            return
        }
        setIsOpen(false)
    }, [key]);

    return { isOpen, close: () => setIsOpen(false) };
}

import { createPortal } from "react-dom";
import { PropsWithChildren, useEffect, useState } from "react";

export function Portal({ children }: PropsWithChildren) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(children, document.body);
}

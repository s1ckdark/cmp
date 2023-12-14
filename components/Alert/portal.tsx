import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const AlertPortal = ({ children }: PortalProps) => {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const [isCSR, setIsCSR] = useState<boolean>(false);

    useEffect(() => {
      setElement(document.getElementById('portal'));
      setIsCSR(true);
    }, [])

    if (!isCSR) return <></>;
    if (!element) return <></>;
    return createPortal(children, element!);
};

export default AlertPortal;
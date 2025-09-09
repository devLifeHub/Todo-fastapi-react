import { useState, useEffect } from "react";

export const useAnimated = (isVisibleFromRedux, onAfterClose) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isVisibleFromRedux) setIsOpen(true);
  }, [isVisibleFromRedux]);

  const requestClose = () => setIsOpen(false);

  const handleExitComplete = () => {
    if (onAfterClose) onAfterClose();
  };

  return { isOpen, requestClose, handleExitComplete };
};

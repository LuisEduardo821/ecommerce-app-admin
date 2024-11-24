"use client";

import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface AlertModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onCloseModal,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="Está seguro?"
      description="Esta acción no se puede deshacer."
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant="outline" disabled={loading} onClick={onCloseModal}>
          Cancelar
        </Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm}>
          Continuar
        </Button>
      </div>
    </Modal>
  );
};

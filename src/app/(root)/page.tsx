"use client";

import { useEffect } from "react";
import { useStoreModal } from "@/hooks";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  const onOpenModal = useStoreModal((state) => state.onOpenModal);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpenModal();
    }
  }, [isOpen, onOpenModal]);
  return (
    <div className="p-4">
      <UserButton showName />
      Root page
    </div>
  );
};

export default SetupPage;

"use client";
import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

const SetupPage = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-4">
      <UserButton showName />
      <Modal
        title="Modal Title"
        description="Modal description"
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        children
      </Modal>
    </div>
  );
};

export default SetupPage;

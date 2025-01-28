'use client';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import AddEventForm from '@/components/forms/add-event-form';
import { useModalHandlingStore } from '@/store/use-modal-handling';

export function AddEventModal() {
  const isOpenModal = useModalHandlingStore(
    (state) => state.openModals.addModal
  );
  const onCloseModal = useModalHandlingStore((state) => state.setIsClosedModal);

  return (
    <Modal isOpen={isOpenModal} onClose={() => onCloseModal('addModal')}>
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Añadir evento</h3>
        </ModalHeader>
        <ModalBody className="mb-2">
          <AddEventForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

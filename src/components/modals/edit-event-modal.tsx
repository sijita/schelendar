'use client';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import EditEventForm from '@/components/forms/edit-event-form';
import { useModalHandlingStore } from '@/store/use-modal-handling';
import useHandleParams from '@/hooks/use-handle-params';

export function EditEventModal() {
  const isOpenModal = useModalHandlingStore(
    (state) => state.openModals.editModal
  );
  const onCloseModal = useModalHandlingStore((state) => state.setIsClosedModal);
  const { deleteParams } = useHandleParams();

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={() => {
        deleteParams();
        onCloseModal('editModal');
      }}
    >
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Editar evento</h3>
        </ModalHeader>
        <ModalBody className="mb-2">
          <EditEventForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

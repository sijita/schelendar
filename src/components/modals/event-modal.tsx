'use client';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import EventsForm from '@/components/forms/events-form';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateValue: string;
}

export function EventModal({ isOpen, onClose, dateValue }: EventModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Añadir evento</h3>
        </ModalHeader>
        <ModalBody className="mb-2">
          <EventsForm dateValue={dateValue} onCloseModal={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

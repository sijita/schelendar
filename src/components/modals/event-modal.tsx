'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from '@heroui/react';
import { IconCalendar, IconClock } from '@tabler/icons-react';

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
        <ModalBody>
          <Input label="Título" variant="bordered" />
          <div className="flex gap-4">
            <Input
              value={dateValue}
              label="Fecha"
              startContent={<IconCalendar className="w-4 h-4 text-gray-400" />}
              type="date"
              variant="bordered"
              isDisabled
            />
            <Input
              label="Hora"
              startContent={<IconClock className="w-4 h-4 text-gray-400" />}
              type="time"
              variant="bordered"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="w-full mb-1" color="primary" onPress={onClose}>
            Añadir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

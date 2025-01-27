'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Textarea,
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
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-1">
              <Button variant="light" isIconOnly isDisabled>
                <IconCalendar className="text-primary" />
              </Button>
              <span className="text-lg text-center font-medium capitalize">
                {new Date(dateValue).toLocaleDateString('es-CO', {
                  day: 'numeric',
                  weekday: 'short',
                })}
              </span>
            </div>
            <Input
              label="Hora"
              startContent={<IconClock className="w-4 h-4 text-gray-400" />}
              type="time"
              variant="flat"
            />
          </div>
          <Input
            label="Título"
            placeholder="Nombre del evento"
            variant="flat"
          />
          <Textarea
            label="Descripción"
            placeholder="Lorem ipsum dolor sit amet"
            variant="flat"
          />
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

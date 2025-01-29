import { useModalHandlingStore } from '@/store/use-modal-handling';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function useHandleParams() {
  const isModalOpen = useModalHandlingStore(
    (state) => state.openModals.editModal
  );
  const setIsModalOpen = useModalHandlingStore((state) => state.setIsOpenModal);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { replace } = useRouter();

  const onOpenEvent = (eventId: string) => {
    setIsModalOpen('editModal');
    params.set('id', eventId);

    replace(`${pathname}?${params.toString()}`);
  };

  const deleteParams = () => {
    if (params.has('id')) {
      params.delete('id');
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    onOpenEvent,
    searchParams,
    params,
    deleteParams,
  };
}

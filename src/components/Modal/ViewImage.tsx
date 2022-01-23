import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="pGray.800">
        <ModalBody maxWidth="900px" maxHeight="600px" padding="0" mb="1rem">
          <Image src={imgUrl} fit="contain" mb="1rem" />
          <Link paddingLeft="1rem" href={imgUrl}>
            Abrir original
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

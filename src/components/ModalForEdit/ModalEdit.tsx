import { Modal } from "@heroui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface IModalEditProps {
    children: ReactNode;
    isOpened: boolean;
    changeIsOpened: Dispatch<SetStateAction<boolean>>;
    title: string;
    width? : string
}

export default function ModalEdit({ children, isOpened, changeIsOpened, title , width } : IModalEditProps) {


    return (
        <Modal isOpen={isOpened} onOpenChange={changeIsOpened}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className={`sm:max-w-90 ${width || ""}`}>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>{title}</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            {children}
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

import { FaTimes } from "react-icons/fa";
import ptBR from 'date-fns/locale/pt-BR'

import { IScheduleModalProps } from "./types";

import Modal from "../Modal";

import * as Styled from './styles';
import { format } from "date-fns";
import { getDateFromPtBrPattern } from "@/Utils/Functions";

export default function ScheduleModal({ active, closeModal, event }: IScheduleModalProps) {

    if (event) {
        // console.log(format(getDateFromPtBrPattern(event.date), "PPPP", { locale: ptBR}))
        console.log(event.paid)
    }

    return (
        <Modal active={active} onClick={closeModal}>
            <Styled.InfoModal>
                <Styled.ModalTitle>
                    <span></span>
                    <h3>Agendamento</h3>
                    <FaTimes onClick={closeModal} color="#959595" size={17} />
                </Styled.ModalTitle>
                <hr />
                <Styled.ModalContent >
                    {event && (
                        <>
                            <span>{event.title}</span>
                            <br />
                            <span>{event.serviceName}</span>
                            <br />
                            <span>{format(getDateFromPtBrPattern(event.date), "PPPP", { locale: ptBR })}</span>
                            <input type="checkbox" name="" id="" />
                        </>
                    )}
                </Styled.ModalContent>
                <Styled.ModalButtonContainer>
                    <button className='cancel-button' data-cy="modal-cancel-button" onClick={closeModal}>Cancelar</button>
                    <button className='confirm-button' data-cy="modal-confirm-button" onClick={() => { }}>Confirmar</button>
                </Styled.ModalButtonContainer>
            </Styled.InfoModal>
        </Modal>
    );
}
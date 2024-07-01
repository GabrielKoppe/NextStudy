'use client';

import ModalTicket from '@/components/modal';
import { TicketType } from '@/util/types/ticket.type';
import { createContext, ReactNode, useState } from 'react';

interface ModalContextType {
	visible: boolean;
	handleModalVisible: () => void;
	ticket?: TicketType;
	setDetailTicket: (ticket: TicketType) => void;
}

export const ModalContext = createContext({} as ModalContextType);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [visible, setVisible] = useState(false);
	const [ticket, setTicket] = useState<TicketType>();

	function handleModalVisible() {
		setVisible(!visible);
	}

	function setDetailTicket(ticket: TicketType) {
		setTicket(ticket);
	}

	return (
		<ModalContext.Provider
			value={{ visible, handleModalVisible, ticket, setDetailTicket }}
		>
			{visible && <ModalTicket />}
			{children}
		</ModalContext.Provider>
	);
};

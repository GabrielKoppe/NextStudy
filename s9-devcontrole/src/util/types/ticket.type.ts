import { CustomerType } from './customer.type';

export interface TicketType {
	id: string;
	name: string;
	description: string;
	status: string;
	created_at: Date | null;
	updated_at: Date | null;
	custumerId: string | null;
	userId: string | null;
	custumer: CustomerType | null;
}

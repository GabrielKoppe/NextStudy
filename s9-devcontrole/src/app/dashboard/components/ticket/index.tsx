import { FiFile, FiTrash2 } from 'react-icons/fi';

export default function TicketItem() {
	return (
		<>
			<tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-gray-200 duration-300">
				<td className="text-left pl-1">Teste Cliente</td>
				<td className="text-left">01/03/2024</td>
				<td className="text-left hidden sm:table-cell">
					<span className="bg-green-500 px-2 py-1 rounded">Aberto</span>
				</td>
				<td className="text-left">
					<button>
						<FiTrash2 size={24} color="#ef4444" />
					</button>
					<button>
						<FiFile size={24} color="#3b82f6" />
					</button>
				</td>
			</tr>
		</>
	);
}

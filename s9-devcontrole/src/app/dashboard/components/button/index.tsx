'use client';

import { useRouter } from 'next/navigation';
import { FiRefreshCcw } from 'react-icons/fi';

export default function ButtonRefresh() {
	const router = useRouter();
	return (
		<button
			onClick={() => router.refresh()}
			className="bg-gray-900 py-1 px-4 rounded"
		>
			<FiRefreshCcw size={24} color="#fff" />
		</button>
	);
}

export default function Label({ text }: { text: string }) {
	return (
		<div className="flex-grow sm:flex-grow-0 rounded-lg bg-slate-200 text-black text-center px-3 py-1 hover:font-bold duration-200">
			{text}
		</div>
	);
}

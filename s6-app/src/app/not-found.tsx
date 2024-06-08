import Link from 'next/link';

export default function NotFound() {
	return (
		<div>
			<h2>Pagina não encontrada!</h2>
			<p>Parece que a página que você esta tentando encontrar não existe</p>
			<Link href="/">Voltar a Página inicial</Link>
		</div>
	);
}

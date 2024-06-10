import Link from 'next/link';
import Image from 'next/image';
import { LiaGamepadSolid } from 'react-icons/lia';

export default function Header() {
	return (
		<header className="w-full h-28 bg-slate-100 text-black px-2">
			<div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
				<nav className="flex justify-center items-center gap-4">
					<Link href="/">
						<Image
							src="/logo.svg"
							alt="Logo site Dailygames"
							quality={100}
							width={150}
							height={150}
							priority
							className="w-full"
						/>
					</Link>
					<Link href="/">Games</Link>
					<Link href="/profile">Perfil</Link>
				</nav>
				<div className="hidden sm:flex justify-center items-center">
					<Link href="/profile">
						<LiaGamepadSolid size={34} color="#475569" />
					</Link>
				</div>
			</div>
		</header>
	);
}

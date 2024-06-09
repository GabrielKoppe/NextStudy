import { NextResponse } from 'next/server';

let tarefas = ['Comprar Arroz', 'Estudar Next'];

export async function GET(request: Request) {
	return NextResponse.json(tarefas);
}

// POST /api/tarefas > {name: "teste"}
export async function POST(request: Request) {
	const data = await request.json();
	console.log(data);

	tarefas.push(data.name);

	return NextResponse.json(tarefas);
}

// PUT /api/tarefas?index=0 > {name: "teste"}
export async function PUT(request: Request) {
	const { searchParams } = new URL(request.url);
	const index = searchParams.get('index');

	const data = await request.json();

	tarefas[Number(index)] = data.name;

	return NextResponse.json({ menssage: 'Tarefa atualizada com sucesso' });
}

// DELETE /api/tarefas?index=0
export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const index = searchParams.get('index');

	const data = await request.json();

	tarefas.splice(Number(index), 1);

	return NextResponse.json({ menssage: 'Tarefa deletada com sucesso' });
}

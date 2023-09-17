export type Province = { id: string; nombre: string };
export type City = { id: string; nombre: string; provincia: Province };

export type FormResponse = {
	data: {
		[x: string]: string;
	};
	errors?: {
		[x: string]: string[] | undefined;
		[x: number]: string[] | undefined;
		[x: symbol]: string[] | undefined;
	};
	message?: string;
};

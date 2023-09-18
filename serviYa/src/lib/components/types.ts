export type Form =
	| {
			data: { [x: string]: string };
			errors: {
				[x: string]: string[] | undefined;
				[x: number]: string[] | undefined;
				[x: symbol]: string[] | undefined;
			};
			message?: undefined;
	  }
	| { message: string; data?: undefined; errors?: undefined }
	| null;

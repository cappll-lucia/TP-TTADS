const abortCont = {
	last: new AbortController(),
	next: new AbortController(),
	swap() {
		this.last = abortCont.next;
		this.next = new AbortController();
	}
};

export function fetchWithCancel(url: string, callback: (value: Response) => void) {
	abortCont.last.abort();
	fetch(url, { signal: abortCont.next.signal })
		.then(callback)
		.catch((err) => {
			if (err.name !== 'AbortError') {
				console.error(err);
			}
		});
	abortCont.swap();
}

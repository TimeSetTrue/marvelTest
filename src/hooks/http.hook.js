import { useState, useCallback } from 'react';

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url, method = 'GET', body = null, 
	headers = {'Content-Type': 'application/json'}) => {
		setLoading(true);

		try { 
			const resources = await fetch(url);

			if(!resources.ok) {
				throw new Error (`Could not find ${url}, status ${resources.status}`);
			}
			
			const data = await resources.json();

			setLoading(false);
			return data;
		}  catch (e) {
			setLoading(false);
			setError(e.message);
			throw e;
		}

	}, [])

	const clearError = useCallback(() => setError(null), []);

	return {loading, error, request, clearError}

}
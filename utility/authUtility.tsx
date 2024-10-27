// utility/authUtility.tsx

export function getUserId(): string | null {
	console.log('attempting to return local variable: ');
	if (typeof window !== 'undefined') {
		console.log('USER ID Fetched!!!!!!!!!!');
		return localStorage.getItem('userId');
	}
	return null;
}

export function setUserId(userId: string): void {
	console.log('attempting to create local variable: ' + userId);
	if (typeof window !== 'undefined') {
		localStorage.setItem('userId', userId);
		console.log('USER ID CREATED!!!!!!!!!!');
	}
}

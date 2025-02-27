export const generateTodayString = () => new Date().toISOString().split('T')[0];
export const createDateString = (dateString) => {
	let date = new Date(dateString);
	date.setDate(date.getDate() + 1);
	return date.toISOString().split('T')[0];
};

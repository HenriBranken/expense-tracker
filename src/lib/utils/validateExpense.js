export const generateTodayString = () => new Date().toISOString().split('T')[0];

export const validateTitle = (title, errors) => {
	let newErrors = { ...errors };
	if (title.trim().length <= 1) {
		newErrors.title = 'Title must be at least 2 characters long.';
	} else {
		newErrors.title = '';
	}
	return newErrors;
};

export const validateDescription = (description, errors) => {
	let newErrors = { ...errors };
	if (description.trim().length <= 2) {
		newErrors.description = 'Description must be at least 3 characters long.';
	} else {
		newErrors.description = '';
	}
	return newErrors;
};

export const validateDate = (date, errors) => {
	let newErrors = { ...errors };
	if (!date || date.trim() === '') {
		newErrors.date = 'Date cannot be empty.';
	} else if (date > generateTodayString()) {
		newErrors.date = 'Future dates are not allowed.';
	} else {
		newErrors.date = '';
	}
	return newErrors;
};

export const validateAmount = (amount, errors) => {
	let newErrors = { ...errors };
	let amountValue = amount.toString().trim();
	if (amountValue === '' || isNaN(amountValue) || Number(amountValue) <= 0) {
		newErrors.amount = 'Amount must be a positive number.';
	} else if (/\.\d{3,}$/.test(amountValue)) {
		newErrors.amount = 'Amount cannot have more than 2 decimal places.';
	} else {
		newErrors.amount = '';
	}
	return newErrors;
};

export const validateExpense = (fields, errors) => {
	let updatedErrors = { ...errors };
	updatedErrors = validateTitle(fields.title, updatedErrors);
	updatedErrors = validateDescription(fields.description, updatedErrors);
	updatedErrors = validateDate(fields.date, updatedErrors);
	updatedErrors = validateAmount(fields.amount, updatedErrors);
	return updatedErrors;
};

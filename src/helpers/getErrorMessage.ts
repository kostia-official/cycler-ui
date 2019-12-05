export const getErrorMessage = (err: any) => err.response?.data?.message || err.message;

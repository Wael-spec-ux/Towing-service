export const verifyTokenExistInLocalStorage = async () => {
    const storedToken = localStorage.getItem('token') || localStorage.getItem('DriverToken') || localStorage.getItem('ResetPasswordToken');
    if (storedToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('DriverToken');
        localStorage.removeItem('ResetPasswordToken');
    }
    return !!storedToken;
    };

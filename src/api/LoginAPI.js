export async function AdminLogin(formData) {
  const response = await fetch('http://localhost:3000/login/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  localStorage.setItem('adminToken', result.token);
  localStorage.setItem('role','admin')
  if (!response.ok) {
    throw new Error(result.message || 'login failed');
  }

  return result;
}


export async function DriverLogin(formData) {
  const response = await fetch('http://localhost:3000/login/driver', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  localStorage.setItem('driverToken', result.token);
  localStorage.setItem("role",'driver')
  localStorage.setItem('driverId', result.driverId);
  console.log("DriverId from DriverLogin :",result.driverId)
  if (!response.ok) {
    throw new Error(result.message || 'login failed');
  }

  return result;
};
async function reservationApi(formData) {
  const response = await fetch('http://localhost:3000/api/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Reservation failed');
  }

  return result;
}

export default reservationApi;

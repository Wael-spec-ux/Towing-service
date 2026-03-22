
export async function GetAllReservations() {
  const response = await fetch("http://localhost:3000/getAllReservations",{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }});
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
    return data;

  };
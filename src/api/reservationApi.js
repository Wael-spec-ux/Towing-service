
export async function GetAllReservations() {
  const response = await fetch("http://localhost:3000/getAllReservations",{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }});
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
    return data;

  };
  export async function updateAssignedDriverAndStatus(id, assignedDriver, newStatus) {
    const response = await fetch(`http://localhost:3000/updateAssignedDriverAndStatus`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ id, assignedDriver ,status:newStatus})
    });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("updateAssignedDriverAndStatus response:", data);
      return data;
  };
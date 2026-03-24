
export async function GetAllReservations() {
  const response = await fetch("http://localhost:3000/getAllReservations",{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
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
          "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
      },
      body: JSON.stringify({ id, assignedDriver ,status:newStatus})
    });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("updateAssignedDriverAndStatus response:", data);
      return data;
  };
  export async function FindTasksByAssignedDriverEqualsToDriverId(driverId) {
    const response = await fetch(`http://localhost:3000/findTasksByAssignedDriverEqualsToDriverId/${driverId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
      }
    });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
    return data;
    };

    export async function changeTaskStatus(id,status){
      const response= await fetch('http://localhost:3000/changeTaskStatus',{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
        },
        body: JSON.stringify({id,status})
    });
    if (!response.ok) throw new Error(`http error! status: ${response.status}`);
    const data=await response.json();
    return data;
    }
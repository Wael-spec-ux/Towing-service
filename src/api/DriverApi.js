export async function GetAllDrivers() {
  const response = await fetch("http://localhost:3000/getAllDrivers",{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }});
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
    return data;

  };
export async function AddDriver(driverData) {
  const response = await fetch("http://localhost:3000/createDriver", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(driverData)
  });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};
export async function UpdateDriver(driverData) {
  const response = await fetch(`http://localhost:3000/updateDriver`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(driverData)
  });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};
export async function DeleteDriver(driverId) {
  const response = await fetch(`http://localhost:3000/deleteDriver`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ id: driverId })
  });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};

export async function updateDriverStatus(driverId, newStatus) {
  const response = await fetch(`http://localhost:3000/updateDriverStatus`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ id: driverId, status: newStatus })
  });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log("updateDriverStatus response:", data);
    return data;
};

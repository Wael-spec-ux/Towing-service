export async function GetAllDrivers() {
  const response = await fetch("http://localhost:3000/getAllDrivers",{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
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
      "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
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
        "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
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
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify({ id: driverId })
  });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};

export async function updateDriverStatusAndMissions(driverId, newStatus, newMissions) {
  const response = await fetch(`http://localhost:3000/updateDriverStatusAndMissions`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
    },
    body: JSON.stringify({ id: driverId, status: newStatus, missions: newMissions })
  });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log("updateDriverStatusAndMissions response:", data);
    return data;
};
export async function updateDriverStatus(id,status) {
    const response=await fetch(`http://localhost:3000/updateDriverStatus`, {    
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
        },
        body: JSON.stringify({ id, status })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
}
export async function GetDriverById(id) {
  const response = await fetch(`http://localhost:3000/getDriverById/${id}`,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
                }});
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
    return data;
    };

export async function AssignTruck(TruckPlate,id){
  const response = await fetch('http://localhost:3000/AssignTruck',{
    method:"PUT",
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
    },
    body:JSON.stringify({TruckPlate,id})
  });
    if(!response.ok) throw new Error(`http error! status:${response.status}`);
    const data= await response.json();
    return data
}
export const GetAllTrucks = async () => {
    const response = await fetch("http://localhost:3000/getAllTrucks",{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
                }});
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
    return data;
    };
export const createTruck = async (truckData) => {
    const response = await fetch("http://localhost:3000/createTruck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
      },
        body: JSON.stringify(truckData)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};

export const AssignTruckToDriver = async (truckPlate, driverName) => {
    const response = await fetch(`http://localhost:3000/assignTruckToDriver`, {
      method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ truckPlate, driverName })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};
export const DeleteTruck = async (id) => {
    const response = await fetch(`http://localhost:3000/deleteTruck`, {
      method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ id })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};
export const GetTruckByPlate = async (plate) => {
    const response = await fetch(`http://localhost:3000/getTruckByPlate/${plate}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
        }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};

export const AssignDriverToTruck = async (driverId, truckPlate) => {
  const response = await fetch('http://localhost:3000/AssignDriverToTruck', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
    },
    body: JSON.stringify({ driverId, truckPlate })
  });

  if (!response.ok) {
    throw new Error(`http error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
export const updateTruckMaintenance = async (lastMaintenance,nextMaintenance,location,id,NewPlate,NewName,DriverName) => {
  const response = await fetch('http://localhost:3000/updateTruckMaintenance', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`
    },
    body: JSON.stringify({ lastMaintenance,nextMaintenance,location,id,NewPlate,NewName,DriverName})
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
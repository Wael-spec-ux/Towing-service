export const GetAllTrucks = async () => {
    const response = await fetch("http://localhost:3000/getAllTrucks",{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
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
        "Authorization": `Bearer ${localStorage.getItem('token')}`
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
            "Authorization": `Bearer ${localStorage.getItem('token')}`
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
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
};
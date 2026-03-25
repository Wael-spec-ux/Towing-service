//need some fixes
export async function sendProblemMessage(type,description,email) {
    const response= await fetch("http://localhost:3000/sendProblemMessage",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`

        },
        body:JSON.stringify({type,description,email})
    })
    if (!response.ok) throw new Error(`http error! status:${response.status}`);
    const data= await response.json();
    return data;
}

export async function RequestRestDay(type,description,email) {
    const response= await fetch("http://localhost:3000/RequestRestDay",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('driverToken')}`

        },
        body:JSON.stringify({type,description,email})
    })
    if (!response.ok) throw new Error(`http error! status:${response.status}`);
    const data= await response.json();
    return data;
}

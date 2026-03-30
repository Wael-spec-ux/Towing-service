import {UserPlus} from "lucide-react";
import { useEffect, useState } from "react";
import { AssignTruck, DeleteDriverFromTruckCard, GetAllDrivers, GetDriverById, UpdateDriver } from "../api/DriverApi";
import { GetAllTrucks } from "../api/TruckApi";
export function EditDriverModal({setSelectedDriver,setShowEditDriver,selectedDriver,setDrivers}) {
    const[driver,setDriver]=useState(null);
    const[name,setName]=useState("");
    const[phone,setPhone]=useState("");
    const[email,setEmail]=useState("");
    const[licenceNumber,setLicenceNumber]=useState("");
    const[currentLocation,setcurrentLocation]=useState("");
    const[assignedTruck,setassignedTruck]=useState("");
    const[rating,setRating]=useState("");
    const[trucks,settrucks]=useState([])
    const[OldAssignedTruckValue,setOldAssignedTruckValue]=useState(null)
    const AdminToken=(localStorage.getItem('adminToken') || null)
    useEffect(()=>{
        const fetchDriver= async()=>{
            const data= await GetDriverById(selectedDriver)
            const TruckData= await GetAllTrucks();
            console.log("this is the data from the editUser",data)
            setDriver(data);
            setName(data.name)
            setPhone(data.phone)
            setEmail(data.email)
            setLicenceNumber(data.licenceNumber)
            setcurrentLocation(data.currentLocation)
            setassignedTruck(data.assignedTruck)
            setOldAssignedTruckValue(data.assignedTruck)
            setRating(data.rating)
            settrucks(TruckData)
        }
        fetchDriver();
    },[])
        const availableTrucks=trucks.filter(t => t.driver === "");
    const handleEditDriver =async()=>{
        console.log("old value",OldAssignedTruckValue)
        await DeleteDriverFromTruckCard(OldAssignedTruckValue)
        console.log("assigned truck value",assignedTruck)
        console.log("driver id",selectedDriver)
        await AssignTruck(assignedTruck,selectedDriver)
        await UpdateDriver(driver._id,name,phone,email,licenceNumber,currentLocation,assignedTruck,rating)
        console.log("information send to update the driver",driver._id,name,phone,email,licenceNumber,currentLocation,assignedTruck,rating)
        setSelectedDriver(null)
        if (AdminToken) {
            const updatedDrivers=await GetAllDrivers();
        setDrivers(updatedDrivers);
        }else{
            const updateDriver=await GetDriverById(driver._id)
            setDrivers(updateDriver)
        }
        
        setShowEditDriver(false);
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6 overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <UserPlus className="w-6 h-6 mr-2 text-blue-400" />
            Ajouter un Nouveau Chauffeur
          </h3>
          <div className="space-y-4">
            {!AdminToken && <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nom Complet *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ali Ben Salah"
              />
            </div>}
            {!AdminToken && <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="71 234 567"
              />
            </div>}
            {!AdminToken && <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value )}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ali@topdepannage.com"
              />
            </div>}
            {!AdminToken && <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Numéro de Permis</label>
              <input
                type="text"
                value={licenceNumber}
                onChange={(e) => setLicenceNumber(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456789"
              />
            </div>}
            {!AdminToken && <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Location</label>
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setcurrentLocation(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456789"
              />
            </div>}
                {AdminToken && (
                    <>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Assigned Truck</label>
                        {availableTrucks.length > 0 ? (
                        <select
                            value={assignedTruck}
                            onChange={(e) => setassignedTruck(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">{assignedTruck}</option>
                            {availableTrucks.map((truck) => (
                            <option key={truck._id} value={truck.plate}>
                                {truck.plate}
                            </option>
                            ))}
                        </select>
                        ) : (
                        <div className="text-center py-4 text-gray-400">
                            Aucun Camion disponible pour le moment
                        </div>
                        )}
                    </>
                    )}
            {AdminToken && <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-transform hover:scale-110 ${
                        star <= (rating || 0) ? "text-amber-400" : "text-gray-600"
                    }`}
                    >
                    ★
                    </button>
                ))}
                <span className="text-gray-400 text-sm ml-2">{rating || 0} / 5</span>
                </div>
            </div>}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEditDriver(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleEditDriver}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Editer Chauffeur
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
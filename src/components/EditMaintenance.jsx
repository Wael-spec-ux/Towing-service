import {Edit} from "lucide-react";
import { useEffect, useState } from "react";
import { GetAllTrucks, GetTruckByPlate, updateTruckMaintenance } from "../api/TruckApi";
export function EditTruckModal({setshowEditTruckModal, truckPlate,setTrucks,setUpdateTruck}) {
  const [truck,setTruck]=useState(null);
  const [NewLocation,setNewLocation]=useState(null)
  const [LastMaintenance,setLastMaintenance]=useState(null)
  const [NextMaintenance,setNextMaintenance]=useState(null)
  const [NewPlate,setNewPlate]=useState(null)
  const [NewName,setNewName]=useState(null)
    useEffect(()=>{
        const fetchTrucks=async()=>{
            const data=await GetTruckByPlate(truckPlate);
            setTruck(data);
            setNewLocation(data.location)
            setLastMaintenance(data.lastMaintenance)
            setNextMaintenance(data.nextMaintenance)
            setNewPlate(data.plate)
            setNewName(data.type)
        }
        fetchTrucks();
  },[])
  const Admintoken=localStorage.getItem('adminToken') 
  const handEditTruck =async()=>{
    const TruckPlate=NewPlate.toUpperCase();
    await updateTruckMaintenance(LastMaintenance,NextMaintenance,NewLocation,truck._id,TruckPlate,NewName,truck.driver);
    setNewLocation(null);
    if (Admintoken) {
      const update=await GetAllTrucks();
      setTrucks(update);
    }else{
      const updateTruck=await GetTruckByPlate(truckPlate)
      setUpdateTruck(updateTruck)
    }
    setshowEditTruckModal(false)
  }
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Edit className="w-6 h-6 mr-2 text-blue-400" />
            Edit Camion:
          </h3>
          <div className="space-y-4">
            {Admintoken &&<div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Numéro de Série de Camion:</label>
              <input
                type="text"
                required
                defaultValue={truck?.plate}
                onChange={(e) => setNewPlate(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dépôt Ben Arous"
              />
            </div>}
                        <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nom de Camion:</label>
              <input
                type="text"
                required
                defaultValue={truck?.type}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dépôt Ben Arous"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Localisation *</label>
              <input
                type="text"
                required
                defaultValue={truck?.location}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dépôt Ben Arous"
              />
            </div>
            <div>
              {/* <label className="block text-sm font-medium text-gray-300 mb-2">Chauffeur *</label>
              <select
                value={truck?.driver}
                onChange={(e) => setNewDriver({ driver: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un chauffeur</option>
                {drivers?.filter(d => d.assignedTruck === null).map(driver => (
                  <option key={driver._id} value={driver.name}>{driver.name}</option>
                ))}
              </select> */}
              {/* Error message */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dernière Maintenance</label>
              <input
                type="date"
                defaultValue={truck?.lastMaintenance ? new Date(truck.lastMaintenance).toISOString().split('T')[0] : ''}
                onChange={(e) => setLastMaintenance(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prochaine Maintenance</label>
              <input
                type="date"
                defaultValue={truck?.nextMaintenance ? new Date(truck.nextMaintenance).toISOString().split('T')[0] : ''}
                onChange={(e) => setNextMaintenance(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setshowEditTruckModal(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handEditTruck}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ajouter Camion
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
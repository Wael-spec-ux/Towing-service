import { useEffect, useState } from "react";
import { AssignDriverToTruck, GetAllTrucks } from "../api/TruckApi";
import { AssignTruck } from "../api/DriverApi";

export function AssignTruckModal({ selectedDriver,setDrivers,setshowAssignTruckModal }) {
    const [Truck, setTrucks] = useState([]);
    useEffect(() => {
      const fetchTrucks = async () => {
        const data = await GetAllTrucks();
        setTrucks(data);
            console.log("Trucks from truks modal:", data);
      };
      fetchTrucks();
    }, []);
    const availableTrucks=Truck.filter(t => t.driver === "");

const handleAssignTruck=async(driverId,truckPlate)=>{
        try{
            await AssignTruck(truckPlate,driverId);
            await AssignDriverToTruck(driverId,truckPlate)
            console.log("truck assigned succesfully");
            setDrivers(prev => prev.map(res =>
            res._id === driverId
            ? { ...res, assignedTruck: truckPlate}
            : res
    ));
        }catch(error){
            console.log(error.message);
        }
        setshowAssignTruckModal(false);
    }
    return ( 
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Assigner un Camion à Chauffeur {selectedDriver?.name}
          </h3>
          <div className="space-y-3 mb-6">
            <div className="text-gray-300 mb-2">Camion Disponibles :</div>
            {availableTrucks.length > 0 ? (
              availableTrucks.map(driver => (
                <div key={driver._id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{driver.plate}</div>
                    <div className="text-sm text-gray-400">{driver.location}</div>
                    <div className="text-sm text-gray-400">Derniere Maintenance: {new Date(driver.lastMaintenance).toISOString().split('T')[0]}</div>
                  </div>
                  <button
                    onClick={() => handleAssignTruck(selectedDriver._id,driver.plate)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Assigner
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400">
                Aucun Camion disponible pour le moment
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setshowAssignTruckModal(false)}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
  );
}
import {Truck} from "lucide-react";
export function NewTruckModal({ newTruck, setNewTruck, drivers, handleAddTruck, setShowNewTruckModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Truck className="w-6 h-6 mr-2 text-blue-400" />
            Ajouter un Nouveau Camion
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Plaque / Numéro de Série *</label>
              <input
                type="text"
                required
                value={newTruck.serialNumber}
                onChange={(e) => setNewTruck({ ...newTruck, serialNumber: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="204TU0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type *</label>
              <input
                type="text"
                required
                value={newTruck.type}
                onChange={(e) => setNewTruck({ ...newTruck, type: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Camion dépannage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Localisation *</label>
              <input
                type="text"
                required
                value={newTruck.location}
                onChange={(e) => setNewTruck({ ...newTruck, location: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dépôt Ben Arous"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Chauffeur *</label>
              <select
                value={newTruck.driver}
                onChange={(e) => setNewTruck({ ...newTruck, driver: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un chauffeur</option>
                {drivers.filter(d => d.assignedTruck === null).map(driver => (
                  <option key={driver._id} value={driver.name}>{driver.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dernière Maintenance</label>
              <input
                type="date"
                value={newTruck.lastMaintenance}
                onChange={(e) => setNewTruck({ ...newTruck, lastMaintenance: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prochaine Maintenance</label>
              <input
                type="date"
                value={newTruck.nextMaintenance}
                onChange={(e) => setNewTruck({ ...newTruck, nextMaintenance: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowNewTruckModal(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddTruck}
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
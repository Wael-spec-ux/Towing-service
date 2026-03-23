export function AssignDriverModal({ selectedReservation, availableDrivers, handleAssignDriver, setShowAssignModal }) {

    return ( 
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Assigner un Chauffeur — {selectedReservation?._id}
          </h3>
          <div className="mb-4 p-4 bg-gray-900/50 rounded-lg">
            <div className="font-medium text-white mb-2">Détails de la mission :</div>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Client : {selectedReservation?.firstName} {selectedReservation?.lastName}</div>
              <div>Service : {selectedReservation?.serviceType}</div>
              <div>
                Localisation : {selectedReservation?.carLocation 
                ? selectedReservation.carLocation 
                : `From ${selectedReservation?.transportFrom} To ${selectedReservation?.transportTo}`}
              </div>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            <div className="text-gray-300 mb-2">Chauffeurs Disponibles :</div>
            {availableDrivers.length > 0 ? (
              availableDrivers.map(driver => (
                <div key={driver._id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{driver.name}</div>
                    <div className="text-sm text-gray-400">{driver.phone} • {driver.currentLocation}</div>
                  </div>
                  <button
                    onClick={() => handleAssignDriver(selectedReservation._id, driver._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Assigner
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400">
                Aucun chauffeur disponible pour le moment
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowAssignModal(false)}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
  );
}
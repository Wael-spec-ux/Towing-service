import React, { useState } from "react";
import { 
  Users, 
  Car, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Trash2,
  Edit,
  Shield,
  TrendingUp,
  Package,
  UserPlus,
  Truck,
  Wrench,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data for reservations
  const [reservations, setReservations] = useState([
    {
      id: "RES-001",
      clientName: "Mohamed Ben Ali",
      phone: "71 234 567",
      serviceType: "Dépannage",
      carType: "Peugeot 208",
      location: "Ben Arous Centre",
      problem: "Batterie morte",
      status: "En attente",
      time: "10:30",
      date: "2024-01-21",
      assignedDriver: null
    },
    {
      id: "RES-002",
      clientName: "Fatma Bouazizi",
      phone: "98 765 432",
      serviceType: "Remorquage",
      carType: "Renault Clio",
      location: "Rades",
      problem: "Accident",
      status: "En cours",
      time: "11:15",
      date: "2024-01-21",
      assignedDriver: "DRV-001"
    },
    {
      id: "RES-003",
      clientName: "Karim Trabelsi",
      phone: "55 123 456",
      serviceType: "Changement pneu",
      carType: "Toyota Corolla",
      location: "Megrine",
      problem: "Pneu crevé",
      status: "Terminé",
      time: "09:45",
      date: "2024-01-21",
      assignedDriver: "DRV-002"
    },
    {
      id: "RES-004",
      clientName: "Sami Ben Ammar",
      phone: "22 333 444",
      serviceType: "Dépannage",
      carType: "Volkswagen Golf",
      location: "Hammam Lif",
      problem: "Panne moteur",
      status: "En attente",
      time: "14:20",
      date: "2024-01-21",
      assignedDriver: null
    },
  ]);

  // Mock data for drivers
  const [drivers, setDrivers] = useState([
    {
      id: "DRV-001",
      name: "Ali Ben Salah",
      phone: "71 111 222",
      status: "En mission",
      currentLocation: "Rades",
      truckId: "TRK-001",
      missionsToday: 3,
      rating: 4.8
    },
    {
      id: "DRV-002",
      name: "Hichem Boukadida",
      phone: "71 333 444",
      status: "Disponible",
      currentLocation: "Dépôt Ben Arous",
      truckId: "TRK-002",
      missionsToday: 2,
      rating: 4.9
    },
    {
      id: "DRV-003",
      name: "Rami Chaabane",
      phone: "71 555 666",
      status: "Problème camion",
      currentLocation: "Garage",
      truckId: "TRK-003",
      missionsToday: 0,
      rating: 4.7
    },
    {
      id: "DRV-004",
      name: "Nabil Mansouri",
      phone: "71 777 888",
      status: "Disponible",
      currentLocation: "Ben Arous Centre",
      truckId: "TRK-004",
      missionsToday: 1,
      rating: 4.6
    },
  ]);

  // Mock data for trucks
  const [trucks, setTrucks] = useState([
    {
      id: "TRK-001",
      plate: "204TU1234",
      type: "Camion dépannage",
      status: "En mission",
      driver: "Ali Ben Salah",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-02-15",
      location: "Rades"
    },
    {
      id: "TRK-002",
      plate: "204TU5678",
      type: "Camion remorque",
      status: "Opérationnel",
      driver: "Hichem Boukadida",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-02-10",
      location: "Dépôt Ben Arous"
    },
    {
      id: "TRK-003",
      plate: "204TU9101",
      type: "Camion dépannage",
      status: "En réparation",
      driver: "Rami Chaabane",
      lastMaintenance: "2024-01-05",
      nextMaintenance: "2024-02-05",
      location: "Garage"
    },
    {
      id: "TRK-004",
      plate: "204TU1121",
      type: "Camion remorque",
      status: "Opérationnel",
      driver: "Nabil Mansouri",
      lastMaintenance: "2024-01-12",
      nextMaintenance: "2024-02-12",
      location: "Ben Arous Centre"
    },
  ]);

  // State for new driver form
  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    email: "",
    licenseNumber: "",
    truckId: ""
  });
    // State for new truck form
  const [newTruck, setNewTruck] = useState({
    name: "",
    serialNumber: "",
    type: "",
    status: "Disponible",
    location: "Dépôt Ben Arous"
  });

  // State for modals
  const [showNewDriverModal, setShowNewDriverModal] = useState(false);
  const [showNewTruckModal, setShowNewTruckModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("reservations");

  // Stats
  const stats = {
    totalReservations: reservations.length,
    pendingReservations: reservations.filter(r => r.status === "En attente").length,
    activeDrivers: drivers.filter(d => d.status === "Disponible").length,
    availableTrucks: trucks.filter(t => t.status === "Opérationnel").length,
    todayMissions: reservations.filter(r => r.date === "2024-01-21" && r.status === "Terminé").length
  };

  // Handle assign driver
  const handleAssignDriver = (reservationId, driverId) => {
    setReservations(reservations.map(res => 
      res.id === reservationId 
        ? { ...res, assignedDriver: driverId, status: "En cours" }
        : res
    ));
    
    // Update driver status
    setDrivers(drivers.map(driver =>
      driver.id === driverId
        ? { ...driver, status: "En mission", missionsToday: driver.missionsToday + 1 }
        : driver
    ));
    
    setShowAssignModal(false);
  };

  // Handle complete reservation
  const handleCompleteReservation = (reservationId) => {
    setReservations(reservations.map(res => 
      res.id === reservationId 
        ? { ...res, status: "Terminé" }
        : res
    ));

    // Free up the driver
    const reservation = reservations.find(r => r.id === reservationId);
    if (reservation.assignedDriver) {
      setDrivers(drivers.map(driver =>
        driver.id === reservation.assignedDriver
          ? { ...driver, status: "Disponible" }
          : driver
      ));
    }
  };

  // Handle delete driver
  const handleDeleteDriver = (driverId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce chauffeur ?")) {
      setDrivers(drivers.filter(driver => driver.id !== driverId));
    }
  };

  // Handle add new driver
  const handleAddDriver = (e) => {
    e.preventDefault();
    const newDriverId = `DRV-${String(drivers.length + 1).padStart(3, '0')}`;
    
    const driverToAdd = {
      id: newDriverId,
      name: newDriver.name,
      phone: newDriver.phone,
      status: "Disponible",
      currentLocation: "Dépôt Ben Arous",
      truckId: newDriver.truckId || "N/A",
      missionsToday: 0,
      rating: 0
    };

    setDrivers([...drivers, driverToAdd]);
    setNewDriver({ name: "", phone: "", email: "", licenseNumber: "", truckId: "" });
    setShowNewDriverModal(false);
  };
    // Handle add new truck
  const handleAddTruck = (e) => {
    e.preventDefault();
    const newTruckId = `TRK-${String(trucks.length + 1).padStart(3, '0')}`;
    
    const truckToAdd = {
      id: newTruckId,
      name: newTruck.name,
      phone: newTruck.phone,
      status: "Disponible",
      currentLocation: "Dépôt Ben Arous",
      truckId: newDriver.truckId || "N/A",
      missionsToday: 0,
      rating: 0
    };

    setDrivers([...drivers, driverToAdd]);
    setNewDriver({ name: "", phone: "", email: "", licenseNumber: "", truckId: "" });
    setShowNewDriverModal(false);
  };

  // Filter available drivers
  const availableDrivers = drivers.filter(driver => driver.status === "Disponible");

  // Filter reservations based on search
  const filteredReservations = reservations.filter(reservation =>
    reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.phone.includes(searchTerm)
  );

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "En attente": return "bg-yellow-500/20 text-yellow-400";
      case "En cours": return "bg-blue-500/20 text-blue-400";
      case "Terminé": return "bg-green-500/20 text-green-400";
      case "Disponible": return "bg-green-500/20 text-green-400";
      case "En mission": return "bg-blue-500/20 text-blue-400";
      case "Problème camion": return "bg-red-500/20 text-red-400";
      case "Opérationnel": return "bg-green-500/20 text-green-400";
      case "En réparation": return "bg-red-500/20 text-red-400";
      case "En mission": return "bg-blue-500/20 text-blue-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  // New Driver Modal
  const NewDriverModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <UserPlus className="w-6 h-6 mr-2 text-blue-400" />
          Ajouter un Nouveau Chauffeur
        </h3>
        
        <form onSubmit={handleAddDriver} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom Complet *
            </label>
            <input
              type="text"
              required
              value={newDriver.name}
              onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ali Ben Salah"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              required
              value={newDriver.phone}
              onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="71 234 567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={newDriver.email}
              onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ali@topdepannage.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Numéro de Permis
            </label>
            <input
              type="text"
              value={newDriver.licenseNumber}
              onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456789"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Camion Assigné (optionnel)
            </label>
            <select
              value={newDriver.truckId}
              onChange={(e) => setNewDriver({...newDriver, truckId: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un camion</option>
              {trucks.filter(t => t.status === "Opérationnel" && !t.driver).map(truck => (
                <option key={truck.id} value={truck.id}>{truck.plate} - {truck.type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowNewDriverModal(false)}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter Chauffeur
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Assign Driver Modal
  const AssignDriverModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-white mb-6">
          Assigner un Chauffeur à la Réservation {selectedReservation?.id}
        </h3>
        
        <div className="mb-4 p-4 bg-gray-900/50 rounded-lg">
          <div className="font-medium text-white mb-2">Détails de la mission:</div>
          <div className="text-sm text-gray-300">
            <div>Client: {selectedReservation?.clientName}</div>
            <div>Service: {selectedReservation?.serviceType}</div>
            <div>Localisation: {selectedReservation?.location}</div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="text-gray-300 mb-2">Chauffeurs Disponibles:</div>
          {availableDrivers.length > 0 ? (
            availableDrivers.map(driver => (
              <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <div>
                  <div className="font-medium text-white">{driver.name}</div>
                  <div className="text-sm text-gray-400">{driver.phone} • {driver.currentLocation}</div>
                </div>
                <button
                  onClick={() => handleAssignDriver(selectedReservation.id, driver.id)}
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
  // New Truck Modal
  const NewTruckModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <UserPlus className="w-6 h-6 mr-2 text-blue-400" />
          Ajouter un Nouveau Camion
        </h3>
        
        <form onSubmit={handleAddDriver} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom Complet *
            </label>
            <input
              type="text"
              required
              value={newDriver.name}
              onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ali Ben Salah"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              required
              value={newDriver.phone}
              onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="71 234 567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={newDriver.email}
              onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ali@topdepannage.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Numéro de Permis
            </label>
            <input
              type="text"
              value={newDriver.licenseNumber}
              onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456789"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Camion Assigné (optionnel)
            </label>
            <select
              value={newDriver.truckId}
              onChange={(e) => setNewDriver({...newDriver, truckId: e.target.value})}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un camion</option>
              {trucks.filter(t => t.status === "Opérationnel" && !t.driver).map(truck => (
                <option key={truck.id} value={truck.id}>{truck.plate} - {truck.type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowNewDriverModal(false)}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter Chauffeur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Tableau de Bord Admin</h1>
            <p className="text-gray-400">Top Dépannage - Ben Arous</p>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
            <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.totalReservations}</div>
                <div className="text-sm text-gray-400">Réservations</div>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.pendingReservations}</div>
                <div className="text-sm text-gray-400">En Attente</div>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.activeDrivers}</div>
                <div className="text-sm text-gray-400">Chauffeurs Disponibles</div>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.availableTrucks}</div>
                <div className="text-sm text-gray-400">Camions Opérationnels</div>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Truck className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.todayMissions}</div>
                <div className="text-sm text-gray-400">Missions Aujourd'hui</div>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`px-4 py-2 font-medium ${activeTab === "reservations" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            <Calendar className="w-5 h-5 inline-block mr-2" />
            Réservations
          </button>
          <button
            onClick={() => setActiveTab("drivers")}
            className={`px-4 py-2 font-medium ${activeTab === "drivers" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            <Users className="w-5 h-5 inline-block mr-2" />
            Chauffeurs
          </button>
          <button
            onClick={() => setActiveTab("trucks")}
            className={`px-4 py-2 font-medium ${activeTab === "trucks" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            <Truck className="w-5 h-5 inline-block mr-2" />
            Camions
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtrer
            </button>
          </div>
        </div>

        {/* Reservations Tab */}
        {activeTab === "reservations" && (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">Réservations du Jour</h2>
              <span className="text-gray-400">{new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-400 font-medium">ID</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Client</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Service</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Localisation</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Problème</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Statut</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Chauffeur</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4">
                        <div className="font-mono text-blue-400">{reservation.id}</div>
                        <div className="text-sm text-gray-400">{reservation.time}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{reservation.clientName}</div>
                        <div className="text-sm text-gray-400">{reservation.phone}</div>
                      </td>
                      <td className="p-4">
                        <div>{reservation.serviceType}</div>
                        <div className="text-sm text-gray-400">{reservation.carType}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {reservation.location}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1 text-yellow-400" />
                          {reservation.problem}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {reservation.assignedDriver ? (
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-green-400" />
                            <span className="text-sm">
                              {drivers.find(d => d.id === reservation.assignedDriver)?.name || 'N/A'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Non assigné</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          {reservation.status === "En attente" && (
                            <button
                              onClick={() => {
                                setSelectedReservation(reservation);
                                setShowAssignModal(true);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                            >
                              Assigner
                            </button>
                          )}
                          
                          {reservation.status === "En cours" && (
                            <button
                              onClick={() => handleCompleteReservation(reservation.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                            >
                              Terminer
                            </button>
                          )}
                          
                          <button className="p-1 text-gray-400 hover:text-white">
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Drivers Tab */}
        {activeTab === "drivers" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Gestion des Chauffeurs</h2>
              <button
                onClick={() => setShowNewDriverModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Ajouter Chauffeur
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {drivers.map((driver) => (
                <div key={driver.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{driver.name}</h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Phone className="w-4 h-4 mr-1" />
                        {driver.phone}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <Truck className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Camion: <span className="text-blue-400">{driver.truckId}</span></span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-300">{driver.currentLocation}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Package className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Missions aujourd'hui: <span className="font-bold">{driver.missionsToday}</span></span>
                    </div>
                    <div className="flex items-center text-sm">
                      {/* <Star className="w-4 h-4 mr-2 text-yellow-400" /> */}
                      <span>Note: <span className="font-bold">{driver.rating}/5</span></span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDriver(driver.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700/50 rounded-lg">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trucks Tab */}
        {activeTab === "trucks" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">État de la Flotte</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trucks.map((truck) => (
                <div key={truck.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{truck.plate}</h3>
                      <div className="text-gray-400 text-sm">{truck.type}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(truck.status)}`}>
                      {truck.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-400">Chauffeur</div>
                        <div className="font-medium">{truck.driver || "Non assigné"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-400">Localisation</div>
                        <div className="font-medium">{truck.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-400">Dernière Maintenance</div>
                        <div className="font-medium">{truck.lastMaintenance}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-400">Prochaine Maintenance</div>
                        <div className="font-medium">{truck.nextMaintenance}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    {truck.status === "En réparation" && (
                      <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                        <Wrench className="w-4 h-4 inline-block mr-1" />
                        Réparé
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-600 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                      Détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-900/20 to-gray-900/20 rounded-xl border border-blue-700/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-1">Maintenance Préventive</h4>
                  <p className="text-gray-400 text-sm">Prochaine maintenance programmée dans 15 jours</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Programmer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showNewDriverModal && <NewDriverModal />}
      {showAssignModal && <AssignDriverModal />}
      {showNewTruckModal && <NewTruckModal />}
    </div>
  );
};

export default AdminDashboard;
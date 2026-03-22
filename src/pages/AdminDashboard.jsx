import React, { useEffect, useState } from "react";
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
import { GetAllReservations } from "../api/reservationApi";
import { GetAllDrivers } from "../api/DriverApi";
import { AddDriver } from "../api/DriverApi";
const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const AllReservations = async () => {
      const data = await GetAllReservations();
      setReservations(data);
          console.log("Reservations in AdminDashboard:", data);
    };
    AllReservations();
  }, [ reservations.length ]);
  

  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    const fetchDrivers = async () => {
      const data = await GetAllDrivers();
      setDrivers(data);
          console.log("Drivers in AdminDashboard:", data);
    };
    fetchDrivers();
  }, [ drivers.length ]);

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

  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    email: "",
    licenseNumber: "",
    truckId: "",
    password: ""
  });

  const [newTruck, setNewTruck] = useState({
    serialNumber: "",
    type: "",
    status: "Opérationnel",
    location: "Dépôt Ben Arous",
    driver: "",
    lastMaintenance: "",
    nextMaintenance: ""
  });

  const [showNewDriverModal, setShowNewDriverModal] = useState(false);
  const [showNewTruckModal, setShowNewTruckModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("reservations");

  const stats = {
    totalReservations: reservations.length,
    pendingReservations: reservations.filter(r => r.status === "En attente").length,
    activeDrivers: drivers.filter(d => d.status === "available").length,
    availableTrucks: trucks.filter(t => t.status === "Opérationnel").length,
    todayMissions: reservations.filter(r => r.createdAt === new Date().toISOString().split('T')[0] && r.status === "Terminé").length
  };

  const handleAssignDriver = (reservationId, driverId) => {
    setReservations(prev => prev.map(res =>
      res._id === reservationId
        ? { ...res, assignedDriver: driverId, status: "En cours" }
        : res
    ));
    setDrivers(prev => prev.map(driver =>
      driver._id === driverId
        ? { ...driver, status: "En mission", missionsToday: driver.missionsToday + 1 }
        : driver
    ));
    setShowAssignModal(false);
  };

  const handleDeleteDriver = (driverId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce chauffeur ?")) {
      setDrivers(prev => prev.filter(driver => driver.id !== driverId));
    }
  };

  const handleDeleteTruck = (truckId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce camion ?")) {
      setTrucks(prev => prev.filter(truck => truck.id !== truckId));
    }
  };

  const handleMarkTruckRepaired = (truckId) => {
    setTrucks(prev => prev.map(truck =>
      truck.id === truckId ? { ...truck, status: "Opérationnel" } : truck
    ));
  };
  const handleAddDriver = (e) => {
    e.preventDefault();
    // const newDriverId = `DRV-${String(drivers.length + 1).padStart(3, "0")}`;
    const driverToAdd = {
      name: newDriver.name,
      phone: newDriver.phone,
      truckId: newDriver.truckId || "N/A",
      email: newDriver.email || "N/A",
      licenseNumber: newDriver.licenseNumber || "N/A",
      password: newDriver.password ,};
    AddDriver(driverToAdd);
    setDrivers(prev => [...prev, driverToAdd]);
    setNewDriver({ name: "", phone: "", email: "", licenseNumber: "", truckId: "" , password:""});
    setShowNewDriverModal(false);
  };

  const handleAddTruck = (e) => {
    e.preventDefault();
    const newTruckId = `TRK-${String(trucks.length + 1).padStart(3, "0")}`;
    const plate = newTruck.serialNumber.toUpperCase();
    const truckToAdd = {
      id: newTruckId,
      plate: plate,
      type: newTruck.type,
      status: "Opérationnel",
      driver: newTruck.driver,
      lastMaintenance: newTruck.lastMaintenance || "N/A",
      nextMaintenance: newTruck.nextMaintenance || "N/A",
      location: newTruck.location
    };
    setTrucks(prev => [...prev, truckToAdd]);
    setNewTruck({ serialNumber: "", type: "", status: "Opérationnel", location: "Dépôt Ben Arous", driver: "", lastMaintenance: "", nextMaintenance: "" });
    setShowNewTruckModal(false);
  };

  const availableDrivers = drivers.filter(driver => driver.status === "available");

  const filteredReservations = reservations.filter(reservation =>
    reservation.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.phone.includes(searchTerm)
  );

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone.includes(searchTerm)
  );

  const filteredTrucks = trucks.filter(truck =>
    truck.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (truck.driver && truck.driver.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "En attente": return "bg-yellow-500/20 text-yellow-400";
      case "En cours": return "bg-blue-500/20 text-blue-400";
      case "Terminé": return "bg-green-500/20 text-green-400";
      case "Disponible": return "bg-green-500/20 text-green-400";
      case "En mission": return "bg-blue-500/20 text-blue-400";
      case "Problème camion": return "bg-red-500/20 text-red-400";
      case "Opérationnel": return "bg-green-500/20 text-green-400";
      case "En réparation": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  // ── Modals ──────────────────────────────────────────────────────────────────

  const NewDriverModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <UserPlus className="w-6 h-6 mr-2 text-blue-400" />
          Ajouter un Nouveau Chauffeur
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nom Complet *</label>
            <input
              type="text"
              required
              value={newDriver.name}
              onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ali Ben Salah"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone *</label>
            <input
              type="tel"
              required
              value={newDriver.phone}
              onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="71 234 567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={newDriver.email}
              onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ali@topdepannage.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Numéro de Permis</label>
            <input
              type="text"
              value={newDriver.licenseNumber}
              onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mot de Passe</label>
            <input
              type="password"
              value={newDriver.password}
              onChange={(e) => setNewDriver({ ...newDriver, password: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456789"
            />
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
              onClick={handleAddDriver}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter Chauffeur
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const NewTruckModal = () => (
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
              {drivers.filter(d => d.status === "Disponible").map(driver => (
                <option key={driver.id} value={driver.name}>{driver.name}</option>
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

  const AssignDriverModal = () => (
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

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Réservations", value: stats.totalReservations, icon: <Package className="w-6 h-6 text-blue-400" />, bg: "bg-blue-500/20" },
          { label: "En Attente", value: stats.pendingReservations, icon: <Clock className="w-6 h-6 text-yellow-400" />, bg: "bg-yellow-500/20" },
          { label: "Chauffeurs Disponibles", value: stats.activeDrivers, icon: <Users className="w-6 h-6 text-green-400" />, bg: "bg-green-500/20" },
          { label: "Camions Opérationnels", value: stats.availableTrucks, icon: <Truck className="w-6 h-6 text-green-400" />, bg: "bg-green-500/20" },
          { label: "Missions Aujourd'hui", value: stats.todayMissions, icon: <TrendingUp className="w-6 h-6 text-purple-400" />, bg: "bg-purple-500/20" },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
              <div className={`p-2 ${stat.bg} rounded-lg`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-800">
        {[
          { key: "reservations", label: "Réservations", icon: <Calendar className="w-5 h-5 inline-block mr-2" /> },
          { key: "drivers", label: "Chauffeurs", icon: <Users className="w-5 h-5 inline-block mr-2" /> },
          { key: "trucks", label: "Camions", icon: <Truck className="w-5 h-5 inline-block mr-2" /> },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium ${activeTab === tab.key ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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

      {/* ── Reservations Tab ── */}
      {activeTab === "reservations" && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">Réservations du Jour</h2>
            <span className="text-gray-400">{new Date().toLocaleDateString("fr-FR")}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  {["Client", "Service", "Localisation", "Problème", "Statut", "Chauffeur", "Actions"].map(h => (
                    <th key={h} className="text-left p-4 text-gray-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation._id} className="border-b border-gray-800 hover:bg-gray-800/50">

                    <td className="p-4">
                      <div className="font-medium">{reservation.firstName} {reservation.lastName}</div>
                      <div className="text-sm text-gray-400">{reservation.phone}</div>
                    </td>
                    <td className="p-4">
                      <div>{reservation.serviceType}</div>
                      <div className="text-sm text-gray-400">{reservation.carType}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {reservation.carLocation} {reservation.transportFrom }
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1 text-yellow-400" />
                        {reservation.problemDescription || "Aucun problème signalé"}
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
                            {drivers.find(d => d.id === reservation.assignedDriver)?.name || "N/A"}
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
                            onClick={() => { setSelectedReservation(reservation); setShowAssignModal(true); }}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                          >
                            Assigner
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

      {/* ── Drivers Tab ── */}
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
            {filteredDrivers.map((driver) => (
              <div key={driver._id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
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
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2 text-gray-400" />
                    Camion : <span className="text-blue-400 ml-1">{driver.truckId}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-300">{driver.currentLocation}</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-gray-400" />
                    Missions aujourd'hui : <span className="font-bold ml-1">{driver.missionsToday}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">★</span>
                    Note : <span className="font-bold ml-1">{driver.rating}/5</span>
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

      {/* ── Trucks Tab ── */}
      {activeTab === "trucks" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Gestion des Camions</h2>
            <button
              onClick={() => setShowNewTruckModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter Camion
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTrucks.map((truck) => (
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
                    <button
                      onClick={() => handleMarkTruckRepaired(truck.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center"
                    >
                      <Wrench className="w-4 h-4 mr-1" />
                      Réparé
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTruck(truck.id)}
                    className="px-3 py-1 border border-red-700/50 text-red-400 rounded-lg text-sm hover:bg-red-900/30 transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Supprimer
                  </button>
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

      {/* Modals */}
      {showNewDriverModal && <NewDriverModal />}
      {showAssignModal && selectedReservation && <AssignDriverModal />}
      {showNewTruckModal && <NewTruckModal />}
    </div>
  );
};

export default AdminDashboard;
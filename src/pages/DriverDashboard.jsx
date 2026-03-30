import { useState } from "react";
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ChevronRight,
  Wrench,
  Phone,
  User,
  Bell,
  Package,
  Star,
  Navigation,
  MessageSquare,
  X,
  Send,
  Coffee,
  Shield,
  Activity,
  Info,
  ChevronDown,
  Plus,
  Edit
} from "lucide-react";
import { GetDriverById ,updateDriverStatus} from "../api/DriverApi";
import { GetTruckByPlate } from "../api/TruckApi";
import { FindTasksByAssignedDriverEqualsToDriverId ,changeTaskStatus} from "../api/reservationApi";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { sendProblemMessage } from "../api/DriverQickActions";
import { RequestRestDay } from "../api/DriverQickActions";
import { EditTruckModal } from "../components/EditMaintenance";
import { EditDriverModal } from "../components/EditDriverModal";
// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusStyles = {
  // "En attente": "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  "En cours":   "bg-sky-500/15 text-sky-400 border border-sky-500/30",
  "Terminé":    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
};

const priorityStyles = {
  Urgent: "bg-red-500/15 text-red-400 border border-red-500/30",
  Normal: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
};

const FuelBar = ({ value }) => (
  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
    <div
      className={`h-full rounded-full transition-all duration-700 ${
        value > 50 ? "bg-emerald-500" : value > 25 ? "bg-amber-500" : "bg-red-500"
      }`}
      style={{ width: `${value}%` }}
    />
  </div>
);

// ─── Modal wrapper ────────────────────────────────────────────────────────────
const Modal = ({ title, icon, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
    <div className="bg-gray-900 border border-gray-700/60 rounded-2xl w-full max-w-md shadow-2xl">
      <div className="flex items-center justify-between p-5 border-b border-gray-700/60">
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-white text-lg">{title}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-700/60 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function DriverDashboard() {
    const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [truck,setTruck]=useState(null);
  const [tasks, setTasks] = useState([]);
  const TRUCK = truck;
  const [driverStatus, setDriverStatus] = useState(null);
  const [modal, setModal] = useState(null); // "problem" | "rest" | "message" | "detail" | "complete"
  const [selectedTask, setSelectedTask] = useState(null);
  const [problemText, setProblemText] = useState("");
  const [problemType, setProblemType] = useState("Camion");
  const [restDay, setRestDay] = useState(""); 
  const [restReason, setRestReason] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [showEditTruckModal,setshowEditTruckModal]=useState(false)
  const [truckPlate,setTruckPlate]=useState(null)
  const [ShowEditDriver,setShowEditDriver]=useState(false)
  const [SelectedDriver,setSelectedDriver]=useState(null)
  useEffect(() => {
    const fetchDriver = async () => {
      const driverId = localStorage.getItem('driverId');
      // Guard — no id → redirect to login
      if (!driverId) {
        navigate('/login');
        return; // ← stop execution
      }

      const data = await GetDriverById(driverId);
      const Tasks = await FindTasksByAssignedDriverEqualsToDriverId(data._id);
      const Truck= await GetTruckByPlate(data.assignedTruck)
      setDriver(data);
      setDriverStatus(data.status)
      setTasks(Tasks)
      setTruck(Truck);
      console.log("driver from the useEffect",data)
      console.log("tasks from the useEffect",Tasks)
      console.log("Truck from the useEffect",Truck)
    };

    fetchDriver();
  }, []); // ← runs once on mount

  const  DRIVER = driver;

  // const handleStartTask = (taskId) => {
  //   setTasks((prev) =>
  //     prev.map((t) => (t.id === taskId ? { ...t, status: "En cours" } : t))
  //   );
  // };
  const handleDriverStatus=async (DriverStatus,id)=>{
    await updateDriverStatus(id,DriverStatus)
    setDriverStatus(DriverStatus)
  }

  const handleCompleteTask = async (taskId,driverId) => {
    const taskStatus="Terminé"
    const driverStatus="available"
    await changeTaskStatus(taskId,taskStatus);
    await updateDriverStatus(driver._id,driverStatus)
    const data = await GetDriverById(driverId);
    const Tasks = await FindTasksByAssignedDriverEqualsToDriverId(data._id);
    setDriverStatus(driverStatus)
    setTasks(Tasks);
    setModal(null);
    setSelectedTask(null);
  };

  const handleSend = async (type) => {
    await sendProblemMessage(problemType,problemText,driver.email)
    setSubmitted(type);
    setTimeout(() => {
      setModal(null);
      setProblemText("");
      setSubmitted(null);
    }, 1800);
  };
    const handleSendRestDay = async (type) => {
    await RequestRestDay(restDay,restReason,driver.email)
    setSubmitted(type);
    setTimeout(() => {
      setModal(null);
      setProblemText("");
      setRestDay("");
      setRestReason("");
      setSubmitted(null);
    }, 1800);
  };

  const completedCount = tasks.filter((t) => t.status === "Terminé").length;
  // const pendingCount   = tasks.filter((t) => t.status === "En attente").length;
  const ongoingCount   = tasks.filter((t) => t.status === "En cours").length;

  const statusColor = {
    "available":       "text-emerald-400",
    "En mission":     "text-sky-400",
    "En congé":       "text-amber-400",
    "Problème camion":"text-red-400",
  };
    if (!driver) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-400">Loading...</p>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur border-b border-gray-800/60 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-none">Espace Chauffeur</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            

            {driver && (
              <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-1.5 rounded-xl border border-gray-700/40">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold">
                {driver.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-200">
                {driver.name.split(" ")[0]}
              </span>
            </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* ── Hero card ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-900/40 via-blue-900/30 to-gray-900 border border-sky-700/30 p-6">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/25 text-2xl font-bold">
                {DRIVER.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{DRIVER.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{DRIVER.currentLocation}</span>
                  <span className="text-gray-600">•</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-xs font-medium">{DRIVER.rating}/5</span>
                  </div>
                <button
                onClick={() => {setSelectedDriver(driver._id);setShowEditDriver(true)}}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
                </div>
              </div>
            </div>

            {/* Status selector */}
            
            <div className="flex items-center gap-2 bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-2.5 self-start sm:self-auto">
              <Activity className="w-4 h-4 text-gray-400" />
              <select
                value={driverStatus}
                onChange={(e) => handleDriverStatus(e.target.value,driver._id)}
                className={`bg-gray-900/95 text-sm font-semibold focus:outline-none cursor-pointer ${statusColor[driverStatus] ?? "text-white"}`}
              >
                <option value="available">Disponible</option>
                <option value="En mission">En mission</option>
                <option value="En congé">En congé</option>
                <option value="Problème camion">Problème camion</option>
              </select>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { label: "Terminées",  value: completedCount, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { label: "En cours",   value: ongoingCount,   color: "text-sky-400",     bg: "bg-sky-500/10 border-sky-500/20" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border px-4 py-3 ${s.bg}`}>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Two-col grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Assigned Truck */}
          <div className="bg-gray-900 border border-gray-700/60 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-sky-400" />
              <h2 className="font-semibold text-white">Camion Assigné</h2>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-white tracking-wide">{TRUCK.plate}</div>
                <div className="text-sm text-gray-400">{TRUCK.type}</div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  TRUCK.status === "Opérationnel"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/15 text-red-400 border border-red-500/30"
                }`}
              >
                {TRUCK.status}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Localisation
                </div>
                <span className="text-gray-200">{TRUCK.location}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Prochaine maintenance
                </div>
                <span className="text-gray-200">{new Date(TRUCK.nextMaintenance).toISOString().split('T')[0]}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Dernier maintenance
                </div>
                <span className="text-gray-200">{new Date(TRUCK.lastMaintenance).toISOString().split('T')[0]}</span>
              </div>
              <button
                      onClick={() => {setshowEditTruckModal(true);setTruckPlate(TRUCK.plate);}}
                      className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-950 hover:text-blue-300 text-sm font-medium rounded-lg transition-colors ml-auto"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                    </button>
              {/* <div>
                <div className="flex items-center justify-between text-gray-400 mb-1.5">
                  <span>Carburant</span>
                  <span
                    className={
                      TRUCK.fuel > 50
                        ? "text-emerald-400"
                        : TRUCK.fuel > 25
                        ? "text-amber-400"
                        : "text-red-400"
                    }
                  >
                    {TRUCK.fuel}%
                  </span>
                </div>
                <FuelBar value={TRUCK.fuel} />
              </div> */}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-gray-900 border border-gray-700/60 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-sky-400" />
              <h2 className="font-semibold text-white">Actions Rapides</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  key: "problem",
                  icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
                  iconBg: "bg-red-500/20 group-hover:bg-red-500/30",
                  cardBg: "bg-red-500/10 border-red-500/25 hover:bg-red-500/20",
                  title: "Signaler un Problème",
                  sub: "Camion, panne, accident…",
                  titleColor: "text-red-300",
                },
                {
                  key: "rest",
                  icon: <Coffee className="w-5 h-5 text-amber-400" />,
                  iconBg: "bg-amber-500/20 group-hover:bg-amber-500/30",
                  cardBg: "bg-amber-500/10 border-amber-500/25 hover:bg-amber-500/20",
                  title: "Demander un Jour de Repos",
                  sub: "Congé, indisponibilité…",
                  titleColor: "text-amber-300",
                },
              ].map((action) => (
                <button
                  key={action.key}
                  onClick={() => setModal(action.key)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-colors group text-left ${action.cardBg}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${action.iconBg}`}>
                    {action.icon}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${action.titleColor}`}>{action.title}</div>
                    <div className="text-xs text-gray-500">{action.sub}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tasks list ── */}
        <div className="bg-gray-900 border border-gray-700/60 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700/60">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-sky-400" />
              <h2 className="font-semibold text-white">Mes Missions </h2>
            </div>
            <span className="text-xs text-gray-500">
              {new Date().toLocaleDateString("fr-FR")}
            </span>
          </div>

          <div className="divide-y divide-gray-800/60">
            {tasks.map((task) => (
              <div key={task._id} className="p-5 hover:bg-gray-800/20 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusStyles[task.status]}`}>
                      {task.status}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(task.createdAt).toISOString().split('T')[0]}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="font-medium">{task.firstName} {task.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    {task.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Truck className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    {task.serviceType} — {task.carType}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    {task.carLocation || (task.transportFrom + " To " + task.transportTo)}                  
                    </div>
                  <div className="flex items-center gap-2 text-gray-400 sm:col-span-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500/60 flex-shrink-0" />
                    {task.problemDescription}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {/* {task.status === "En attente" && (
                    <button
                      onClick={() => handleStartTask(task._id)}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Démarrer
                    </button>
                  )} */}
                  {task.status === "En cours" && (
                    <button
                      onClick={() => { setSelectedTask(task); setModal("complete"); }}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Terminer
                    </button>
                  )}
                  {task.status === "Terminé" && (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium border border-emerald-500/20">
                      <CheckCircle className="w-4 h-4" />
                      Mission accomplie
                    </div>
                  )}
                  <button
                    onClick={() => { setSelectedTask(task); setModal("detail"); }}
                    className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 rounded-lg text-sm transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ═══════════════════════ MODALS ═══════════════════════ */}

      {/* Report Problem */}
      {modal === "problem" && (
        <Modal
          title="Signaler un Problème"
          icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
          onClose={() => setModal(null)}
        >
          {submitted === "problem" ? (
            <div className="flex flex-col items-center py-6 gap-3">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
              <p className="text-emerald-300 font-medium">Signalement envoyé à l'admin !</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type de problème</label>
                <select
                  value={problemType}
                  onChange={(e) => setProblemType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                >
                  <option>Camion</option>
                  <option>Panne sur route</option>
                  <option>Accident</option>
                  <option>Problème client</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  rows={4}
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="Décrivez le problème en détail…"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleSend("problem")}
                  disabled={!problemText.trim()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors text-sm flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Envoyer
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* Request Rest Day */}
      {modal === "rest" && (
        <Modal
          title="Demande de Jour de Repos"
          icon={<Coffee className="w-5 h-5 text-amber-400" />}
          onClose={() => setModal(null)}
        >
          {submitted === "rest" ? (
            <div className="flex flex-col items-center py-6 gap-3">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
              <p className="text-emerald-300 font-medium">Demande envoyée à l'admin !</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date souhaitée *</label>
                <input
                  type="text"
                  value={restDay}
                  onChange={(e) => setRestDay(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Motif</label>
                <textarea
                  rows={3}
                  value={restReason}
                  onChange={(e) => setRestReason(e.target.value)}
                  placeholder="Raison de l'absence (optionnel)…"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleSendRestDay("rest")}
                  disabled={!restDay.trim()}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors text-sm flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Envoyer
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
      {/* Task detail */}
      {modal === "detail" && selectedTask && (
        <Modal
          title={`Task Details`}
          icon={<Package className="w-5 h-5 text-sky-400" />}
          onClose={() => { setModal(null); setSelectedTask(null); }}
        >
          <div className="space-y-1 text-sm">
            {[
              { label: "Client",       value: selectedTask.firstName +" "+ selectedTask.lastName },
              { label: "Téléphone",    value: selectedTask.phone },
              { label: "Service",      value: selectedTask.serviceType },
              { label: "Véhicule",     value: selectedTask.carType },
              { label: "Localisation", value: selectedTask.carLocation ||(selectedTask.transportFrom +" To "+selectedTask.transportTo) },
              { label: "Problème",     value: selectedTask.problemDescription },
              { label: "Horaire",      value: new Date(selectedTask.createdAt).toISOString().split('T')[0] },
              { label: "Statut",       value: selectedTask.status },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between py-2.5 border-b border-gray-800/60 last:border-0"
              >
                <span className="text-gray-500">{row.label}</span>
                <span className="text-gray-200 font-medium">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-5">
            <button
              onClick={() => { setModal(null); setSelectedTask(null); }}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors text-sm"
            >
              Fermer
            </button>
          </div>
        </Modal>
      )}

      {/* Confirm complete */}
      {modal === "complete" && selectedTask && (
        <Modal
          title="Confirmer la fin de mission"
          icon={<CheckCircle className="w-5 h-5 text-emerald-400" />}
          onClose={() => { setModal(null); setSelectedTask(null); }}
        >
          <p className="text-gray-300 text-sm mb-6">
            Confirmez-vous que la mission De
            <span className="text-white font-semibold">{selectedTask.id}</span> pour le client(e){" "+selectedTask.firstName+" "+selectedTask.lastName}
            <span className="text-white font-semibold">{selectedTask.clientName}</span> est bien
            terminée ?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => { setModal(null); setSelectedTask(null); }}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors text-sm"
            >
              Annuler
            </button>
            <button
              onClick={() => handleCompleteTask(selectedTask._id,driver._id)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors text-sm flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Confirmer
            </button>
          </div>
        </Modal>
      )}
        {
          showEditTruckModal && <EditTruckModal
          truckPlate={truckPlate}
          setshowEditTruckModal={setshowEditTruckModal}
          setTrucks={null}
          setUpdateTruck={setTruck}
          />
        }
        {
          ShowEditDriver && <EditDriverModal
          setSelectedDriver={setSelectedDriver}
          setShowEditDriver={setShowEditDriver}
          selectedDriver={SelectedDriver}
          setDrivers={setDriver}
          />
        }
    </div>
  );
}
import express from 'express';
import { createReservation,getAllReservations,editReservation,deleteReservation ,updateAssignedDriverAndStatus,findTasksByAssignedDriverEqualsToDriverId,changeTaskStatus} from '../controllers/reservationController.js';
import { createDriver,updateDriver ,getAllDrivers,deleteDriver,updateDriverStatusAndMissions,updateDriverStatus,getDriverById,AssignTruck} from '../controllers/DriverController.js'; 
import { createTruck,updateTruck,getAllTrucks,deleteTruck,assignTruckToDriver,getTruckByPlate,AssignDriverToTruck,updateTruckMaintenance} from '../controllers/truckController.js';
import { loginAdmin,createAdmin,updateAdminPassword} from '../controllers/AdminLogin.js';
import { DriverLogin } from '../controllers/DriverLogin.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { resetPassword, requestPasswordReset } from '../controllers/auth/resetPassword.js';
import {sendProblemMessage,RequestRestDay} from '../controllers/Messages.js'
const router = express.Router();
// Reservation routes
router.post('/createReservation', createReservation);
router.get('/getAllReservations',verifyToken,(req,res)=>{getAllReservations(req,res)});
router.put('/editReservation', editReservation);
router.delete('/deleteReservation', deleteReservation);
router.put('/updateAssignedDriverAndStatus', verifyToken,(req,res)=>{updateAssignedDriverAndStatus(req,res)});
router.get('/findTasksByAssignedDriverEqualsToDriverId/:driverId',findTasksByAssignedDriverEqualsToDriverId);
router.put('/changeTaskStatus',changeTaskStatus)
// Driver routes
router.post('/createDriver', verifyToken,(req,res)=>{createDriver(req,res)});
router.put('/updateDriver', updateDriver);
router.put('/updateDriverStatusAndMissions', verifyToken,(req,res)=>{updateDriverStatusAndMissions(req,res)});
router.get('/getAllDrivers',verifyToken,(req,res)=>{getAllDrivers(req,res)});
router.delete('/deleteDriver',verifyToken,(req,res)=>{deleteDriver(req,res)});
router.post('/login/driver',DriverLogin);
router.put('/updateDriverStatus',verifyToken,(req,res)=>{updateDriverStatus(req,res)});
router.get('/getDriverById/:id',getDriverById);
router.put('/AssignTruck',verifyToken,(req,res)=>{AssignTruck(req,res)});
//Truck routes
router.post('/createTruck', createTruck);
router.put('/updateTruck', updateTruck);
router.get('/getAllTrucks',verifyToken,(req,res)=>{getAllTrucks(req,res)});
router.delete('/deleteTruck',verifyToken,(req,res)=>{deleteTruck(req,res)});
router.put('/assignTruckToDriver',verifyToken,(req,res)=>{assignTruckToDriver(req,res)});
router.get('/getTruckByPlate/:plate',getTruckByPlate);
router.put('/AssignDriverToTruck',verifyToken,(req,res)=>AssignDriverToTruck(req,res))
router.put('/updateTruckMaintenance',verifyToken,(req,res)=>{updateTruckMaintenance(req,res)})
//login admin router
router.post("/login/admin",loginAdmin);
router.post("/create/admin",createAdmin);
router.post("/admin/updatePassword", updateAdminPassword);
router.post("/reset-password/:token",resetPassword);
router.post("/requestPasswordReset",requestPasswordReset);
//notification routes
router.post("/sendProblemMessage",sendProblemMessage)
router.post('/RequestRestDay',RequestRestDay)
export default router;

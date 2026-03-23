import express from 'express';
import { createReservation,getAllReservations,editReservation,deleteReservation ,updateAssignedDriverAndStatus} from '../controllers/reservationController.js';
import { createDriver,updateDriver ,getAllDrivers,deleteDriver,updateDriverStatus} from '../controllers/DriverController.js'; 
import { createTruck,updateTruck,getAllTrucks,deleteTruck } from '../controllers/truckController.js';
import { loginAdmin,createAdmin,updateAdminPassword} from '../controllers/AdminLogin.js';
import { DriverLogin } from '../controllers/DriverLogin.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { resetPassword, requestPasswordReset } from '../controllers/auth/resetPassword.js';
const router = express.Router();
// Reservation routes
router.post('/createReservation', createReservation);
router.get('/getAllReservations',verifyToken,(req,res)=>{getAllReservations(req,res)});
router.put('/editReservation', editReservation);
router.delete('/deleteReservation', deleteReservation);
router.put('/updateAssignedDriverAndStatus', verifyToken,(req,res)=>{updateAssignedDriverAndStatus(req,res)});
// Driver routes
router.post('/createDriver', verifyToken,(req,res)=>{createDriver(req,res)});
router.put('/updateDriver', updateDriver);
router.put('/updateDriverStatus', verifyToken,(req,res)=>{updateDriverStatus(req,res)});
router.get('/getAllDrivers',verifyToken,(req,res)=>{getAllDrivers(req,res)});
router.delete('/deleteDriver',verifyToken,(req,res)=>{deleteDriver(req,res)});
router.post('/login/driver',DriverLogin);
//Truck routes
router.post('/createTruck', createTruck);
router.put('/updateTruck', updateTruck);
router.get('/getAllTrucks',getAllTrucks);
router.delete('/deleteTruck',deleteTruck);
//login admin router
router.post("/login/admin",loginAdmin);
router.post("/create/admin",createAdmin);
router.post("/admin/updatePassword", updateAdminPassword);
router.post("/reset-password/:token",resetPassword);
router.post("/requestPasswordReset",requestPasswordReset);
export default router;

import express from 'express';
import { createReservation,getAllReservations,editReservation,deleteReservation } from '../controllers/reservationController.js';
import { createDriver,updateDriver ,getAllDrivers,deleteDriver} from '../controllers/DriverController.js'; 
import { createTruck,updateTruck,getAllTrucks,deleteTruck } from '../controllers/truckController.js';
import { loginAdmin,createAdmin } from '../controllers/AdminLogin.js';
import { DriverLogin } from '../controllers/DriverLogin.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();
// Reservation routes
router.post('/createReservation', createReservation);
router.get('/getAllReservations',verifyToken,(req,res)=>{getAllReservations(req,res)});
router.put('/editReservation', editReservation);
router.delete('/deleteReservation', deleteReservation);
// Driver routes
router.post('/createDriver', createDriver);
router.put('/updateDriver', updateDriver);
router.get('/getAllDrivers',getAllDrivers);
router.delete('/deleteDriver',deleteDriver);
router.post('/login/driver',DriverLogin);
//Truck routes
router.post('/createTruck', createTruck);
router.put('/updateTruck', updateTruck);
router.get('/getAllTrucks',getAllTrucks);
router.delete('/deleteTruck',deleteTruck);
//login admin router
router.post("/login/admin",loginAdmin);
router.post("/create/admin",createAdmin);
export default router;

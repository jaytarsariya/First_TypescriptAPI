import express from 'express'
import { getAllTask,getTaskById,createTask, updateTask, deleteTask, CompletedTask } from '../controller/TaskController'
import { AdminLogOut, Adminlogin, DeleteUser, Forgetpassword, LoginUser, ResetPassword, createUser,getAllUser, getUserById, pagination, updateUser } from '../controller/UserController';
import { createProduct, deleteproduct, findproduct, updateproduct } from '../controller/ProductController';
export const router = express.Router();
import auth from '../../middleware/AdminAuth';


// task apis 
router.post("/taskcreate",createTask)
router.get("/taskview",getAllTask)
router.get("/taskview/:id",getTaskById)
router.put("/taskupdate/:id",updateTask)
router.delete("/taskdelete/:id",deleteTask)
router.put("/taskcompleted",CompletedTask)


// User apis
router.get("/view",auth,getAllUser)
router.post("/create",createUser)
router.get("/view/:id",getUserById)
router.post("/login",LoginUser)
router.delete("/delete/:id",DeleteUser)
router.patch("/update/:id",updateUser)
router.post("/adminlogin",Adminlogin)
router.post("/adminlogOut",AdminLogOut)
router.post("/forgetpassword",Forgetpassword)
router.post("/resetpassword/:token",ResetPassword)
router.get("/pagination",pagination)
// router.post("/resetpassword/reset",resetlink)

// Product apis

router.post("/prodcreate",auth,createProduct)
router.get("/productview",findproduct)
router.delete("/productdelete",deleteproduct)
router.patch("/productupdate/:id",updateproduct)
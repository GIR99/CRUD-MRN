{/* REFERENCIAR EXPRESS PARA BACKEND */}
const express = require("express");
const app = express();
{/* importar mysql tipo de instancia o llamar el paquete */}
const mysql = require("mysql");
{/* importar cors para no terner problemas en la insercion y colocarla en las funcion */}
const cors = require("cors");

{/* usar estas fucniones para no tener problemas  */}
app.use(cors());
{/* esta fucniuon indica que todo se trasformara en formato json */}
app.use(express.json());

{/* CREAR LA CONEXION o instancia CON MYSQL*/}
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crudnod"
});

{/* CREAR PETICION DE GUARDAR o CREAR*/}

app.post("/create",(req,res)=>{
    {/* VALORES QUE LLEGAN DE App.js que esta en el servidor cliente*/}
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    {/* CREAR SENTENCIA SQL PARA LA INSERCION DE LOS DATOS*/}
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios], 
    /* CREAR SENTENCIA SQL PARA ENCONTRAR ERRORES */
    (err,result)=> {
        if(err){
            console.log(err);
        }else{
            res.send("EMPLEADO REGISTRADO CON EXITO!!");
        }
    }
    );    
});

{/* SELECT */}
app.get("/empleados",(req,res)=>{
    
    db.query('SELECT * FROM empleados', 
    /* CREAR SENTENCIA SQL PARA ENCONTRAR ERRORES */
    (err,result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );    
});



{/* ACTUALIZACION DE DATOS*/}

app.put("/update",(req,res)=>{
    {/* VALORES QUE LLEGAN DE App.js que esta en el servidor cliente*/}
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    {/* CREAR SENTENCIA SQL PARA LA INSERCION DE LOS DATOS*/}
    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id], 
    /* CREAR SENTENCIA SQL PARA ENCONTRAR ERRORES */
    (err,result)=> {
        if(err){
            console.log(err);
        }else{
            res.send("EMPLEADO ACTUALIZADO CON EXITO!!");
        }
    }
    );    
});


app.delete("/delete/:id",(req,res)=>{
    {/* VALORES QUE LLEGAN DE App.js que esta en el servidor cliente*/}
    const id = req.params.id;
    {/* CREAR SENTENCIA SQL PARA LA INSERCION DE LOS DATOS*/}
    db.query('DELETE FROM empleados WHERE id=?',id, 
    /* CREAR SENTENCIA SQL PARA ENCONTRAR ERRORES */
    (err,result)=> {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );    
});

app.listen(3001,()=> {console.log("CORRIENDO EN EL PUERTO 3001")})
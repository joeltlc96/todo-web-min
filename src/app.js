const apiUrl = "http://localhost:3000/todos"
        const txtNombre = document.getElementById("txtNombre");
        const txtDescripcion = document.getElementById("txtDescripcion");
        const tablaTareas = document.getElementById("tablaTareas");
        LlenarTabla();


        async function Guardar(){

            const nuevaTarea = {
                name: txtNombre.value,
                description: txtDescripcion.value.trim() 
            }
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(nuevaTarea)
            });
            
            if(!response.ok){
                alert("Error llamando al servicio");
                return;
            }

            const TareaGuardada = await response.json();
            alert("Tarea guardada con exito. Nuevo id: "+ TareaGuardada.id);
        }

        async function LlenarTabla(){
            const tareas = await ObtenerTareas();
            console.log(tareas)
            DibujarTablas(tareas)
        }

        async function ObtenerTareas() {
            const response = await fetch(apiUrl)
            
            if(!response.ok){
                alert("Error llamando al servicio");
                return;
            }

            const tareas = await response.json();
            return tareas;
        }

        function DibujarTablas(tareas){
            tareas.forEach(tarea => {
                const nuevaFila = tablaTareas.insertRow();
                LlenarFila(nuevaFila, tarea);

            });
        }

        function LlenarFila(fila, tarea){
            const celdaNombre = fila.insertCell();
            celdaNombre.textContent = tarea.name;

            const celdaDescripcion = fila.insertCell();
            celdaDescripcion.textContent = tarea.description;

            const celdaCompleto= fila.insertCell();
            celdaCompleto.textContent = tarea.complete === "1" ? "Yes" : "NO";

            const celdaFecha = fila.insertCell();
            const fecha = new Date(tarea.created_at);
            celdaFecha.textContent = fecha.toLocaleDateString();

            const celdaAcciones = fila.insertCell();
            const btneditar = "<button class='btneditar'>Editar</button>";
            const btneliminar = `<button class="btneliminar" onclick="EliminarTarea('${tarea.name}')">Eliminar</button>`;
            celdaAcciones.innerHTML += btneditar;
            celdaAcciones.innerHTML += btneliminar;


            
        }

function EliminarTarea(tareaName, id){
    const mensaje = "Confirma la eliminación de: " + tareaName;
    const respuetaUsuario = confirm(mensaje)
}
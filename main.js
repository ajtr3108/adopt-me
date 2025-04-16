// variables

let gatos = JSON.parse(localStorage.getItem('gatos')) || [
    { especie: "gato", nombre: "Sussy", edad: "1 año", sexo: "hembra" },
    { especie: "gato", nombre: "Leo", edad: 6, sexo: "macho" }
];

let perros = JSON.parse(localStorage.getItem('perros')) || [
    { especie: "perro", nombre: "Nala", edad: 2, sexo: "hembra" },
    { especie: "perro", nombre: "Max", edad: 5, sexo: "macho" }
];

localStorage.setItem('gatos', JSON.stringify(gatos));
localStorage.setItem('perros', JSON.stringify(perros));

let contadorAdopciones = parseInt(localStorage.getItem('contadorAdopciones')) || 0;

// funcion para contar animales adoptados
function incrementarContadorAdopciones() {
    contadorAdopciones++;
    localStorage.setItem('contadorAdopciones', contadorAdopciones);
    mostrarContadorAdopciones();
}

function mostrarContadorAdopciones() {
    document.getElementById('contador-adopciones').innerText = `Se han adoptado ${contadorAdopciones} animales.`;
}

function mostrarAnimales(animales) {
    const animalesDiv = document.getElementById('animales-disponibles');
    animalesDiv.innerHTML = "<h2>Animales disponibles:</h2>";
    animales.forEach(animal => {
        const animalDiv = document.createElement('div');
        animalDiv.innerText = `Nombre: ${animal.nombre}, Edad: ${animal.edad}, Sexo: ${animal.sexo}`;
        animalesDiv.appendChild(animalDiv);
    });
    document.getElementById('adoptar-form').style.display = 'block';
}


// funcion para eliminar animales adoptados del storage y array
function animalAdoptado(animales, especie, nombre) {
    const index = animales.findIndex(animal => animal.nombre.toLowerCase() === nombre.toLowerCase());
    if (index !== -1) {
        animales.splice(index, 1);
        localStorage.setItem(especie, JSON.stringify(animales));
    }
}

function adoptarAnimal(animales, especie) {
    const nombre = document.getElementById('nombre-adoptar').value;
    let encontrado = false;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let animal of animales) {
                if (animal.nombre.toLowerCase() === nombre.toLowerCase()) {
                    encontrado = true;
                    resolve(animal); // Resolvemos la promesa si se encuentra el animal
                    break;
                }
            }
            if (!encontrado) reject("Animal no encontrado!"); // Rechazamos si no se encuentra
        }, 1000);
    })
    .then(animal => {
        Swal.fire({
            title: "Felicidades!",
            text: `Has adoptado a ${animal.nombre}!`,
            icon: "success"
        });
        incrementarContadorAdopciones();
        animalAdoptado(animales, especie === "gato" ? 'gatos' : 'perros', animal.nombre);
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
        });
    });
}

document.getElementById('mostrar-animales').addEventListener('click', () => {
    const especie = document.getElementById('especie').value;
    if (especie === "gato") {
        mostrarAnimales(gatos);
    } else if (especie === "perro") {
        mostrarAnimales(perros);
    }
});

document.getElementById('adoptar').addEventListener('click', () => {
    const especie = document.getElementById('especie').value;
    if (especie === "gato") {
        adoptarAnimal(gatos, "gato");
    } else if (especie === "perro") {
        adoptarAnimal(perros, "perro");
    }
});

// funcion para registrar mascotas nuevas para adoptar
document.getElementById('registrar-mascota').addEventListener('click', () => {
    const especie = document.getElementById('nueva-especie').value;
    const nombre = document.getElementById('nueva-nombre').value;
    const edad = parseInt(document.getElementById('nueva-edad').value);
    const sexo = document.getElementById('nueva-sexo').value;
    const nuevaMascota = new NuevaMascota(especie, nombre, edad, sexo);

    if (especie === "gato") {
        gatos.push(nuevaMascota);
        localStorage.setItem('gatos', JSON.stringify(gatos));
        Swal.fire({
            title: "Felicidades!",
            text: "Gato registrado exitosamente.",
            icon: "success"
          });
    } else if (especie === "perro") {
        perros.push(nuevaMascota);
        localStorage.setItem('perros', JSON.stringify(perros));
        Swal.fire({
            title: "Felicidades!",
            text: "Perro registrado exitosamente.",
            icon: "success"
        });
    } else {
        ;  Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "especie no valida!",
          });
    }
});

class NuevaMascota {
    constructor(especie, nombre, edad, sexo){
        this.especie = especie;
        this.nombre = nombre;
        this.edad = edad;
        this.sexo = sexo;
    }
}

function obtenerImagenesGatos() {
    fetch('https://api.thecatapi.com/v1/images/search?limit=5')
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('imagenes-gatos');
            contenedor.innerHTML = ""; // Limpiar contenido previo
            data.forEach(gato => {
                const img = document.createElement('img');
                img.src = gato.url;
                contenedor.appendChild(img);
            });
        })
        .catch(error => console.error('Error al obtener imágenes de gatos:', error));
}

document.getElementById('mostrar-imagenes-gatos').addEventListener('click', obtenerImagenesGatos);

function obtenerImagenesPerros() {
    fetch('https://api.thedogapi.com/v1/images/search?limit=5')
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('imagenes-perros');
            contenedor.innerHTML = ""; // Limpiar contenido previo
            data.forEach(perro => {
                const img = document.createElement('img');
                img.src = perro.url;
                contenedor.appendChild(img);
            });
        })
        .catch(error => console.error('Error al obtener imágenes de perros:', error));
}

document.getElementById('mostrar-imagenes-perros').addEventListener('click', obtenerImagenesPerros);

mostrarContadorAdopciones();
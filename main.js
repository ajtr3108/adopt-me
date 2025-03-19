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
    for (let animal of animales) {
        if (animal.nombre.toLowerCase() === nombre.toLowerCase()) {
            mostrarMensaje(`¡Felicidades! Has adoptado a ${animal.nombre}`);
            encontrado = true;
            incrementarContadorAdopciones();
            animalAdoptado(animales, especie === "gato" ? 'gatos' : 'perros', animal.nombre);
            break;
        }
    }
    if (!encontrado) {
        mostrarMensaje("No se encontró el animal buscado.");
    }
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje ${tipo}`;
    mensajeDiv.innerText = mensaje;
    const contadorDiv = document.getElementById('contador-adopciones');
    contadorDiv.parentNode.insertBefore(mensajeDiv, contadorDiv);
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

document.getElementById('registrar-mascota').addEventListener('click', () => {
    const especie = document.getElementById('nueva-especie').value;
    const nombre = document.getElementById('nueva-nombre').value;
    const edad = parseInt(document.getElementById('nueva-edad').value);
    const sexo = document.getElementById('nueva-sexo').value;
    const nuevaMascota = new NuevaMascota(especie, nombre, edad, sexo);

    if (especie === "gato") {
        gatos.push(nuevaMascota);
        localStorage.setItem('gatos', JSON.stringify(gatos));
        mostrarMensaje("Gato registrado exitosamente.", 'success');
    } else if (especie === "perro") {
        perros.push(nuevaMascota);
        localStorage.setItem('perros', JSON.stringify(perros));
        mostrarMensaje("Perro registrado exitosamente.", 'success');
    } else {
        mostrarMensaje("Especie no válida", 'error');
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

mostrarContadorAdopciones();
// varialbes

let gatos = [
    { especie: "gato", nombre: "Sussy", edad: "1 año", sexo: "hembra" },
    { especie: "gato", nombre: "Leo", edad: 6, sexo: "macho" }
];

let perros = [
    { especie: "perro", nombre: "Nala", edad: 2, sexo: "hembra" },
    { especie: "perro", nombre: "Max", edad: 5, sexo: "macho" }
];


// funciones

function mostrarAnimales(animales) {
    alert("Animales disponibles:");
    for (let animal of animales) {
        alert(`Nombre: ${animal.nombre}, Edad: ${animal.edad}, Sexo: ${animal.sexo}`);
    }
}

function adoptarAnimal(animales, especie) {
    let adoptar = prompt(`¿Cuál ${especie} desea adoptar?`);
    let encontrado = false;
    for (let animal of animales) {
        if (animal.nombre.toLowerCase() === adoptar.toLowerCase()) {
            alert(`¡Felicidades! Has adoptado a ${animal.nombre}`);
            encontrado = true;
            break;
        }
    }
    if (!encontrado) {
        alert("No se encontró el animal buscado.");
    }
}

let especie = prompt("¿Desea adoptar un gato o un perro?").toLocaleLowerCase();

if (especie === "gato") {
    mostrarAnimales(gatos);
    let deseaAdoptar = prompt("¿Desea adoptar alguno?").toLowerCase();
    if (deseaAdoptar === "si") {
        adoptarAnimal(gatos, "gato");
    } else {
        alert("Adopción cancelada");
    }
} else if (especie === "perro") {
    mostrarAnimales(perros);
    let deseaAdoptar = prompt("¿Desea adoptar alguno?").toLowerCase();
    if (deseaAdoptar === "si") {
        adoptarAnimal(perros, "perro");
    } else {
        alert("Adopción cancelada");
    }
} else {
    alert("Opción no válida");
}
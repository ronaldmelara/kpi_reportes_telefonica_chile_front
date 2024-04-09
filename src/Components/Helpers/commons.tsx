export function calcularPromedioTiempo(rows: any, campoTiempo: string) {
    // Filtrar los tiempos no nulos
    const tiempos = rows
        .filter(row => row[campoTiempo] !== null)
        .map(row => {
            // Dividir el tiempo en horas, minutos y segundos
            const [horas, minutos, segundos] = row[campoTiempo].split(':').map(Number);
            // Convertir a segundos
            return horas * 3600 + minutos * 60 + segundos;
        });

    // Calcular el promedio en segundos
    const promedioSegundos = tiempos.reduce((total, tiempo) => total + tiempo, 0) / tiempos.length;

    // Convertir el promedio de segundos a formato HH:MM:SS
    const horas = Math.floor(promedioSegundos / 3600);
    const minutos = Math.floor((promedioSegundos % 3600) / 60);
    const segundos = Math.floor(promedioSegundos % 60);

    // Formatear el resultado
    const formatoDosDigitos = (valor) => (valor < 10 ? '0' : '') + valor;
    const promedioFormateado = `${formatoDosDigitos(horas)}:${formatoDosDigitos(minutos)}:${formatoDosDigitos(segundos)}`;

    return promedioFormateado;
}

export function convertirTiempoAMinutos(tiempo: string) {
    // Separar las partes del tiempo
    const partesTiempo = tiempo.split(":");
    let horas = 0, minutos = 0, segundos = 0;

    // Asignar las partes a horas, minutos y segundos
    if (partesTiempo.length === 3) {
        horas = parseInt(partesTiempo[0], 10);
        minutos = parseInt(partesTiempo[1], 10);
        segundos = parseInt(partesTiempo[2], 10);
    } else if (partesTiempo.length === 2) {
        minutos = parseInt(partesTiempo[0], 10);
        segundos = parseInt(partesTiempo[1], 10);
    } else {
        throw new Error("Formato de tiempo no válido");
    }

    // Calcular el total de minutos
    const totalMinutos = horas * 60 + minutos + segundos / 60;

    return totalMinutos;
}

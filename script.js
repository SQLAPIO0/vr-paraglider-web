// Función de despegue
function triggerLaunch() {
    document.body.style.transition = "0.2s";
    document.body.style.filter = "brightness(1.5) contrast(1.2)";
    
    setTimeout(() => {
        document.body.style.filter = "none";
        alert("🚀 SISTEMA VR LISTO: ¡Prepárate para el salto en Caracas! Síguenos a traves de nuestras Redes Sociales");
    }, 200);
}

// Escuchador de eventos (Evita el error de CSP)
document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema VR Inicializado...");
    
    const botonReserva = document.getElementById('btn-vuelo');
    if (botonReserva) {
        botonReserva.addEventListener('click', triggerLaunch);
    }
});

// Efecto sutil de movimiento en el fondo (Parallax)
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-extreme');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
});

function openTrailer() {
    window.open("https://www.youtube.com/watch?v=eFbQqs2K88M", "_blank");
}

// Asegurar la reproducción del video local
document.addEventListener('DOMContentLoaded', () => {
    const vRPVideo = document.querySelector('.video-local');
    if (vRPVideo) {
        vRPVideo.play().catch(error => {
            console.log("El navegador bloqueó el autoplay inicial, esperando interacción.");
        });
    }
});

const canvas = document.getElementById('windCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 150; // Cantidad de ráfagas de viento

// Ajustar el canvas al tamaño de la ventana
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let boost = 1; // Multiplicador de velocidad base

// Definición de la partícula (Viento)
class WindParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 20 + 10; // Largo de la ráfaga
        this.speed = Math.random() * 3 + 2;    // Velocidad de vuelo
        this.opacity = Math.random() * 0.5;    // Sutileza
    }

    update() {
        this.x += this.speed; // Se mueve hacia la derecha
        // Si sale de la pantalla, vuelve a empezar desde la izquierda
        if (this.x > canvas.width) {
            this.x = -this.length;
            this.y = Math.random() * canvas.height;
            this.x += this.speed * boost;
        }
    }

    draw() {
        ctx.strokeStyle = `rgba(0, 242, 255, ${this.opacity})`; // Color neón cian
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y); // Dibuja una línea horizontal
        ctx.stroke();
    }
}

// Inicializar partículas
for (let i = 0; i < particleCount; i++) {
    particles.push(new WindParticle());
}

// Bucle de animación
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // LOGICA DE INERCIA: 
    // Si el boost es mayor a 1, lo reducimos gradualmente en cada frame
    if (boost > 1) {
        boost -= 0.05; // Este valor controla qué tan rápido "frena" el viento
    } else {
        boost = 1; // Aseguramos que no baje de la velocidad base
    }

    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

// Detectar el scroll para dar el impulso inicial
window.addEventListener('wheel', (event) => {
    // Al mover la rueda, subimos el multiplicador hasta un máximo (ej: 6)
    boost += 0.5; 
    if (boost > 6) boost = 6; 
});

// Aseguramos que el código se ejecute cuando el navegador esté listo
window.addEventListener('load', () => {
    // 1. Desactivamos la restauración automática del navegador
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // 2. Forzamos el scroll al inicio (X: 0, Y: 0)
    window.scrollTo(0, 0);
});

// 3. Refuerzo extra: por si el usuario recarga con F5
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Seleccionamos el logo por su clase (asegúrate de que coincida con tu HTML)
const logo = document.querySelector('.logo');

logo.addEventListener('click', (e) => {
    // Si usas href="#", esto evita el salto brusco antes del scroll suave
    // e.preventDefault(); 
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Resetear el boost por si acaso venía de un scroll rápido
    boost = 1;
});
// Funcionalidad adicional para la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
    
    const container = document.querySelector('.container');
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('.subtitle');
    
    // Efecto de aparición suave
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Efecto de aparición suave para el título
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        title.style.transition = 'all 0.8s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 500);
    
    // Efecto de partículas de fondo (ahora estrellas adicionales)
    createSpaceParticles();
    

    

    
    // Hacer que el astronauta sea interactivo
    makeAstronautInteractive();
    
    // Funcionalidad del dropdown de contacto
    makeContactDropdown();
    

    
    // Efecto de click en el contenedor
    container.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Funcionalidad de los botones de descarga
    const iosBtn = document.querySelector('.ios-btn');
    const androidBtn = document.querySelector('.android-btn');
    
    iosBtn.addEventListener('click', function() {
        // Efecto de pulsación
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Mensaje de confirmación
        setTimeout(() => {
            alert('¡Descargando ALPHABETS en App Store! 🍎');
        }, 200);
    });
    
    androidBtn.addEventListener('click', function() {
        // Efecto de pulsación
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Mensaje de confirmación
        setTimeout(() => {
            alert('¡Descargando ALPHABETS en Google Play! 🤖');
        }, 200);
    });
});



// Función para crear partículas espaciales adicionales
function createSpaceParticles() {
    const body = document.body;
    
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'space-star';
        star.style.cssText = `
            position: fixed;
            width: ${1 + Math.random() * 3}px;
            height: ${1 + Math.random() * 3}px;
            background: ${Math.random() > 0.5 ? '#fff' : '#87CEEB'};
            border-radius: 50%;
            pointer-events: none;
            animation: spaceTwinkle ${2 + Math.random() * 6}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: -1;
        `;
        body.appendChild(star);
    }
}





// Función para hacer el astronauta interactivo
function makeAstronautInteractive() {
    const astronaut = document.querySelector('.astronaut');
    let currentX = 50; // Posición inicial (centro de la pantalla)
    let currentY = 40; // Posición inicial (40% desde arriba)
    let targetX = currentX;
    let targetY = currentY;
    let isMoving = false;
    let mouseNearby = false;
    
    // Función para mover el astronauta
    function moveAstronaut() {
        if (Math.abs(currentX - targetX) > 0.5 || Math.abs(currentY - targetY) > 0.5) {
            currentX += (targetX - currentX) * 0.02; // Velocidad suave
            currentY += (targetY - currentY) * 0.02;
            
            astronaut.style.left = currentX + '%';
            astronaut.style.top = currentY + '%';
            isMoving = true;
        } else {
            isMoving = false;
        }
        requestAnimationFrame(moveAstronaut);
    }
    
    // Iniciar movimiento
    moveAstronaut();
    
    // Detectar posición del ratón
    document.addEventListener('mousemove', function(e) {
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        // Calcular distancia entre ratón y astronauta
        const distance = Math.sqrt(
            Math.pow(mouseX - currentX, 2) + 
            Math.pow(mouseY - currentY, 2)
        );
        
        // Si el ratón está cerca (menos de 25% de la pantalla), hacer que esquive
        if (distance < 25) {
            mouseNearby = true;
            // Calcular dirección de escape (opuesta al ratón)
            const escapeX = currentX + (currentX - mouseX) * 0.4;
            const escapeY = currentY + (currentY - mouseY) * 0.4;
            
            // Mantener dentro de los límites de la pantalla
            targetX = Math.max(5, Math.min(90, escapeX));
            targetY = Math.max(5, Math.min(80, escapeY));
        } else {
            mouseNearby = false;
        }
    });
    
    // Movimiento automático suave
    setInterval(() => {
        if (!mouseNearby) {
            // Generar nueva posición aleatoria
            targetX = 10 + Math.random() * 80; // Entre 10% y 90% desde la izquierda
            targetY = 10 + Math.random() * 70; // Entre 10% y 80% desde arriba
        }
    }, 6000); // Cambiar posición cada 6 segundos (más suave)
    
    // Movimiento adicional suave para que no se quede parado
    setInterval(() => {
        if (!mouseNearby && !isMoving) {
            // Pequeño movimiento aleatorio suave
            targetX = Math.max(10, Math.min(85, currentX + (Math.random() - 0.5) * 15));
            targetY = Math.max(10, Math.min(75, currentY + (Math.random() - 0.5) * 15));
        }
    }, 4000); // Cada 4 segundos
}

// Función para el dropdown de contacto
function makeContactDropdown() {
    const contactBtn = document.querySelector('.contact-btn');
    const contactDropdown = document.querySelector('.contact-dropdown');
    let isOpen = false;
    
    // Toggle del dropdown al hacer click
    contactBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        isOpen = !isOpen;
        
        if (isOpen) {
            contactDropdown.classList.add('active');
        } else {
            contactDropdown.classList.remove('active');
        }
    });
    
    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!contactBtn.contains(e.target) && !contactDropdown.contains(e.target)) {
            isOpen = false;
            contactDropdown.classList.remove('active');
        }
    });
    
    // Cerrar dropdown con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) {
            isOpen = false;
            contactDropdown.classList.remove('active');
        }
    });
}
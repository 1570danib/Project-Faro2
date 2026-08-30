/* ── Copy Code Functionality ─────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {
  // Buscar todos los bloques de código <pre>
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(block) {
    // Crear un contenedor wrapper alrededor del <pre>
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.marginBottom = '20px';
    
    // Insertar el wrapper antes del <pre>
    block.parentNode.insertBefore(wrapper, block);
    // Mover el <pre> dentro del wrapper
    wrapper.appendChild(block);
    
    // Crear el botón copy
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.setAttribute('aria-label', 'Copy code');
    copyBtn.innerHTML = '<i class="ri-file-copy-line"></i>';
    
    // Insertar el botón al inicio del wrapper (fuera del <pre>)
    wrapper.insertBefore(copyBtn, block);
    
    // Evento al hacer clic
    copyBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Obtener el texto del código
      const codeText = block.querySelector('code') 
        ? block.querySelector('code').innerText 
        : block.innerText.trim();
      
      // Copiar al clipboard
      navigator.clipboard.writeText(codeText).then(function() {
        // Cambiar el ícono y color para feedback
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '<i class="ri-check-line"></i>';
        
        // Cambiar texto alternativo
        copyBtn.setAttribute('aria-label', 'Copied!');
        
        // Volver al estado original después de 2 segundos
        setTimeout(function() {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = '<i class="ri-file-copy-line"></i>';
          copyBtn.setAttribute('aria-label', 'Copy code');
        }, 2000);
      }).catch(function(err) {
        console.error('Error al copiar:', err);
      });
    });
  });
});

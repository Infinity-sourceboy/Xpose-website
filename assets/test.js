const angle = 20;

const lerp = (start, end, amount) => {
  return (1 - amount) * start + amount * end;
};

const remap = (value, oldMax, newMax) => {
  const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
  return Math.min(Math.max(newValue, -newMax), newMax);
};

window.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    // Initialize dataset values
    card.dataset.rotateX = 0;
    card.dataset.rotateY = 0;

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      
      // Calculate mouse offset from card center using client coordinates
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const posX = event.clientX - centerX;
      const posY = event.clientY - centerY;

      // Mouse X shifts tilt on Y-axis; Mouse Y shifts tilt on X-axis (inverted)
      const rotY = remap(posX, rect.width / 2, angle);
      const rotX = remap(-posY, rect.height / 2, angle);

      card.dataset.rotateX = rotX;
      card.dataset.rotateY = rotY;
    });

    card.addEventListener("mouseleave", () => {
      card.dataset.rotateX = 0;
      card.dataset.rotateY = 0;
    });
  });

  // Smooth animation loop using requestAnimationFrame
  const update = () => {
    cards.forEach((card) => {
      let currentX = parseFloat(card.style.getPropertyValue("--rotateX")) || 0;
      let currentY = parseFloat(card.style.getPropertyValue("--rotateY")) || 0;

      const targetX = parseFloat(card.dataset.rotateX) || 0;
      const targetY = parseFloat(card.dataset.rotateY) || 0;

      const nextX = lerp(currentX, targetX, 0.1);
      const nextY = lerp(currentY, targetY, 0.1);

      card.style.setProperty("--rotateX", `${nextX.toFixed(2)}deg`);
      card.style.setProperty("--rotateY", `${nextY.toFixed(2)}deg`);
    });

    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
});
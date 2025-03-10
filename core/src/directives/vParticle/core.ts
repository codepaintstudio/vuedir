import type { Directive, DirectiveBinding } from 'vue'
import { ParticleOptions } from './type';

const defaultOptions: ParticleOptions = {
    color: '#ff0000',
    count: 30,
}

const getRandomColor = (colors: string | string[]) => {
    if (Array.isArray(colors)) {
        return colors[Math.floor(Math.random() * colors.length)];
    } else {
        return colors;
    }
}

const createParticle = (x: number, y: number, color: string | string[], el: HTMLElement) => {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.backgroundColor = getRandomColor(color);
    particle.style.borderRadius = '50%';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.pointerEvents = 'none';
    particle.style.transform = 'translate(-50%, -50%)';
    particle.style.transition = 'all 0.5s ease-out';

    el.appendChild(particle);

    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 50;

    setTimeout(() => {
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        particle.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        particle.remove();
    }, 1000);
};

export const vParticle: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const options = { ...defaultOptions, ...binding.value };

        el.addEventListener('click', (event) => {
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            for (let i = 0; i < options.count; i++) {
                createParticle(x, y, options.color, el);
            }
        })
    }
}
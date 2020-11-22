import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import type { IDelta } from "../Core/Interfaces/IDelta";
import { NumberUtils } from "../Utils";

export class ColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
        const animationOptions = particle.options.color.animation;

        return (
            !particle.destroyed && !particle.spawning && particle.color.value !== undefined && animationOptions.enable
        );
    }

    public update(particle: Particle, delta: IDelta): void {
        const animationOptions = particle.options.color.animation;

        if (!this.isEnabled(particle)) {
            return;
        }

        const offset = NumberUtils.randomInRange(animationOptions.offset.min, animationOptions.offset.max);
        const colorValue = particle.color.value;

        if (!colorValue) {
            return;
        }

        colorValue.h += (particle.color.velocity ?? 0) * delta.factor + offset * 3.6;

        if (colorValue.h > 360) {
            colorValue.h -= 360;
        }
    }
}

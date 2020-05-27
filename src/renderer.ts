import { Area } from './geometry'

export interface Renderer {
    size(): Area,
    render(): void,
    add(sprite: any): void,
    update(sprite: any, x: number, y: number, angle: number): void
    remove(sprite: any): void,
    setBackgroundColour(colour: number): void,
}
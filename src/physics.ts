import { Vector } from './geometry'

export interface Physics {
    update(delta: number): void
    
    add(body: Body): void
    
    remove(body: Body): void
}

export interface Body {
    pos(): Vector

    angle(): number
}
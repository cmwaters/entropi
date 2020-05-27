export interface Renderer {
    size: Area,
    render(): void,
    add(sprite: Sprite): void,
    remove(sprite: Sprite): void,
    setBackgroundColour(colour: number): void,
}

export interface Sprite {
    x: number,
    y: number
    rotation: number
}

export interface Area {
    width: number,
    height: number
}
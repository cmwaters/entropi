import { Kinetic } from "./kinetic"
import { Body } from "./physics"
import { Controller } from './controller'

export class Entity {
    name: string;
    sprite: any = null;
    body: Body = null;
    controllers: Controller[] = [];
    kinetic: Kinetic;
    deleteFlag: boolean = false

    constructor(options: EntityOptions) {
        this.name = options.name
        this.body = options.usingBody;
        if (options.fromSprite !== undefined)
            this.sprite = options.fromSprite

        if (options.withControllers !== undefined)
            this.controllers.push(...options.withControllers)

        if (options.withDynamicSystem !== undefined)
            this.kinetic = options.withDynamicSystem
    };

    addController(controller: Controller): void {
        this.controllers.push(controller)
    }
    equal(entity: Entity): boolean {
        return this.name === entity.name
    }
    destroy() {
        this.deleteFlag = true
    }

}

export type EntityOptions = {
    name: string,
    usingBody?: Body,
    fromSprite?: any,
    withControllers?: Controller[],
    withDynamicSystem?: Kinetic,
}
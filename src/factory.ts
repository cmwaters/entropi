import { Entity } from './entity'
import { Orientation, } from './geometry';

const RANDOM_RETRIES = 50;

export namespace Factory {

    // export function generate(model: Entity, randomizer: Randomizer, distributor: DefinedDistributor): Entity[] {
    //     let entities: Entity[] = [];
    //     for (let i = 0; i < distributor.units.length; i++) {
    //         let replica = model.clone()
    //         // Body.setPosition(replica.body, distributor.units[i].pos)
    //         // also need to set orientation
    //         randomizer.variants.forEach(variant => {
    //             variant.generate(replica)
    //         })
    //         entities.push(replica)
    //     }
    //     return entities
    // }

    // export function generateRandom(model: Entity, bodies: Body[], randomizer: Randomizer, distributor: RandomDistributor): Entity[] {
    //     let entities: Entity[] = [];
    //     for (let i = 0; i < distributor.volume; i++) {
    //         let replica = model.clone()
    //         let collisions: any[] = []
    //         let first = true;
    //         while (first || collisions.length > 0) {
    //             Body.setPosition(replica.body, Vector.create(
    //                 Math.random() * (distributor.bound.max.x - distributor.bound.min.x) + distributor.bound.min.x,
    //                 Math.random() * (distributor.bound.max.y - distributor.bound.min.y) + distributor.bound.min.y))
    //             // TODO: Create a more efficient way of checking collision i.e. modify Matter-js
    //             collisions = Collision.collides(replica.body, bodies)
    //             first = false
    //             console.log("Collision " + collisions)
    //         }
    //         bodies.push(replica.body)
    //         randomizer.variants.forEach(variant => {
    //             variant.generate(replica)
    //         })
    //         entities.push(replica)
    //     }
    //     return entities
    // }

    // export class RandomDistributor {
    //     constructor(public bound: Bounds, public volume: number) {
    //         this.bound = bound;
    //         this.volume = volume;
    //     }
    // }

    export class DefinedDistributor {
        constructor(public units: Orientation[]) {
            this.units = units;
        }
    }

    export type Randomizer = {
        variants: Variation[]
    }

    interface Variation {
        generate: (entity: Entity) => void
    }

}
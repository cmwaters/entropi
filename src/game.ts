import {Entity, EntityOptions} from './entity'
import {Input} from './input'
import { Controllers } from './controller'
import { Kinetic } from './kinetic'
import Camera from './camera'
import {Vector, Bound} from './geometry'
import {Body, Composite} from './physics'
import * as Matter from 'matter-js'
import * as PIXI from 'pixi.js'
import { Factory } from './factory'
import { Sprite, Renderer, Area } from './types'
import { Event, Events } from './event'

export { Camera, Vector, Entity, Kinetic, Body, Controllers, Bound, Factory, Events, Sprite, Renderer, Area}

const DEFAULT_FRAME_RATE = 20;

export class Game {

    constructor(setup : Setup) {
        // set variables
        this.create = setup.create;
        this.update = setup.update;
        this.camera = new Camera();
        this.input = new Input()
        this.time = {
            running: false,
            tick: 0,
            frameRate: DEFAULT_FRAME_RATE,
            milliseconds: () => { return this.time.tick * this.time.frameRate },
            seconds: () => { return Math.ceil(this.time.milliseconds() / 1000) }
        };
        this.renderer = setup.renderer
        this.screen = setup.renderer.size;
        this.center = Vector.create(this.screen.width/2, this.screen.height/2);
        this.engine = Matter.Engine.create()
        Matter.Events.on(this.engine, 'afterUpdate', () => {
            this.entities.forEach(entity => {
                if (entity.interactionBody !== null) {
                    Body.setPosition(entity.interactionBody, entity.body.position)
                }
            })
        })
        this.engine.world.gravity.y = 0;
        this.interval = setInterval(() => {
            if (this.time.running) {
                this.run()
            }
        }, this.time.frameRate);
        // run options
        if (setup.options != null) {
            setup.options.forEach(option => {
                option(this)
            })
        }
        this.create(this)
        if (this.autoStart) {
            this.start();
        }
    }

    screen: Area;
    create: (game: Game) => void;
    update: (game: Game) => void;
    backgroundColor: number
    autoStart: boolean = true;
    renderer: Renderer;
    camera: Camera;
    center: Vector;
    time: TimeKeeper;
    interval: NodeJS.Timer;
    engine: Matter.Engine
    entities : Entity[] = []; // creates an ordered list of entities
    add = {
        // spritesheet: (source: string) => {
        //     this.renderer.loader.add('spritesheet', source)
        // },
        entity: (entity: Entity): void => {
            this.registerEntity(entity)
        },
        newEntity: (options: EntityOptions) : Entity => {
            let entity = new Entity(options);
            this.registerEntity(entity)
            return entity
        },
        entities: (entities: Entity[]): void => {
            entities.forEach(entity => {
                this.registerEntity(entity)
            })
        },
        event: (event: Event): void => {
            this.events.push(event)
        },
        sprite: (sprite: PIXI.Sprite | PIXI.Graphics): void => {
            this.renderer.add(sprite)
        }
    }
    input: Input;
    events: Event[] = [];

    start() {
        this.time.running = true;
    }

    run() {
        // execute events
        this.eventLoop()
        // read inputs and freeze state
        this.input.stopListening()
        // actuate controllers
        this.actuateControllers()
        // execute game logic
        this.update(this)
        // Unfreeze inputs and listen again
        this.input.startListening()
        // update world via physics engine
        Matter.Engine.update(this.engine, this.time.frameRate)
        // camera
        this.camera.update()
        // update the position of all entities
        this.prepareRender()
        // reset
        this.time.tick++
    }

    stop() {
        this.time.running = false;
    }

    actuateControllers() :void {
        this.entities.forEach(entity => {
            entity.controllers.forEach(controller => {
                controller.execute(entity)
            })
        })
    }

    get(entityName: string) : Entity {
        this.entities.forEach(entity => {
            if (entity.name === entityName) {
                return entity
            }
        })
        return null
    }

    prepareRender() {
        this.camera.update()
        this.entities.forEach(entity => {
            if (entity.deleteFlag) {
                if (entity.sprite !== null) {
                    this.renderer.remove(entity.sprite)
                }
                if (entity.body !== null) {
                    Matter.World.remove(this.engine.world, entity.body)
                }
            } else {
                entity.sprite.x = this.camera.pos.x + entity.body.position.x;
                entity.sprite.y = this.camera.pos.y - entity.body.position.y;
            }
        })
    }

    eventLoop() {
        this.events.forEach(event => {
            if (event.conditional(this.time)) {
                event.execution()
            }
        })
    }

    bodies(): Body[] {
        return Composite.allBodies(this.engine.world)
    }

    private registerEntity(entity: Entity): void {
        if (entity.sprite !== undefined)
            this.renderer.add(entity.sprite)
        entity.body.id = this.entities.length;
        if (entity.interactionBody !== null)
            entity.interactionBody.id = this.entities.length
        entity.body.label = entity.name
        Matter.World.addBody(this.engine.world, entity.body)
        this.entities.push(entity)
    }

    static withFrameRate(frameRate: number) : Option {
        return (game : Game) => {
            game.time.frameRate = frameRate
        }
    }

    static withBackGroundColor(color: number) : Option {
        return (game : Game) => {
            game.renderer.setBackgroundColour(color)
        }
    }

}

export type TimeKeeper  = {
    running : boolean,
    tick : number,
    frameRate: number,
    milliseconds: () => number,
    seconds: () => number,
}

type Option = (game: Game) => void

export type Setup = {
    renderer: Renderer,
    create: (game: Game) => any,
    update: (game: Game) => any,
    options?: Option[],
}


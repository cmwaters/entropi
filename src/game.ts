import { Entity, EntityOptions } from './entity'
import { Input } from './input'
import { Camera } from './camera'
import { Area } from './geometry'
import { Physics } from './physics'
import { Renderer } from './renderer'
import { Event } from './event'

const DEFAULT_FRAME_RATE = 20;

export type Setup = {
    renderer: Renderer,
    physics: Physics,
    create: (game: Game) => any,
    update: (game: Game) => any,
    options?: Option[],
}

export class Game {

    constructor(setup : Setup) {
        // set variables
        this.create = setup.create;
        this.update = setup.update;
        this.camera = new Camera();
        this.input = new Input()
        this.renderer = setup.renderer;
        this.physics = setup.physics; 
        this.screen = setup.renderer.size();
        // start interval
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
    
    // this is the game loop
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
        this.physics.update(this.time.frameRate)
        // update camera
        this.camera.update()
        // update the position of all entities
        this.prepareRender()
        // render all entities
        this.renderer.render()
        // reset
        this.time.tick++
    }

    screen: Area;
    create: (game: Game) => void;
    update: (game: Game) => void;
    backgroundColor: number
    autoStart: boolean = true;
    renderer: Renderer;
    camera: Camera;
    interval: NodeJS.Timer;
    physics: Physics
    entities : Entity[] = []; // creates an ordered list of entities
    add = {
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
        sprite: (sprite: any): void => {
            this.renderer.add(sprite)
        }
    }
    
    time: TimeKeeper = {
        running: false,
        tick: 0,
        frameRate: DEFAULT_FRAME_RATE,
        milliseconds: () => { return this.time.tick * this.time.frameRate },
        seconds: () => { return Math.ceil(this.time.milliseconds() / 1000) }
    };
    input: Input;
    events: Event[] = [];

    start() {
        this.time.running = true;
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
                    this.physics.remove(entity.body)
                    // World.remove(this.engine.world, entity.body)
                }
            } else {
                let pos = entity.body.pos()
                this.renderer.update(
                    entity.sprite,
                    this.camera.pos.x + pos.x, 
                    this.camera.pos.y - pos.y,
                    entity.body.angle())
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

    private registerEntity(entity: Entity): void {
        if (entity.sprite !== undefined)
            this.renderer.add(entity.sprite)
        this.physics.add(entity.body)
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


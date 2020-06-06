import { Game } from './game'
import {Entity, EntityOptions} from './entity'
import {Input} from './input'
import { Controllers, Controller } from './controller'
import { Kinetic } from './kinetic'
import Camera from './camera'
import {Vector, Bound, Area} from './geometry'
import {Body, Composite} from './physics'
import { Factory } from './factory'
import { Renderer } from './renderer'
import { Bodies } from 'matter-js'
import { Event, Events } from './event'

export { Game, Input, Camera, Composite, Vector, Entity, Kinetic, Body, Controllers, 
    Bound, Factory, Events, Renderer, Area, Event, EntityOptions, Bodies, Controller}
import * as Matter from 'matter-js'

export class Body extends Matter.Body{

    static circle(x: number, y: number, radius: number, options?: Matter.IBodyDefinition, maxSides?: number) : Body {
        return Matter.Bodies.circle(x, y, radius, options, maxSides)
    }

    static extendVertices(body: Body, offset: number): Body {
        return body
    }

    static cloneShape(body: Body) {
        return Body.create({vertices: body.vertices})
    }

}

export class Composite extends Matter.Composite {}

export class Collision extends Matter.Query {}
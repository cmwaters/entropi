export type Event = {
    name: string,
    conditional: (input: any) => boolean,
    execution: () => void,
}

export namespace Events {

    export namespace Timed {

        export function at(millisecond: number, execute: () => void): Event {
            return {
                name: "timed",
                conditional: (input) => {
                    return input.tick === Math.floor(millisecond / input.frameRate)
                },
                execution: execute,
            }
        }


    }

}
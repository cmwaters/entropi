export class Input {
    listening: boolean = true
    Key: any


    constructor() {
        this.Key = {
            UP: createDefaultKey("ArrowUp"),
            DOWN: createDefaultKey("ArrowDown"),
            LEFT: createDefaultKey("ArrowLeft"),
            RIGHT: createDefaultKey("ArrowRight"),
            W: createDefaultKey("KeyW"),
            A: createDefaultKey("KeyA"),
            S: createDefaultKey("KeyS"),
            D: createDefaultKey("KeyD"),
            ENTER: createDefaultKey("Enter"),
            SPACE: createDefaultKey("Space"),
        };
        let that = this;
        document.addEventListener('keydown', function(e: KeyboardEvent) {
            if (that.listening) {
                for (let key in that.Key) {
                    let keySet = that.Key[key];
                    if (keySet.code === e.code) {
                        keySet.state = true;
                    }
                }
            }
        })
        document.addEventListener('keyup', function(e: KeyboardEvent) {
            if (that.listening) {
                for (let key in that.Key) {
                    let keySet = that.Key[key];
                    if (keySet.code === e.code) {
                        keySet.state = false;
                    }
                }
            }
        })
    }

    startListening(): void {
        this.listening = true
        // reset all tap styled keys
        for (let key in this.Key) {
            let keySet = this.Key[key];
            if (keySet.state && keySet.style === Press.Tap) {
                console.log("tap")
                keySet.state = false;
            }
        }
    }

    stopListening(): void {
        this.listening = false
    }

}

export type Key = {
    code: string,
    state: boolean,
    style: Press,
}

function createDefaultKey(code: string): Key {
    return {code: code, state: false, style: Press.Hold}
}

enum Press {
    Hold,
    Tap,
}



const snake = () => {
    let playButton = document.getElementById("play")
    let resetButton = document.getElementById("reset")
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    playButton.addEventListener('click', () => {
        playButton.style.visibility = "hidden"
        canvas.style.display = "block"
        resetButton.style.display = "block"
    })
    resetButton.addEventListener('click', () => {
        document.location.reload()
    })
    const drawRect = (x, y, color) => {
        const size = 40
        const padding = 4
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.rect((size + padding) * x, (size + padding) * y, size, size)
        ctx.fill()
    }

    const tableSize = 10

    class User {
        x = 0
        y = 0
        color = "#ff0"
        dire = 2
        tailList = []
        
        update() {
            let prev = { x: this.x, y: this.y}
            for(let i in this.tailList) {
                let temp = this.tailList[i]
                this.tailList[i] = prev
                // console.log(prev)
                prev = temp
            }
            switch (this.dire) {
                case 0:
                    this.x -= 1;
                    break;
                case 1:
                    this.y -= 1;
                    break;
                case 2:
                    this.x += 1;
                    break;
                case 3:
                    this.y += 1;
                    break;
            }

            this.x = this.loop(this.x)
            this.y = this.loop(this.y)
        }

        addTail() {
            this.tailList.push({
                x: this.x,
                y: this.y
            })
        }

        loop(value) {
            if(value < 0){
                value = tableSize - 1
            }
            else if (value > tableSize - 1) {
                value = 0;
            }
            return value
        }
    }

    class Item {
        x = 0
        y = 0
        color = "#f0f"

        randomPosition() {
            this.x = parseInt(Math.random() * tableSize)
            this.y = parseInt(Math.random() * tableSize)
        }
    }

    let user = new User()
    let item = new Item()
    item.randomPosition()

    setInterval(() => {
        for(let x=0; x < tableSize; x++) {
            for(let y=0; y < tableSize; y++) {
                drawRect(x, y, "#000")
            }
        }
        user.update()

        if(user.x == item.x && user.y == item.y) {
            user.addTail()
            item.randomPosition()
        }
        for(var i in user.tailList) {
            let p = user.tailList[i]
            if(i < 0) {
                drawRect(p.x, p.y, "#0f9")
            } else {
                drawRect(p.x, p.y, "#0f0")
            }
        }
        
        drawRect(user.x, user.y, user.color)
        drawRect(item.x, item.y, item.color)
    }, 200)

    window.onkeydown = (e) => {
        if(e.keyCode >= 37 && e.keyCode <= 40) {
            user.dire = e.keyCode - 37
        }
    }
}

export default snake
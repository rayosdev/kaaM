<template>
    <div class="grid-container">
        <div class="grid-block"
            v-for="(block, i) in gridMap"
            :key="i"
            v-bind:class="snakePieceInBox(i)"
        >
            {{ snakePieceInBox(i).includes('head')? headNumber : i}}
            <apple 
                v-if="applesOnGrid.includes(i)"
                question="2 x 5"
            />
        </div>
    </div>
</template>

<script>
import Apple from './Apple'

export default {
    components: {
        'apple': Apple,
    },
    data() {
        return {
            gridMap: [
                ... new Array(255).fill(0)
            ],
            snake: [1, 2, 3, 4, 5],
            snakeStartState: [1, 2, 3, 4, 5],
            gameInterval: null,
            gameSpeed: 120,
            HeadDirection: {
                next:'',
                now:'Right'
            },
            gameOver: false,
            headNumber: 10,
            gamePaused: false,
            applesOnGrid: [20, 122],
            applesData: [],
            equationRange: {min: 0, max: 5}
        }
    },
    methods: {
        snakePieceInBox(boxIndex){ // Snake visibility, grid styling
            for (const piece of this.snake) {
                if(piece == boxIndex) {
                    if(boxIndex == this.snake[this.snake.length -1]) return 'snake head'
                    return 'snake'
                }
            }
            return ''
        },

        gameLoop(){
            if(this.gameOver) return
            this.snakeMovement()
            this.hitIntractables()
            
            // f0rce update update DOM
            this.$forceUpdate()
        },
        snakeMovement(){
            const headDir = this.HeadDirection

            // Potentials update direction
            if(headDir.next == "Right" && headDir.now != "Left") headDir.now = headDir.next 
            if(headDir.next == "Left" && headDir.now != "Right") headDir.now = headDir.next 
            if(headDir.next == "Up" && headDir.now != "Down") headDir.now = headDir.next 
            if(headDir.next == "Down" && headDir.now != "Up") headDir.now = headDir.next 

            // Only needed for the heads new position
            let dir = 0
            if(headDir.now == "Right")   dir = 1
            if(headDir.now == "Left")    dir = -1
            if(headDir.now == "Up")      dir = -17
            if(headDir.now == "Down")    dir = 17

            // Move snake
            const snake = [...this.snake]

            this.snake = snake.map((pieces, i) => {
                const pieceInFront = snake[i + 1]
                
                // found the head at the end of the list 
                if(pieceInFront == undefined) {
                    const currentPosition = snake[i]
                    const nextMove = snake[i] + dir
                    
                    // check for collisions with self
                    if(snake.includes(nextMove)){
                        this.endGame() 
                        return currentPosition//return current position 
                    }

                    // check for wall on the right
                    if( nextMove != 0 && 
                        currentPosition % 17 == 16 && //right side boundary found
                        nextMove % 17 == 0) {
                        return nextMove - 17 //moved to the left side
                    }
                    
                    // check for wall on the left
                    if( currentPosition % 17 == 0 && // left side boundary found
                        nextMove % 17 == 16 || nextMove == -1) {
                        return nextMove + 17 // moved to the right side
                    }

                    // check for wall on the Top
                    if( currentPosition < 17 && // top side boundary found
                        nextMove <= -1) {
                        return 255 + nextMove // nextMove is a negative number
                    }

                    // check for wall on the Bottom
                    if( currentPosition >= 255 - 17 && // bottom side boundary found
                        nextMove >= 255) {
                        return (255 - nextMove) * -1 // nextMove is a negative number
                    }

                    return nextMove
                } 
                // all other pieces just follows
                return pieceInFront
            });
        },
        endGame(){
            console.log("BANG GAME ENDED")
            this.setGameLoop(false)
            this.gameOver = true
        },
        pauseGame(){
            if(this.gameOver) return
            console.log("Game paused", this.gamePaused)
            this.setGameLoop(false)
        },
        setGameLoop(activate){
            console.log("Change Game Looop")
            if(activate) {
                // init game interval
                this.gameInterval = setInterval(
                    this.gameLoop, // run gameLoop function 
                    this.gameSpeed // how fast to run that function
                )
            }else { // disable game loop
                clearInterval(this.gameInterval)
            }
        },
        newGame(){
            console.log("Starting new game")
            // cleanup from last game
            this.setGameLoop(false)
            
            // setup
            this.snake = this.snakeStartState
            this.HeadDirection = {
                next:'',
                now:'Right'
            }
            this.newApples()


            this.gameOver = false
            this.setGameLoop(true)

        },
        newApples(amount=2){

            // grid placement
            let newApplesOnGrid = []
            for (let i = 0; i < amount; i++) {
                // pick random placement
                let foundPlacement = false
                let place = 0
                while(foundPlacement == false) {
                    place = Math.floor(Math.random() * 235) + 18 // trying to avoid top row and sides 
                    if(place % 17 == 16 || place % 17 == 0) continue //testing for sides
                    if(this.snake.includes(place)) continue
                    // make sure apples are on or beside eachother
                    if(newApplesOnGrid.includes(place)) continue
                    if(newApplesOnGrid.includes(place + 1)) continue
                    if(newApplesOnGrid.includes(place - 1)) continue

                    foundPlacement = true
                }
                newApplesOnGrid.push(place)
            }
            // update ready for DOM update
            this.applesOnGrid = newApplesOnGrid


            // generate solution, equation and decoy equations
            
            // helper functions
            function getRandomInt() {
                const min = Math.ceil(this.equationRange.min);
                const max = Math.floor(this.equationRange.max);
                return Math.floor(Math.random() * (max - min) + min)
            }

            function getEquationAndAnswer() {
                let a = getRandomInt()
                let b = getRandomInt()
                return {answer: a * b, equationString: `${a} x ${b}`}
            }

            // select answer
            let applesData = []
            
            //find 

            

        },
        hitIntractables(){
            const snakeHead = this.snake[this.snake.length - 1]
            if(this.applesOnGrid.includes(snakeHead)){
                this.newApples()
            }
        }
    },
    created() {

        // Get Input
        window.addEventListener('keydown', e => {
            
            // Move directions
            if(e.key.includes("Arrow")) {
                if(this.gameOver || this.gamePaused) return 
                this.HeadDirection.next = e.key.replace(/Arrow/g,'')
            }

            // Pause gameLoop 
            //TODO disable after development or make into a game feature 
            if(e.key.toUpperCase() == 'P'){ 
                this.pauseGame = !this.pauseGame
                this.setGameLoop(this.pauseGame)
            }

            // if(e.key.toUpperCase() == 'R' && this.gameOver){
            if(e.key.toUpperCase() == 'R'){
                this.newGame()
            }

            if(e.key.toUpperCase() == 'D'){
                this.newApples()
            }

        }) // --> Get Input

        //Start Game Loop
        setTimeout( () => { // wait before start
            this.setGameLoop(true)
        }, 2000)
        
        
    },
}
</script>

<style lang="scss" scoped>
    .grid-container {
        display: flex;
        flex-wrap: wrap;
    }

    .grid-block {
        height: 40.9px;
        width: 40.9px;
        display: grid;
        justify-content: center;
        align-content: center;
        border: solid 0.2px $light-light-gray;
        font-weight: 700;
        font-size: 16px;
        color:#ffffff00;
    }

    .snake {
        background: $primary;
    }

    .snake.head {
        color: $text-white;
    }
</style>
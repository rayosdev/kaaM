<template>
    <div class="grid-wrapper">
        <h2 class="snake-head-title">{{headNumber}}</h2>
        <div class="grid-container">
            <overlay ref="overlay"  v-on:gamestartEvent="startGame"/>
            <div class="grid-block"
                v-for="(block, i) in gridMap"
                :key="i"
                v-bind:class="snakePieceInBox(i)"
            >
                {{ snakePieceInBox(i).includes('head')? headNumber : ''}}
                <apple 
                    v-if="applesOnGrid.includes(i)"
                    :question="loadEquation(applesOnGrid.includes(i), i)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Apple from './Apple'
import Overlay from './Overlay'
import {mapMutations} from 'vuex'
export default {
    components: {
        'apple': Apple,
        'overlay': Overlay,
    },
    data() {
        return {
            gridMap: [
                ... new Array(255).fill(0)
            ],
            snake: [92, 93],
            snakeStartState: [92, 93],
            gameInterval: null,
            scorePerSecondInterval: null,
            levelUpInterval: null,
            level: 1,
            levelUpTimer: 0,
            gameSpeed: 180,
            HeadDirection: {
                next:'',
                now:'Right'
            },
            gameOver: false,
            headNumber: 10,
            gamePaused: false, // oly for debug purposes
            applesOnGrid: [],
            applesData: [],
            equationRange: {min: 2, max: 6},
            hit: false,
            score: 0,
            levelUpSpeed: 50,
            appleAmount: 2,
            Debug: false,
            speedUpUnitPerLevel: 60
        }
    },
    computed: {
        playerName(){
            return this.$store.getters.getPlayerName
        }
    },
    methods: {
        ...mapMutations(['setNewHeighscoreUpdate']),
        startGame(difficulty){

            if(difficulty == 'start') {
                this.equationRange = {min: 0, max: 3}
                this.speedUpUnitPerLevel = 10
            }
            else if(difficulty == 'middle') {
                this.equationRange = {min: 2, max: 5}
                this.speedUpUnitPerLevel = 40
            }
            else if(difficulty == 'advanced') {
                this.equationRange = {min: 2, max: 10}
            }
            else if(difficulty == 'imposable') {
                this.equationRange = {min: 4, max: 100}
                this.speedUpUnitPerLevel = 75
            }

            this.newGame()
        },

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
            this.$refs.overlay.setState('gameover')
            // save highscore
            let heighscore = JSON.parse(localStorage.heighscore)
            heighscore.push(
                {
                    name: this.playerName,
                    score: this.score
                }
            )
            heighscore = heighscore.sort((a, b) => b.score - a.score)
            localStorage.heighscore = JSON.stringify(heighscore)
            this.setNewHeighscoreUpdate(true)
        },
        pauseGame(){
            if(this.gameOver) return
            console.log("Game paused", this.gamePaused)
            this.setGameLoop(false)
        },
        setGameLoop(activate){
            console.log("Game Looop is: ", activate)
            if(activate) {
                // init game interval
                this.gameInterval = setInterval(
                    this.gameLoop, // run gameLoop function 
                    this.gameSpeed // how fast to run that function
                )
                this.scorePerSecondInterval = setInterval(() => this.score += 1, 100)
                this.createLevelUpTimer()
            }else { // disable game loop
                clearInterval(this.gameInterval)
                clearInterval(this.scorePerSecondInterval)
                clearInterval(this.levelUpInterval)
            }
        },
        createLevelUpTimer(){
            this.levelUpInterval = setInterval(() => { // set interval
                this.levelUpTimer += 1 // set one tick
                if(this.levelUpTimer >= 100){
                    this.levelUpTimer = 0
                    this.level += 1
                    this.levelUp()
                    clearInterval(this.levelUpInterval) // clear interval
                    this.levelUpSpeed = 50 + (10 * this.level) // set growth speed curve
                    this.createLevelUpTimer() // start timer
                }
            } ,this.levelUpSpeed)
        },
        newGame(){
            console.log("Starting new game")
            // cleanup from last game
            this.setGameLoop(false)
            
            // setup
            this.score = 0
            this.levelUpTimer = 0
            this.level = 1
            this.gameSpeed = 160
            this.appleAmount = 2
            this.snake = this.snakeStartState
            this.HeadDirection = {
                next:'',
                now:'Right'
            }
            this.newApples()

            this.gameOver = false
            this.setGameLoop(true)
            this.$refs.overlay.setState('newgame')

        },
        newApples(){
            const amount = this.appleAmount
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
            this.applesOnGrid = newApplesOnGrid // update set for DOM-update

            // generate answerSets with solution and equation, one real one, decoys for the rest 
            // helper functions for answerSet generation
            function getRandomInt(range) {
                const min = Math.ceil(range.min);
                const max = Math.floor(range.max + 1);
                return Math.floor(Math.random() * (max - min) + min)
            }

            function getAnswerSet(range) {
                let a = getRandomInt(range)
                let b = getRandomInt(range)
                return {answer: a * b, equation: `${a} x ${b}`}
            }

            // setup real answerSet and decoySets 
            let applesData = [] 
            for(let i = 0; i <= amount; i++) {
                let newAnswerSet
                
                if(applesData.length == 0) { 
                    applesData.push(getAnswerSet(this.equationRange)) // first index need for test under
                    continue // run next loop iteration
                }

                let isDuplicate = true
                while(isDuplicate == true){ // if duplicate found, do again
                    newAnswerSet = getAnswerSet(this.equationRange)
                    isDuplicate = false
                    for (const j in applesData) { // run through all existing answerSets
                        if(applesData[j].answer == newAnswerSet.answer ||
                            applesData[j].equation == newAnswerSet.equation){
                                isDuplicate = true
                                break // run again
                            }
                    }
                }
                applesData.push(newAnswerSet) // populate all answerSets except first one
            }
            this.applesData = applesData
            this.headNumber = this.applesData[0].answer
        },
        hitIntractables(){
            const snakeHead = this.snake[this.snake.length - 1]
            if(this.applesOnGrid.includes(snakeHead)){
                const appleIndex = this.applesOnGrid.findIndex(i => i == snakeHead)
                if(appleIndex == 0) { // first index is the correct answer
                    this.$refs.overlay.setState('gain', "+100")
                    this.score += 100
                } else {
                    this.snake.unshift(999)
                    this.snake.unshift(999)
                    this.snake.unshift(999)
                    this.snake.unshift(999)

                    this.$refs.overlay.setState('hit')
                }
                this.newApples()
            }
        },
        loadEquation(isApple, index){
            if(isApple == false) return // check to make sure it is an apple index
            if(this.applesData[0] == undefined) return '...' // make sure that applesData has been generated
            const appleIndex = this.applesOnGrid.findIndex(i => i == index) // find corresponding index
            return this.applesData[appleIndex].equation
        },
        levelUp(){
            if(this.level % 5 == 0 && this.appleAmount < 4) {this.appleAmount +=1}
            else if (this.level % 3 == 0) {
                
                if((this.gameSpeed - this.speedUpUnitPerLevel) >= 80){
                    this.gameSpeed -= this.speedUpUnitPerLevel
                }else{
                    this.gameSpeed = 80
                }
                this.setGameLoop(false)
                this.setGameLoop(true)
            }else {
                this.snake.unshift(999)
                this.snake.unshift(999)
            }
            const reward = Math.floor((150 * this.level) / 2) 
            this.score += reward
            this.$refs.overlay.setState('levelup', [this.level, reward])
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
                if(this.Debug == false) return
                this.pauseGame = !this.pauseGame
                this.setGameLoop(this.pauseGame)
            }

            // if(e.key.toUpperCase() == 'R' && this.gameOver){
            if(e.key.toUpperCase() == 'R'){
                if(this.gameOver || this.Debug){
                    this.newGame()
                }
            }

        }) // --> Get Input
        
        
    },
    mounted() {
        if (localStorage.score) {
            this.score = parseInt(localStorage.score);
        }else{
            localStorage.score = 0
            this.score = parseInt(localStorage.score);
        }

        if (localStorage.level) {
            this.level = parseInt(localStorage.level);
        }else{
            localStorage.level = 1
            this.level = parseInt(localStorage.level);
        }

        if (localStorage.levelUpTimer) {
            this.levelUpTimer = parseInt(localStorage.levelUpTimer);
        }else{
            localStorage.levelUpTimer = 1
            this.levelUpTimer = parseInt(localStorage.levelUpTimer);
        }

        //Start Game Loop
        this.$refs.overlay.setState('gamestart')
    },
    watch: {
        score(newScore){
            localStorage.score = newScore
        },
        level(newLevel){
            localStorage.level = newLevel
        },
        levelUpTimer(newLevelUpTimer){
            localStorage.levelUpTimer = newLevelUpTimer
        }

    }
}
</script>

<style lang="scss" scoped>
.grid-container {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
    border-radius: 0px 0px 8px 8px;

    @media (max-width: $mobile){
        display: grid;
        grid-template-columns: repeat(17, 1fr);
        grid-template-rows: repeat(15, 1fr);
    }
}

.snake-head-title {
    position: absolute;
    left: calc(50% - 30px);
    top: 0;
    z-index: 100;
    display: table;
    background: $primary;
    color: $text-white;
    padding: 10px 20px;
}

.grid-block {
    height: 2.5rem;
    width: 2.5rem;
    display: grid;
    justify-content: center;
    align-content: center;
    border: solid 0.2px $light-light-gray;
    font-weight: 700;
    font-size: 1rem;
    color:#ffffff00;

    @media (max-width: $mobile) {
        height: auto;
        width: auto;
        min-width: 2rem;
        min-height: 2rem;
    }
    @media (max-width: $mobile-medium){
        max-height: 2rem;
    }
}

.snake {
    background: $primary;
}

.snake.head {
    color: $text-white;
}

.snake.hit {
    animation: hit 0.2s;
}

@keyframes hit {
    0%{background: $primary;} 
    25%{background: $secondary;}
    50%{background: $primary;}
    75%{background: $secondary;}
    100%{background: $primary;}
}

</style>
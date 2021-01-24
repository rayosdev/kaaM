<template>
    <div class="grid-container">
        <div class="grid-block"
            v-for="(block, i) in gridMap"
            :key="i"
            v-bind:class="snakePiceInBox(i)"
        >
            {{i}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gridMap: [
                ... new Array(255).fill(0)
            ],
            snake: [1, 2, 3, 4, 5],
            gameInterval: null,
            gameSpeed: 120,
            HeadDirection: {
                next:'',
                now:'Right'
            }
        }
    },
    methods: {
        snakePiceInBox(boxIndex){ // Snake visibility, grid styling
            for (const pice of this.snake) {
                if(pice == boxIndex) {
                    if(boxIndex == this.snake[this.snake.length -1]) return 'snake head'
                    return 'snake'
                }
            }
            return ''
        },

        gameLoop(){
            const headDir = this.HeadDirection
            
            // Keep track of last direction for non head parts movement
            // let lastDir = 0 
            // if(headDir.now == "Right")   lastDir = 1
            // if(headDir.now == "Left")    lastDir = -1
            // if(headDir.now == "Up")      lastDir = -17
            // if(headDir.now == "Down")    lastDir = 17

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

            // Test collisions
            
            
            // Move snake
            const snake = [...this.snake]

            this.snake = snake.map((pice, i) => {
                if(snake[i + 1] == undefined) return snake[i] += dir
                return snake[i + 1]
            });

            
            this.$forceUpdate();
        }
    },
    created() {

        // Get Input
        window.addEventListener('keydown', e => {
            
            //TODO fix no lock before tick
            if(e.key.includes("Arrow") == false) return
            this.HeadDirection.next = e.key.replace(/Arrow/g,'')
        })
        
        //Start Game Loop
        setTimeout( () => {
            this.gameInterval = setInterval(
                this.gameLoop, 
                this.gameSpeed
            )
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
<template>
    <div class="score-board">
        <h2>Highscore</h2>
        <div class="greeting">
            <p v-if="playerName != ''">
                Hallo  <span class="name">{{playerName}}</span>
            </p>
            <p> Dette er konkurentene dinne</p>
        </div>
        <ul>
            <li class="score-item" v-for="(item, idx) in heighscore" :key="idx">
                <span class="name">{{item.name}}</span>
                <span class="score">{{item.score}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    data() {
        return {
            heighscore: []
        }
    },
    methods: {
        ...mapMutations(['setNewHeighscoreUpdate']),
        getHighscore(){
            if (localStorage.heighscore) {
                this.heighscore = JSON.parse(localStorage.heighscore)
            }else{
                localStorage.heighscore = JSON.stringify([
                    {
                        name: 'Galadriel',
                        score: 3300
                    },
                    {
                        name: 'Frodo',
                        score: 2830
                    },
                    {
                        name: 'Sauron',
                        score: 2630
                    },
                    {
                        name: 'Legolas',
                        score: 2100
                    },
                    {
                        name: 'Éowyn',
                        score: 2040
                    },
                    {
                        name: 'Samwise Gamgee',
                        score: 1800
                    },
                    {
                        name: 'Gandalf',
                        score: 1600
                    },
                    {
                        name: 'Pippin Took',
                        score: 1560
                    },
                    {
                        name: 'Faramir',
                        score: 1490
                    },
                    {
                        name: 'Nazgûl',
                        score: 1410
                    },
                    {
                        name: 'Aragorn',
                        score: 1110
                    },
                    {
                        name: 'Gollum',
                        score: 600
                    },
                ])
                this.heighscore = JSON.parse(localStorage.heighscore)
            }
        }
    },
    computed: {
        playerName(){
            return this.$store.getters.getPlayerName
        },
        // mapState(['newHeighscoreUpdate'])
    },
    mounted() {
        this.getHighscore()
    },
    watch: {
        newHeighscoreUpdate(){
            this.getHighscore()
            console.log("new score")
        }
    }
}
</script>

<style lang="scss" scoped>
.score-board{

}
h2 {
    margin-top: 23px;
}

.greeting {
    margin-top: 40px;
    p {
        margin-top: 10px;
    }
    .name {
        font-weight: bold;
    }
    p:nth-child(2){
        opacity: 0.6;
        font-size: 14px;
        font-style: italic;
    }
}
ul{
    list-style: none;
    margin: 0;
    margin-top: 30px;
    padding: 0 44px;
    max-height: 420px;
    overflow: hidden;

    li {

        margin-bottom: 16px;

        span:nth-child(2){
            font-weight: 300;
        }
        span:nth-child(2){
            color: $secondary;
            font-weight: bold;
        }
        font-size: 18px;
        line-height: 152.5%;
    }
}
.score-item {
    display: flex;
    justify-content: space-between;
}
</style>
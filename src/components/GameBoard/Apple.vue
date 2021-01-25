<template>
    <div class="apple">
        <div class="sign">
            <p>{{question}}</p>
        </div>
        <img src="../../assets/apple.png">
    </div>
</template>

<script>
    export default {
        name: 'Apple',
        props: {
            question: String
        }
        
    }
</script>

<style lang="scss" scoped>
    .apple {
        position: relative;
        top: -2px;
        animation: animOnEntry 0.2s cubic-bezier(0,.55,.19,1.16);
    }
    .sign {
        position: absolute;
        width: 100px;
        height: 43px;
        background: url(../../assets/sign.svg);
        left: -37px;
        top: -26px;
        color: $text-gray;
        font-style: normal;
        font-weight: 700;
        font-size: 23px;
        line-height: 100%;
        display: grid;
        align-content: center;

        p {
            position: relative;
            bottom: 2px;
        }
    }

    @keyframes animOnEntry {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
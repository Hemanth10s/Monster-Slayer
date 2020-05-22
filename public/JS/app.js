

new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        isGame:false,
        turns:[],
        title:'',
        name:'',
        st:0
    },created:function(){
        this.getTitle()
    },
    methods:{
        monsterAttacks:function(){
            var damage=this.calculateDamage(5,12)
            this.playerHealth-=damage
            this.turns.unshift({
                isPlayer:false,
                text:'Monster hits Player for '+ damage
            })
            this.checkWin()
        },
        startgame:function(){
            this.isGame=true
            this.monsterHealth=100
            this.playerHealth=100
            this.turns=[]
            this.st=0
        },
        attack:function(){
            
            var damage=this.calculateDamage(3,10)
            this.monsterHealth-=damage
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster for '+ damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks()
        },
        specialAttack:function(){
            this.st+=1
            var damage=this.calculateDamage(10,20)
            this.monsterHealth-=damage
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster hard for '+ damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks()
            if(this.st===2){
                document.getElementById('special-attack').disabled=true
            }
        },
        heal:function(){
            this.playerHealth=(this.playerHealth<=90)?this.playerHealth+10:100
            this.turns.unshift({
                isPlayer:true,
                text:'Player heals for 10'
            })
            this.monsterAttacks()
        },
        endgame:function(){
            this.isGame=false
        },
        calculateDamage:function(min,max){
            var damage=Math.max(Math.floor(Math.random()*max),min)
            return damage
        },
        checkWin:function(){
            if(this.monsterHealth<=0){
                if(confirm('You won! New Game?')){
                    this.startgame()
                }else{
                    this.isGame=false
                }
                return true
            }else if(this.playerHealth<=0){
                if(confirm('You lost! New Game?')){
                    this.startgame()
                }else{
                    this.isGame=false
                }
                return true
            }
            return false
        },
        getTitle:async function(){
            let res= await axios.get("https://monster--slayer.herokuapp.com/title");
            console.log(res.data)
            this.title=res.data.title
            this.name=res.data.name
        }
    }
})
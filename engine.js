const tierRank={Mortal:1,Divine:2,Cosmic:3,Chaos:4,Order:4,Origin:5,Primordial:6,Transcendent:7,Absolute:8,Beyond:9};

const animalBase={
  Wolf:{str:72,def:60,spd:92,int:75},
  Dragon:{str:92,def:90,spd:68,int:82},
  Bahamut:{str:98,def:96,spd:62,int:94},
  "Eternal Jellyfish":{str:60,def:72,spd:88,int:98},
  Phoenix:{str:84,def:70,spd:90,int:88}
};
const objectBonus={
  Bloodsmith:{str:18,int:8},Nuclear:{str:25,def:10}, "Shaman Equipment":{int:22,spd:8},
  "Origin Grid":{int:25,def:8},"Celestial Sword":{str:20,spd:12}
};
const themeBonus={
  "Origin World":{tier:"Origin",int:15},"Pangu Era":{tier:"Primordial",str:15,def:15},
  Chaos:{tier:"Chaos",str:12,spd:15},"Order":{tier:"Order",def:18,int:10},
  Primordial:{tier:"Primordial",str:12,def:12,int:12}
};

export function createCharacter(animal,object,theme){
  const a=animalBase[animal]||animalBase.Wolf,b=objectBonus[object]||{},t=themeBonus[theme]||{};
  const stats={
    str:a.str+(b.str||0)+(t.str||0),
    def:a.def+(b.def||0)+(t.def||0),
    spd:a.spd+(b.spd||0)+(t.spd||0),
    int:a.int+(b.int||0)+(t.int||0)
  };
  const tier=t.tier||"Mortal";
  const name=`${animal.toUpperCase()}-${object.toUpperCase()} // ${theme.toUpperCase()}`;
  return {
    animal,object,theme,tier,name,stats,
    maxHp:500+stats.def*5,
    skills:["Fusion Strike","Conceptual Shift"],
    ultimate:`${theme} ${animal} Apocalypse`
  };
}

export function battle(player,enemy){
  let ph=player.maxHp,eh=enemy.maxHp,turn=1,log=[];
  const first=player.stats.spd>=enemy.stats.spd?player:enemy;
  const second=first===player?enemy:player;
  while(ph>0&&eh>0&&turn<=10){
    for(const actor of [first,second]){
      if(ph<=0||eh<=0)break;
      const target=actor===player?enemy:player;
      const power=actor.stats.str+actor.stats.int*0.35;
      const defense=target.stats.def*0.22;
      const dmg=Math.max(12,Math.round(power-defense+Math.random()*20));
      if(actor===player){eh-=dmg;log.push(`R${turn}: 🧬 ${player.name} menggunakan Fusion Strike dan memberikan ${dmg} damage.`)}
      else {ph-=dmg;log.push(`R${turn}: ☢️ ${enemy.name} membalas dengan ${dmg} damage.`)}
    }
    turn++;
  }
  const winner=ph>0?player:enemy;
  log.push(winner===player?`🏆 ${player.name} MENANG!`:`💀 ${enemy.name} MENANG!`);
  return {playerHp:Math.max(0,ph),enemyHp:Math.max(0,eh),winner,log};
}

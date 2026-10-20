import { createCharacter, battle } from "./engine.js";

let player = null;
let enemy = null;

const $ = (id) => document.getElementById(id);

function iconFor(animal){
  return {Wolf:"🐺",Dragon:"🐉",Bahamut:"🐲","Eternal Jellyfish":"🪼",Phoenix:"🔥"}[animal] || "✨";
}

function renderCharacter(c){
  $("character").classList.remove("hidden");
  $("character").innerHTML = `
    <div class="character-sheet">
      <div class="portrait">${iconFor(c.animal)}</div>
      <div>
        <p class="eyebrow">${c.tier}</p>
        <h2>${c.name}</h2>
        <p class="muted">${c.animal} + ${c.object} + ${c.theme}</p>
        <div class="stats">
          <div class="stat">STR <b>${c.stats.str}</b></div>
          <div class="stat">DEF <b>${c.stats.def}</b></div>
          <div class="stat">SPD <b>${c.stats.spd}</b></div>
          <div class="stat">INT <b>${c.stats.int}</b></div>
        </div>
        <div class="skill">⚡ ${c.skills.join(" • ")}</div>
      </div>
    </div>`;
}

function renderFighter(id,c,hp){
  const pct=Math.max(0,Math.round(hp/c.maxHp*100));
  $(id).innerHTML=`<strong>${iconFor(c.animal)} ${c.name}</strong><div class="muted">${c.tier}</div><div class="bar"><i style="width:${pct}%"></i></div><div>${Math.max(0,hp)} / ${c.maxHp} HP</div>`;
}

$("createBtn").onclick=()=>{
  player=createCharacter($("animal").value,$("object").value,$("theme").value);
  enemy=createCharacter("Bahamut","Nuclear","Pangu Era");
  renderCharacter(player);
  renderFighter("playerCard",player,player.maxHp);
  renderFighter("enemyCard",enemy,enemy.maxHp);
  $("battleBtn").disabled=false;
  $("battleLog").innerHTML="";
};

$("battleBtn").onclick=()=>{
  if(!player||!enemy)return;
  const result=battle(player,enemy);
  $("battleLog").innerHTML=result.log.map(x=>`<div class="log">${x}</div>`).join("");
  renderFighter("playerCard",player,result.playerHp);
  renderFighter("enemyCard",enemy,result.enemyHp);
};

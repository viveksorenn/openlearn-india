const quizzes = {
  vocabulary: [
    {q:"Choose the closest meaning of “abundant”.",o:["Rare","Plentiful","Tiny","Empty"],a:1,e:"Abundant means existing in large quantities; plentiful."},
    {q:"Choose the opposite of “ancient”.",o:["Old","Historic","Modern","Traditional"],a:2,e:"Modern is the opposite of ancient."},
    {q:"What does “reluctant” mean?",o:["Unwilling","Excited","Careless","Certain"],a:0,e:"Reluctant means hesitant or unwilling."}
  ],
  grammar: [
    {q:"Choose the grammatically correct sentence.",o:["She go to school.","She goes to school.","She going school.","She gone to school."],a:1,e:"With “she” in the simple present, use “goes”."},
    {q:"Fill in the blank: I have lived here ___ 2020.",o:["for","from","since","at"],a:2,e:"Use “since” with a starting point in time."},
    {q:"Choose the correct article: He is ___ honest person.",o:["a","an","the","no article"],a:1,e:"Use “an” before a vowel sound. Honest begins with a silent h."}
  ],
  gk: [
    {q:"Which is the largest planet in our solar system?",o:["Earth","Saturn","Jupiter","Neptune"],a:2,e:"Jupiter is the largest planet in our solar system."},
    {q:"What is the capital of Jharkhand?",o:["Dhanbad","Ranchi","Deoghar","Jamshedpur"],a:1,e:"Ranchi is the capital of Jharkhand."},
    {q:"Which instrument measures atmospheric pressure?",o:["Thermometer","Barometer","Hygrometer","Anemometer"],a:1,e:"A barometer measures atmospheric pressure."}
  ]
};
let topic="vocabulary", index=0, score=0, answered=false;
const $=id=>document.getElementById(id);
function render(){
 const item=quizzes[topic][index]; answered=false;
 $("questionCount").textContent=`QUESTION ${index+1} OF ${quizzes[topic].length}`;
 $("score").textContent=`SCORE: ${score}`;
 $("question").textContent=item.q; $("feedback").textContent=""; $("nextBtn").disabled=true;
 $("nextBtn").textContent=index===quizzes[topic].length-1?"Try again ↻":"Next question →";
 $("options").innerHTML="";
 item.o.forEach((choice,i)=>{const b=document.createElement("button");b.className="option";b.textContent=String.fromCharCode(65+i)+". "+choice;b.addEventListener("click",()=>choose(i));$("options").appendChild(b)});
}
function choose(i){
 if(answered)return; answered=true; const item=quizzes[topic][index]; const buttons=[...$("options").children];
 buttons.forEach((b,j)=>{b.disabled=true;if(j===item.a)b.classList.add("correct");else if(j===i)b.classList.add("wrong")});
 if(i===item.a){score++;$("feedback").textContent="Correct! "+item.e}else{$("feedback").textContent="Not quite. "+item.e}
 $("score").textContent=`SCORE: ${score}`;$("nextBtn").disabled=false;
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{topic=b.dataset.topic;index=0;score=0;document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===b));render()}));
$("nextBtn").addEventListener("click",()=>{if(index===quizzes[topic].length-1){index=0;score=0}else index++;render()});
$("resetBtn").addEventListener("click",()=>{score=0;index=0;render()});
$("year").textContent=new Date().getFullYear();
let hindi=false;
$("languageBtn").addEventListener("click",()=>{hindi=!hindi;$("languageBtn").textContent=hindi?"English":"हिन्दी";$("heroTitle").innerHTML=hindi?"छोटे कदम।<br><em>बड़ी प्रगति।</em>":"Small steps.<br><em>Big progress.</em>";$("heroText").textContent=hindi?"अंग्रेज़ी, व्याकरण और सामान्य ज्ञान का अभ्यास करके हर दिन अपना ज्ञान बढ़ाएँ।":"Build your knowledge every day with short English, grammar and general knowledge practice.";});
render();

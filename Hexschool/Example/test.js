var b = 2; // 會繼承到 window上，不會繼承到 global
global.a = 2; // 不會繼承到 window

console.log(a);

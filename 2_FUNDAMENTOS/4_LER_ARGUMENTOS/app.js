const args = process.argv;
//console.log(args);

const nome = args[2].split("=")[1];
console.log(nome);

const idade = args[3].split("=")[1];
console.log(idade);

console.log(`O usuário ${nome} tem ${idade} anos.`);

// Classe que substitui o antigo `type ConsumidorDTO` + funções soltas
class Consumidor {
  private _nome!: string;
  private _idade!: number;
  private _email!: string;

  // Construtor: usa os setters, então a validação roda já na criação
  constructor(nome: string, idade: number, email: string) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
  }

  // --- Getters e setters com validação ---
  get nome(): string {
    return this._nome;
  }
  set nome(valor: string) {
    if (typeof valor !== "string" || valor.trim().length < 2) {
      throw new Error("Nome inválido: informe ao menos 2 caracteres.");
    }
    this._nome = valor.trim();
  }

  get idade(): number {
    return this._idade;
  }
  set idade(valor: number) {
    if (!Number.isInteger(valor) || valor < 0 || valor > 120) {
      throw new Error("Idade inválida: deve ser um inteiro entre 0 e 120.");
    }
    this._idade = valor;
  }

  get email(): string {
    return this._email;
  }
  set email(valor: string) {
    const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof valor !== "string" || !formatoValido.test(valor.trim())) {
      throw new Error("E-mail inválido.");
    }
    this._email = valor.trim().toLowerCase();
  }

  // --- Métodos de instância (antes: formatarExibicao) ---
  exibir(): string {
    return `Consumidor: ${this._nome} (${this._idade} anos) - ${this._email}`;
  }

  // --- Métodos estáticos (antes: funções soltas de estatística) ---
  static calcularMediaIdade(consumidores: Consumidor[]): number {
    if (consumidores.length === 0) return 0;
    const soma = consumidores.reduce((acc, c) => acc + c.idade, 0);
    return soma / consumidores.length;
  }

  static obterExtremosIdade(consumidores: Consumidor[]): {
    maisVelho?: Consumidor;
    maisNovo?: Consumidor;
  } {
    if (consumidores.length === 0) return {};
    let maisVelho = consumidores[0];
    let maisNovo = consumidores[0];
    for (const c of consumidores) {
      if (c.idade > maisVelho.idade) maisVelho = c;
      if (c.idade < maisNovo.idade) maisNovo = c;
    }
    return { maisVelho, maisNovo };
  }
}

// --- EXECUÇÃO DE TESTE ---
const listaConsumidores: Consumidor[] = [
  new Consumidor("Ana Silva", 30, "ana@email.com"),
  new Consumidor("Carlos Souza", 22, "carlos@email.com"),
  new Consumidor("Mariana Lima", 45, "mariana@email.com"),
  new Consumidor("Roberto Alves", 19, "roberto@email.com"),
  new Consumidor("Fernanda Dias", 33, "fernanda@email.com"),
];

console.log("=== LISTA DE CONSUMIDORES ===");
listaConsumidores.forEach((c) => console.log(c.exibir()));

console.log("\n=== ANÁLISE ESTATÍSTICA ===");
console.log(
  `Média das Idades: ${Consumidor.calcularMediaIdade(listaConsumidores).toFixed(1)} anos`
);

const { maisVelho, maisNovo } = Consumidor.obterExtremosIdade(listaConsumidores);
if (maisVelho && maisNovo) {
  console.log(`Mais Velho(a): ${maisVelho.nome} (${maisVelho.idade} anos)`);
  console.log(`Mais Novo(a): ${maisNovo.nome} (${maisNovo.idade} anos)`);
} else {
  console.log("Não foi possível calcular os extremos de idade");
}

// --- TESTE DAS VALIDAÇÕES ---
console.log("\n=== TESTE DE VALIDAÇÕES ===");
const casosInvalidos: Array<[string, number, string]> = [
  ["", 25, "a@email.com"],
  ["João", -5, "joao@email.com"],
  ["Maria", 28, "email-sem-arroba"],
];
for (const [nome, idade, email] of casosInvalidos) {
  try {
    new Consumidor(nome, idade, email);
  } catch (erro) {
    console.log(`Erro esperado: ${(erro as Error).message}`);
  }
}

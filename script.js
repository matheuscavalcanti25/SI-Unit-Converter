// Configuração do Tema Escuro
document.addEventListener('DOMContentLoaded', function() {
  // Verificar tema ao carregar
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById('btnTema').textContent = 'Modo Claro';
  }

  // Configurar evento do botão de tema
  document.getElementById('btnTema').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      this.textContent = 'Modo Claro';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      this.textContent = 'Modo Escuro';
    }
  });
});

// Mapear categorias PT -> chave API
const categoriasMap = {
  peso: "weight",
  comprimento: "length",
  tempo: "time",
  energia: "energy",
  pressao: "pressure",
  temperatura: "temperature",
  velocidade: "speed",
  volume: "volume",
  forca: "force",
  potencia: "power",
};

// Prefixos SI com fator e descrição
const prefixosSI = {
  "": { fator: 1, nome: "Nenhum", descricao: "Sem prefixo" },
  Y: { fator: 1e24, nome: "Yotta (Y)", descricao: "10²⁴" },
  Z: { fator: 1e21, nome: "Zetta (Z)", descricao: "10²¹" },
  E: { fator: 1e18, nome: "Exa (E)", descricao: "10¹⁸" },
  P: { fator: 1e15, nome: "Peta (P)", descricao: "10¹⁵" },
  T: { fator: 1e12, nome: "Tera (T)", descricao: "10¹²" },
  G: { fator: 1e9, nome: "Giga (G)", descricao: "10⁹" },
  M: { fator: 1e6, nome: "Mega (M)", descricao: "10⁶" },
  k: { fator: 1e3, nome: "Quilo (k)", descricao: "10³" },
  h: { fator: 1e2, nome: "Hecto (h)", descricao: "10²" },
  da: { fator: 1e1, nome: "Deca (da)", descricao: "10¹" },
  d: { fator: 1e-1, nome: "Deci (d)", descricao: "10⁻¹" },
  c: { fator: 1e-2, nome: "Centi (c)", descricao: "10⁻²" },
  m: { fator: 1e-3, nome: "Mili (m)", descricao: "10⁻³" },
  µ: { fator: 1e-6, nome: "Micro (µ)", descricao: "10⁻⁶" },
  n: { fator: 1e-9, nome: "Nano (n)", descricao: "10⁻⁹" },
  p: { fator: 1e-12, nome: "Pico (p)", descricao: "10⁻¹²" },
  f: { fator: 1e-15, nome: "Femto (f)", descricao: "10⁻¹⁵" },
  a: { fator: 1e-18, nome: "Atto (a)", descricao: "10⁻¹⁸" },
  z: { fator: 1e-21, nome: "Zepto (z)", descricao: "10⁻²¹" },
  y: { fator: 1e-24, nome: "Yocto (y)", descricao: "10⁻²⁴" },
};

// Fatores de conversão entre unidades
const fatoresConversao = {
  peso: {
    kilogram: 1,
    gram: 0.001,
    pound: 0.453592,
    ounce: 0.0283495,
    stone: 6.35029
  },
  comprimento: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34
  },
  tempo: {
    second: 1,
    minute: 60,
    hour: 3600
  },
  energia: {
    joule: 1,
    calorie: 4.184,
    kilocalorie: 4184
  },
  pressao: {
    pascal: 1,
    atmosphere: 101325,
    bar: 100000
  },
  temperatura: {
    celsius: {
      toBase: (val) => val,
      fromBase: (val) => val
    },
    fahrenheit: {
      toBase: (val) => (val - 32) * 5/9,
      fromBase: (val) => val * 9/5 + 32
    },
    kelvin: {
      toBase: (val) => val - 273.15,
      fromBase: (val) => val + 273.15
    }
  },
  velocidade: {
    "meter per second": 1,
    "kilometer per hour": 1/3.6,
    "mile per hour": 0.44704,
    "foot per second": 0.3048
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    cubic_meter: 1000,
    gallon: 3.78541
  },
  forca: {
    newton: 1,
    dyne: 0.00001,
    pound_force: 4.44822
  },
  potencia: {
    watt: 1,
    horsepower: 745.7
  }
};

// Unidades com nomes e descrições
const unidadesPorCategoria = {
  peso: {
    pound: {
      nome: "Libra",
      descricao: "Libra (pound) é unidade imperial de massa (~0,453592 kg).",
    },
    kilogram: {
      nome: "Quilograma",
      descricao: "Quilograma (kilogram) é unidade padrão de massa no SI.",
    },
    gram: {
      nome: "Grama",
      descricao: "Grama (gram) é 1/1000 do quilograma.",
    },
    ounce: {
      nome: "Onça",
      descricao: "Onça (ounce) é unidade imperial (~28,35 g).",
    },
    stone: {
      nome: "Stone",
      descricao: "Stone é unidade britânica de massa (~6,35 kg).",
    },
  },
  comprimento: {
    meter: {
      nome: "Metro",
      descricao: "Metro (meter) é unidade padrão de comprimento no SI.",
    },
    kilometer: {
      nome: "Quilômetro",
      descricao: "Quilômetro (kilometer) é 1000 metros.",
    },
    centimeter: {
      nome: "Centímetro",
      descricao: "Centímetro (centimeter) é 1/100 do metro.",
    },
    millimeter: {
      nome: "Milímetro",
      descricao: "Milímetro (millimeter) é 1/1000 do metro.",
    },
    inch: {
      nome: "Polegada",
      descricao: "Polegada (inch) é unidade imperial (~2,54 cm).",
    },
    foot: {
      nome: "Pé",
      descricao: "Pé (foot) equivale a 12 polegadas (~30,48 cm).",
    },
    yard: {
      nome: "Jarda",
      descricao: "Jarda (yard) é 3 pés (~0,9144 m).",
    },
    mile: {
      nome: "Milha",
      descricao: "Milha (mile) é unidade imperial (~1609 metros).",
    },
  },
  tempo: {
    second: {
      nome: "Segundo",
      descricao: "Segundo (second) é unidade padrão de tempo no SI.",
    },
    minute: {
      nome: "Minuto",
      descricao: "Minuto (minute) tem 60 segundos.",
    },
    hour: {
      nome: "Hora",
      descricao: "Hora (hour) tem 60 minutos.",
    },
  },
  energia: {
    joule: {
      nome: "Joule",
      descricao: "Joule (joule) é unidade padrão de energia no SI.",
    },
    calorie: {
      nome: "Caloria",
      descricao: "Caloria (calorie) é unidade usada em alimentação.",
    },
    kilocalorie: {
      nome: "Quilocaloria",
      descricao: "Quilocaloria (kilocalorie) é 1000 calorias.",
    },
  },
  pressao: {
    pascal: {
      nome: "Pascal",
      descricao: "Pascal (pascal) é unidade padrão de pressão no SI.",
    },
    atmosphere: {
      nome: "Atmosfera",
      descricao: "Atmosfera (atmosphere) é pressão atmosférica ao nível do mar (~101325 Pa).",
    },
    bar: {
      nome: "Bar",
      descricao: "Bar é unidade de pressão, 1 bar = 100000 Pa.",
    },
  },
  temperatura: {
    celsius: { nome: "Celsius (°C)", descricao: "Escala Celsius de temperatura." },
    fahrenheit: { nome: "Fahrenheit (°F)", descricao: "Escala Fahrenheit de temperatura." },
    kelvin: { nome: "Kelvin (K)", descricao: "Escala Kelvin de temperatura (SI base para temperatura termodinâmica)." },
  },
  velocidade: {
    "meter per second": { nome: "Metro por segundo (m/s)", descricao: "Unidade padrão de velocidade no SI." },
    "kilometer per hour": { nome: "Quilômetro por hora (km/h)", descricao: "Unidade comum de velocidade." },
    "mile per hour": { nome: "Milha por hora (mph)", descricao: "Unidade imperial de velocidade." },
    "foot per second": { nome: "Pé por segundo (ft/s)", descricao: "Unidade imperial de velocidade." },
  },
  volume: {
    liter: { nome: "Litro (L)", descricao: "Unidade comum de volume." },
    milliliter: { nome: "Mililitro (mL)", descricao: "1/1000 de litro." },
    cubic_meter: { nome: "Metro cúbico (m³)", descricao: "Unidade padrão de volume no SI." },
    gallon: { nome: "Galão (gal)", descricao: "Unidade imperial de volume." },
  },
  forca: {
    newton: { nome: "Newton (N)", descricao: "Unidade padrão de força no SI." },
    dyne: { nome: "Dyne", descricao: "Unidade CGS de força." },
    pound_force: { nome: "Libra-força (lbf)", descricao: "Unidade imperial de força." },
  },
  potencia: {
    watt: { nome: "Watt (W)", descricao: "Unidade padrão de potência no SI." },
    horsepower: { nome: "Cavalo-vapor (hp)", descricao: "Unidade imperial de potência." },
  },
};

// Função para popular os dropdowns de prefixos
function popularPrefixos() {
  const selPrefixoDe = document.getElementById("prefixoDe");
  const selPrefixoPara = document.getElementById("prefixoPara");

  selPrefixoDe.innerHTML = "";
  selPrefixoPara.innerHTML = "";

  for (const chave in prefixosSI) {
    let optDe = document.createElement("option");
    optDe.value = chave;
    optDe.text = `${prefixosSI[chave].nome} (${chave || "nenhum"})`;
    selPrefixoDe.appendChild(optDe);

    let optPara = optDe.cloneNode(true);
    selPrefixoPara.appendChild(optPara);
  }

  selPrefixoDe.value = "";
  selPrefixoPara.value = "";
}

// Função para atualizar as unidades quando a categoria muda
function atualizarUnidades() {
  const categoriaPT = document.getElementById("categoria").value;
  const unidadeDe = document.getElementById("unidadeDe");
  const unidadePara = document.getElementById("unidadePara");

  unidadeDe.innerHTML = "";
  unidadePara.innerHTML = "";

  const unidades = unidadesPorCategoria[categoriaPT];
  for (let chaveAPI in unidades) {
    const nomePT = unidades[chaveAPI].nome;
    let option1 = document.createElement("option");
    option1.value = chaveAPI;
    option1.text = nomePT;

    let option2 = option1.cloneNode(true);

    unidadeDe.appendChild(option1);
    unidadePara.appendChild(option2);
  }

  mostrarDescricao("de");
  mostrarDescricao("para");
  converter();
}

// Função para mostrar a descrição da unidade
function mostrarDescricao(origem) {
  const categoriaPT = document.getElementById("categoria").value;
  const unidadeSelecionada = document.getElementById(origem === "de" ? "unidadeDe" : "unidadePara").value;

  const texto = unidadesPorCategoria[categoriaPT][unidadeSelecionada]
    ? unidadesPorCategoria[categoriaPT][unidadeSelecionada].descricao
    : "Descrição não disponível.";

  document.getElementById(origem === "de" ? "descDe" : "descPara").innerText = texto;
}

// Função para formatar o resultado
function formatarResultado(valor) {
  if (valor === 0) return "0";
  if (Math.abs(valor) < 0.001 || Math.abs(valor) > 1e6) {
    return valor.toExponential(4).replace("e", " × 10^");
  }
  return valor.toFixed(6).replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.$/, "");
}

// Função principal de conversão
function converter() {
  const valorInput = document.getElementById("valor").value;
  const categoriaPT = document.getElementById("categoria").value;
  const unidadeDe = document.getElementById("unidadeDe").value;
  const unidadePara = document.getElementById("unidadePara").value;
  const prefixoDe = document.getElementById("prefixoDe").value;
  const prefixoPara = document.getElementById("prefixoPara").value;

  const erroDiv = document.getElementById("erro");
  const resultadoDiv = document.getElementById("resultado");
  erroDiv.innerText = "";
  resultadoDiv.innerText = "";

  if (!valorInput || isNaN(valorInput)) {
    erroDiv.innerText = "Por favor, insira um valor numérico válido.";
    return;
  }

  let valorNum = Number(valorInput);

  // Aplica prefixo de origem
  valorNum = valorNum * (prefixosSI[prefixoDe]?.fator || 1);

  // Tratamento especial para temperatura
  if (categoriaPT === "temperatura") {
    if (prefixoDe !== "" || prefixoPara !== "") {
      erroDiv.innerText = "Prefixos não são aplicáveis para temperatura.";
      return;
    }
    
    const tempEmCelsius = fatoresConversao.temperatura[unidadeDe].toBase(valorNum);
    const resultado = fatoresConversao.temperatura[unidadePara].fromBase(tempEmCelsius);
    
    const resultadoFormatado = formatarResultado(resultado);
    const nomeUnidadePara = unidadesPorCategoria[categoriaPT][unidadePara].nome;
    
    resultadoDiv.innerText = `Resultado: ${resultadoFormatado} ${nomeUnidadePara}`;
    return;
  }

  // Para outras categorias
  try {
    const valorEmBase = valorNum * fatoresConversao[categoriaPT][unidadeDe];
    const valorConvertido = valorEmBase / fatoresConversao[categoriaPT][unidadePara];
    const valorFinal = valorConvertido / (prefixosSI[prefixoPara]?.fator || 1);

    const resultadoFormatado = formatarResultado(valorFinal);
    const nomeUnidadePara = unidadesPorCategoria[categoriaPT][unidadePara].nome;
    const mostrarPrefixo = prefixoPara !== "";

    resultadoDiv.innerText = `Resultado: ${resultadoFormatado}${mostrarPrefixo ? " " + prefixosSI[prefixoPara].nome : ""} ${nomeUnidadePara}`;
  } catch (err) {
    erroDiv.innerText = "Erro na conversão. Verifique as unidades e tente novamente.";
    console.error("Erro detalhado:", err);
  }
}

// Inicialização quando a página carrega
window.onload = function() {
  popularPrefixos();
  atualizarUnidades();

  // Configurar event listeners
  document.getElementById("categoria").addEventListener("change", atualizarUnidades);
  document.getElementById("unidadeDe").addEventListener("change", () => {
    mostrarDescricao("de");
    converter();
  });
  document.getElementById("unidadePara").addEventListener("change", () => {
    mostrarDescricao("para");
    converter();
  });
  document.getElementById("prefixoDe").addEventListener("change", converter);
  document.getElementById("prefixoPara").addEventListener("change", converter);
  document.getElementById("valor").addEventListener("input", converter);
  document.getElementById("btnConverter").addEventListener("click", converter);
};
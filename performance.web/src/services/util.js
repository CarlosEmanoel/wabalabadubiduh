import moment from "moment";

const setMask = (type, v) => {
  if (type === "cpf") {
    let cpf = v.trim().replace(/\D/g, "");
    cpf = cpf.replace(/^(\d{3})(\d)/g, "$1.$2");
    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/, "$1.$2.$3-$4");
    return cpf.substring(0, 14);
  }
  if (type === "cnpj") {
    let cnpj = v.trim().replace(/^(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
    return cnpj.substring(0, 18);
  }
  if (type === "cep") {
    let cep = v.trim().replace(/\D/g, "");
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2");
    cep = cep.replace(/\.(\d{3})(\d)/, ".$1-$2");
    return cep.substring(0, 10);
  }
  if (type === "telefone") {
    // limita o máximo de caracteres
    if (v.length > 15) return v.substring(0, 15);

    let tel = v.trim().replace(/\D/g, ""); // Remove caracteres não numéricos

    // Adiciona parênteses ao redor do DDD e um espaço após o DDD
    if (tel.length > 0) {
      tel = tel.replace(/^(\d)/, "($1");
      tel = tel.replace(/(.{3})(\d)/, "$1) $2");
    }

    // Verifica o comprimento do número e adiciona o hífen na posição correta
    if (tel.length > 9) {
      if (tel.length <= 13) {
        // Para números com 10 dígitos após o DDD
        tel = tel.replace(/(\d{4})(\d)/, "$1-$2");
      } else if (tel.length === 14) {
        // Para números com 11 dígitos após o DDD, realoca o hífen
        tel = tel.replace(/(\d{5})(\d{4})$/, "$1-$2");
      }
    }
    return tel;
  }

  if (type === "money") {
    if (v === "") return v;
    // Remove tudo que não é dígito
    v = v.replace(/\D/g, "");
    // Converte para número para remover zeros à esquerda
    const numValue = parseInt(v, 10);
    // Converte de volta para string e adiciona zeros à esquerda se necessário
    v = numValue ? numValue.toString() : "0";
    // Adiciona os pontos decimais e de milhar
    v = v.padStart(3, "0"); // Garante pelo menos 3 dígitos
    v = v.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona vírgula antes dos últimos dois dígitos
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona pontos de milhar
    return v;
  }

  if (type === "date") {
    return getDateView(v);
  }

  if (type === "mesExtenso") {
    return util.nomeMesExtenso(v);
  }
  return v.trim();
};

const formatMoney = (value) => {
  let floatValue = parseFloat(value);
  return floatValue.toLocaleString("pt-br", { minimumFractionDigits: 2 });
};

const formatMoneyBR = (value) => {
  let floatValue = parseFloat(value);
  return floatValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

const FormatarBD = (valor) => {
  if (valor !== undefined) {
    let vl = valor + "";

    while (vl.indexOf(".") >= 0) {
      vl = vl.replace(".", "");
    }

    return vl.replace(",", ".");
  } else {
    return valor;
  }
};

const getDateView = (date) => {
  let ret = "";
  if (date === "-") {
    return "-";
  }
  if (date !== null && date !== "") {
    ret = moment(date.slice(0, 10), "YYYY-MM-DD").format("DD/MM/YYYY");
  }
  return ret;
};

const getDateBD = (date) => {
  let ret = "";
  if (date !== null && date !== "") {
    ret = moment(date.slice(0, 10), "YYYY-MM-DD").format("YYYY-MM-DD");
  }
  return ret;
};

const validarCpf = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const calcDigito = (base) => {
    const soma = cpf
      .slice(0, base)
      .split("")
      .reduce((soma, el, idx) => soma + el * (base + 1 - idx), 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  return calcDigito(9) == cpf[9] && calcDigito(10) == cpf[10];
};

function validarCnpj(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) {
    return false;
  }

  return true;
}

const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const removeAuthToken = () => {
  localStorage.removeItem("uid");
  localStorage.removeItem("t");
  localStorage.removeItem("token");
};

let loading = false;

const isLoading = () => {
  return loading;
};

const startLoading = () => {
  loading = true;
};

const stopLoading = () => {
  loading = false;
};

let sidebarVisible = false;

const toggleSidebar = (value) => {
  sidebarVisible = typeof value !== 'undefined' ? value : !sidebarVisible;
  return sidebarVisible;
};

const isSidebarVisible = () => {
  return sidebarVisible;
};

const util = {
  mask: (type, value) => {
    return setMask(type, value);
  },
  formatMoney: (value) => {
    return formatMoney(value);
  },
  formatMoneyBR: (value) => {
    return formatMoneyBR(value);
  },
  formatBD: (valor) => {
    if (valor === "-" || valor === "") return valor;
    return FormatarBD(valor);
  },
  getDateView: (valor) => {
    if (valor === "-" || valor === "") return valor;
    return getDateView(valor);
  },
  getDateBD: (data) => {
    return getDateBD(data);
  },
  validarCpf(cpf) {
    return validarCpf(cpf);
  },
  validarCnpj(cnpj) {
    return validarCnpj(cnpj);
  },
  setAuthToken: (token) => {
    setAuthToken(token);
  },
  getAuthToken: () => {
    return getAuthToken();
  },
  removeAuthToken: () => {
    removeAuthToken();
  },
  getEnv: () => {
    return process.env.NODE_ENV === "production" ? "" : "";
  },
  /* sidebar */
  toggleSidebar: (isSidebarOpen, setIsSidebarOpen) => {
    setIsSidebarOpen(!isSidebarOpen);
  },
  /* sidebar */
  isLoading: isLoading,
  startLoading: startLoading,
  stopLoading: stopLoading,
  storage: {
    getItem: (item) => {
      return localStorage.getItem(item);
    },
    setItem: (item, valor) => {
      localStorage.setItem(item, valor);
    },
    removeItem: (item) => {
      localStorage.removeItem(item);
    },
  },
};
export default util;

import { useState } from "react";
import axios from "axios";

const useLocationSearch = () => {
  const [cepError, setCepError] = useState(null);
  const [cepLoading, setCepLoading] = useState(false);

  const [ufsLoading, setUfsLoading] = useState(false);
  const [ufsError, setUfsError] = useState(null);

  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState(null);

  const fetchCep = async (cep) => {
    setCepLoading(true);
    setCepError(null);
    const cepFormatado = cep.replace(/\D/g, "");
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepFormatado}/json/`
      );
      if (!response.data.erro) {
        const { localidade, logradouro, complemento, bairro, ibge, uf } =
          response.data;
        return {
          cidade: localidade,
          logradouro,
          complemento,
          bairro,
          codMunicipioIbge: ibge,
          uf,
        };
      } else {
        setCepError("CEP não encontrado.");
        return null;
      }
    } catch (err) {
      console.error("Erro na consulta à API de CEP:", err);
      setCepError("Erro na consulta à API de CEP.");
      return null;
    } finally {
      setCepLoading(false);
    }
  };

  const fetchUfs = async () => {
    setUfsLoading(true);
    setUfsError(null);
    try {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      );
      const data = await response.json();
      const ufs = data.map((uf) => ({
        sigla: uf.sigla,
        nome: uf.nome,
      }));
      return ufs;
    } catch (err) {
      console.error("Erro na consulta à API de UFs:", err);
      setUfsError("Erro na consulta à API de UFs.");
    } finally {
      setUfsLoading(false);
    }
  };

  const fetchCities = async (uf) => {
    setCitiesLoading(true);
    setCitiesError(null);
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Erro na consulta à API de municípios:", err);
      setCitiesError("Erro na consulta à API de municípios.");
    } finally {
      setCitiesLoading(false);
    }
  };

  return {
    cepLoading,
    cepError,
    fetchCep,
    ufsLoading,
    ufsError,
    fetchUfs,
    citiesLoading,
    citiesError,
    fetchCities,
  };
};

export default useLocationSearch;

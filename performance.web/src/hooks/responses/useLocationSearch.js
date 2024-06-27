import { useState } from "react";
import axios from "axios";

const useLocationSearch = () => {
  const [loading, setLoading] = useState({
    cep: false,
    ufs: false,
    cities: false,
  });
  const [error, setError] = useState({
    cep: null,
    ufs: null,
    cities: null,
  });

  const setLoadingState = (type, state) => {
    setLoading((prev) => ({ ...prev, [type]: state }));
  };

  const setErrorState = (type, message) => {
    setError((prev) => ({ ...prev, [type]: message }));
  };

  const fetchCep = async (cep) => {
    setLoadingState("cep", true);
    setErrorState("cep", null);
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
        setErrorState("cep", "CEP não encontrado.");
        return null;
      }
    } catch (err) {
      console.error("Erro na consulta à API de CEP:", err);
      setErrorState("cep", "Erro na consulta à API de CEP.");
      return null;
    } finally {
      setLoadingState("cep", false);
    }
  };

  const fetchUfs = async () => {
    setLoadingState("ufs", true);
    setErrorState("ufs", null);
    try {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      );
      const data = await response.json();
      return data.map((uf) => ({
        sigla: uf.sigla,
        nome: uf.nome,
      }));
    } catch (err) {
      console.error("Erro na consulta à API de UFs:", err);
      setErrorState("ufs", "Erro na consulta à API de UFs.");
      return [];
    } finally {
      setLoadingState("ufs", false);
    }
  };

  const fetchCities = async (uf) => {
    setLoadingState("cities", true);
    setErrorState("cities", null);
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Erro na consulta à API de municípios:", err);
      setErrorState("cities", "Erro na consulta à API de municípios.");
      return [];
    } finally {
      setLoadingState("cities", false);
    }
  };

  return {
    loading,
    error,
    fetchCep,
    fetchUfs,
    fetchCities,
  };
};

export default useLocationSearch;

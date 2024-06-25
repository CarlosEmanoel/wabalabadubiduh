import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import api from '../../services/api'
import messages from '../../services/messsages'
import { PContent } from '../../components'

function PainelInscricao_msg() {
  const { id } = useParams()

  const [listaInscricao, setListaInscricao] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      api.get('/inscricao/' + id).then(response => {
        let data = {
          id: response.data.data.id,
          nome: response.data.data.nome,
          email: response.data.data.email,
          telefone: response.data.data.telefone,
          cnpj: response.data.data.cnpj,
          unidadegestora: response.data.data.unidadegestora,
          cargo: response.data.data.cargo,
          endereco: response.data.data.endereco,
          bairro: response.data.data.bairro,
          municipio: response.data.data.municipio,
          estado: response.data.data.estado,
          cep: response.data.data.cep
        }

        setListaInscricao(data)
      })
    }
  }, [id])

  const formik = useFormik({
    onSubmit: async data => {
      if (!id) {
        api.post('/inscricao', data).then(response => {
          setListaInscricao([])

          formik.values = {
            nome: '',
            email: '',
            telefone: '',
            cnpj: '',
            unidadegestora: '',
            cargo: '',
            endereco: '',
            bairro: '',
            municipio: '',
            estado: '',
            cep: ''
          }
          messages.mensagem.sucesso('Inscrição efetuada com sucesso!')
        })
      } else {
        data.id = id
        api.patch('/inscricao', data).then(response => {
          setListaInscricao([])

          formik.values = {
            nome: '',
            email: '',
            telefone: '',
            cnpj: '',
            unidadegestora: '',
            cargo: '',
            endereco: '',
            bairro: '',
            municipio: '',
            estado: '',
            cep: ''
          }

          if (response.data.success === true) {
            messages.mensagem.sucesso(response.data.message)
          } else {
            messages.mensagem.erro(response.data.message)
          }
        })
      }
    },
    initialValues: {
      nome: '',
      email: '',
      telefone: '',
      cnpj: '',
      unidadegestora: '',
      cargo: '',
      endereco: '',
      bairro: '',
      municipio: '',
      estado: '',
      cep: ''
    }
  })

  const voltar = () => {
    navigate('/painel/listainscricoes')
  }

  return (
    <PContent>
      <div className="my-4">
        <div className="border-collapse border border-slate-400 rounded px-3">
          <h3 className="py-3 border-b border-neutral-400 ">
            Inscrições recebidas
          </h3>

          <form className="flex flex-col">
            <div className="grid grid-cols-3">
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="nome">
                  Nome:
                </label>
                <div className="font-normal" htmlFor="nome">
                  {listaInscricao.nome}
                </div>
              </div>

              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="email">
                  Email:
                </label>
                <div className="font-normal" htmlFor="email">
                  {listaInscricao.email}
                </div>
              </div>

              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="telefone">
                  Telefone:
                </label>
                <div className="font-normal" htmlFor="telefone">
                  {listaInscricao.telefone}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="cnpj">
                  CNPJ:
                </label>
                <div className="font-normal" htmlFor="cnpj">
                  {listaInscricao.cnpj}
                </div>
              </div>

              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="unidade gestora">
                  Unidade Gestora:
                </label>
                <div
                  className="font-normal break-words text-justify"
                  htmlFor="unidade gestora"
                >
                  {listaInscricao.unidadegestora}
                </div>
              </div>
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="cargo">
                  Cargo:
                </label>
                <div className="font-normal" htmlFor="cargo">
                  {listaInscricao.cargo}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="endereço">
                  Endereço:
                </label>
                <div className="font-normal" htmlFor="endereço">
                  {listaInscricao.endereco}
                </div>
              </div>
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="bairro">
                  Bairro:
                </label>
                <div className="font-normal" htmlFor="bairro">
                  {listaInscricao.bairro}
                </div>
              </div>
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="município">
                  Município:
                </label>
                <div className="font-normal" htmlFor="município">
                  {listaInscricao.municipio}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="estado">
                  Estado:
                </label>
                <div className="font-normal" htmlFor="estado">
                  {listaInscricao.estado}
                </div>
              </div>
              <div className="mt-4 px-4">
                <label className="font-semibold mr-2" htmlFor="cep">
                  CEP:
                </label>
                <div className="font-normal" htmlFor="cep">
                  {listaInscricao.cep}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 mb-5 space-x-4">
              <button
                className="bg-gray-500 w-32 h-12 rounded text-gray-100 font-semibold text-lg"
                type="button"
                onClick={voltar}
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
    </PContent>
  )
}
export default PainelInscricao_msg

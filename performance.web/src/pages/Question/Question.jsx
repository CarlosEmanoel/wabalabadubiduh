import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useLocalStorage } from 'react-use'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Navigate } from 'react-router-dom'
import api from '../../services/api'

import './Question.css';

function Question() {
  const initialFormState = {
    letra: "",
    resposta: "",
  };

  const [auth, setAuth] = useLocalStorage('auth', {})
  const [listaAlternativas, setListaAlternativas] = useState([]);
  const [form, setForm] = useState(initialFormState);

  const formik = useFormik({
    onSubmit: async (data) => {
      console.log(data)
      data.alternativas = listaAlternativas;
      
      const res = api.post('/questao', data).then((response) => {
        formik.resetForm();
      })
    },
    initialValues: {
      pergunta: '',
      respostacorreta: '',
      respostacomentada: '',
      alternativas: []
    },
    // validationSchema
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'letra') {
      setForm({
        ...form, letra: value
      })
    }

    if (name === 'resposta') {
      setForm({
        ...form, resposta: value
      })
    }
  }

  const addAlternativa = () => {
    let alternativas = listaAlternativas
    let formulario = form
    alternativas.push(formulario)
    setListaAlternativas(alternativas)
    setForm(initialFormState)
  }

  return (
    <div id="questao">
    <div className='container mx-auto'>
        <h3 className='ps-5 mt-3'>Inserir questões</h3>

          <form onSubmit={formik.handleSubmit} >
            <div className="input-group ps-5">
              <div className='form' >
                <label  htmlFor="pergunta">Pergunta</label>
                <textarea className="form-control" 
                  type="text" 
                  name='pergunta'
                  placeholder='Digite a pergunta' 
                  value={formik.values.pergunta}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /> 
              </div>
              <div className='form' >
              <label  htmlFor="respostacorreta">Letra Correta</label>
                <select className="form-select"
                  name='respostacorreta'
                  placeholder='Digite letra correta' 
                  value={formik.values.respostacorreta}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select> 
              </div>

              <div className='form'>
                <label  htmlFor="respostacomentada">Resposta comentada</label>
                <textarea className="form-control"
                  type="text" 
                  name='respostacomentada'
                  placeholder='Digite resposta comentada' 
                  value={formik.values.respostacomentada}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /> 
              </div>
              <div className='form'>
                <label  htmlFor="letra">Alternativas</label>
                <select className="form-select"
                  name="letra"
                  placeholder='Digite letra'
                  value={form.letra}
                  onChange={handleInputChange} 
                >
                  <option selected>Letra</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
                
              </div>
              <div className='form'>
                <label  htmlFor="resposta">Resposta</label>
                <textarea className="form-control"
                  type="text" 
                  name='resposta'
                  placeholder='Digite resposta'
                  value={form.resposta}
                  onChange={handleInputChange}
                /> 
              </div> 
            </div>

                { listaAlternativas.length > 0 &&
                  <div>
                    {listaAlternativas.map(item => (
                      <div key={item.letra}>{item.letra} - {item.resposta}</div>
                    ))}
                  </div>
                }
                <div className='botao ps-5 mt-3'>
                  <button className='btn btn-primary' type="button" onClick={addAlternativa}>
                    Adicionar questão
                  </button>
                </div>
                <div className='botao ps-5 mt-5'>
                  <button type="submit" value="Salvar" className= "btn btn-info">
                    SALVAR 
                  </button>
                </div>    
          </form>
    </div>
  </div>
  )
}

export default Question
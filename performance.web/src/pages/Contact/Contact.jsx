import React, { useState } from 'react';
import api from '../../services/api';
import util from '../../services/util';
import { PDefaultContainer, PFileFetcher } from '../../components';

const Contact = () => {
    const initial = {
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
    };

    const validate = () => {

        if (contato.nome === '')
            return false

        if (contato.email === '')
            return false

        if (contato.telefone === '')
            return false

        if (contato.assunto === '')
            return false

        if (contato.mensagem === '')
            return false

        return true
    };

    const [contato, setContato] = useState(initial);
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');

    const valorContato = e => {
        let { name, value } = e.target

        if (name === 'telefone') {
            let nValue = util.mask('telefone', value)
            setContato({ ...contato, [name]: nValue })
        } else {
            setContato({ ...contato, [e.target.name]: e.target.value })
        }
    };


    const sendMensagem = (e) => {
        e.preventDefault();

        if (validate()) {
            api.post("/contato", contato)
                .then(response => {
                    if (response.data.success === true) {
                        setErro('')
                        setSucesso(response.data.message)
                        setContato(initial)
                    } else {
                        setSucesso('')
                        setErro(response.data.message)
                    }
                }).catch(error => {
                    setSucesso('')
                    if (error.data)
                        setErro(error.data.message)
                    else
                        setErro('Ocorreu um erro! Tente novamente mais tarde.')
                })
        } else {
            setSucesso('')
            setErro('Por favor, preencha todos os campos!')
        }
    }

    return (
        <PDefaultContainer>
            <div className="col-md-6 my-2 bg-gray-100 flex flex-col justify-center text-center text-xl">
                <h2 className="mb-5 text-sky-500 text-xl" >Entre em contato! </h2>
                <p className="text-[20px]"><i className="bi bi-telephone-fill me-2"></i>(62) 99942-8364</p>
                <p className="text-[20px]"><i className="bi bi-geo-alt-fill me-2"></i>Avenida Olinda, n° 960 - Park Lozandes - Torre 01, Sala 608 B - Edifício Lozandes - Goiânia/GO - Cep: 74884-120</p>
                {erro !== '' && <div className="text-red-500 w-64 mx-auto border-solid border-2 border-red-500 bg-red-100 rounded">{erro}</div>} <br />
                {sucesso !== '' && <div className="text-green-800 mx-auto w-64 border-solid border-2 border-green-500 bg-green-100 rounded" >{sucesso}</div>}
            </div>
            <div className="col-md-6">
                <div className="my-2 bg-gray-100 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <img src={`${process.env.REACT_APP_NODE_URL}/image/logo.png`} className="mx-auto h-14  mt-5 w-auto" />
                    </div>
                    <div className="max-w-md w-full mx-auto mt-4 mb-5 rounded-md bg-white p-8 border border-gray-600 flex flex-col justify-center items-center">

                        <form className="space-y-8 w-11/12" onSubmit={sendMensagem}>
                            <div>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Nome*"
                                    value={contato.nome}
                                    onChange={valorContato}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Email*"
                                    value={contato.email}
                                    onChange={valorContato}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    value={contato.telefone}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Telefone*"
                                    onChange={valorContato}
                                    maxLength={14}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="assunto"
                                    name="assunto"
                                    value={contato.assunto}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Assunto"
                                    onChange={valorContato}
                                />
                            </div>
                            <div>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    name="mensagem"
                                    id="mensagem"
                                    cols="30"
                                    rows="10"
                                    value={contato.mensagem}
                                    placeholder="Mensagem"
                                    onChange={valorContato}
                                >
                                </textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PDefaultContainer>
    )
}

export default Contact
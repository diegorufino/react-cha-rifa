import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/card'

const ConsultaApostas = () => {

    const [apostas, setApostas] = useState([])

    const listarApostas = () => {
        axios.get('http://rest-api-cha-rifa.herokuapp.com/apostas')
            .then(response => {
                const listaDeApostas = response.data
                setApostas(listaDeApostas.response.apostas)
            }).catch(erro => {
                console.log(erro)
        })
    }

    useEffect(() => {
        listarApostas()
    }, [])
    
    return (
        <Card header='Consulta Apostas'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Código</th>
                        <th>Número</th>
                        <th>Sorteio</th>
                        <th>Data Aposta</th>
                        <th>Apostador</th>
                        <th>Celular</th>
                        <th>Pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    {apostas.map(aposta => {
                        return (
                            <tr>
                                <th>{aposta.id_aposta}</th>
                                <th>{aposta.codigo}</th>
                                <th>{aposta.numero}</th>
                                <th>{aposta.id_sorteio}</th>
                                <th>{aposta.data_criado}</th>
                                <th>{aposta.nome}</th>
                                <th>{aposta.celular}</th>
                                <th>{aposta.data_pagamento}</th>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </Card>
        
    )
}

export default ConsultaApostas
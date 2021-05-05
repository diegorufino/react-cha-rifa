import React from 'react'
import axios from 'axios'
import ConsultaApostas from './apostas'

const API_URL = 'http://rest-api-cha-rifa.herokuapp.com/apostas'

const Actions = () => {
    const [apostas, setApostas] = useState([])

    const listarApostas = () => {
        axios.get(API_URL)
            .then(response => {
                const listaDeApostas = response.data
                setApostas( [...apostas, listaDeApostas.response.apostas])
            }).catch(erro => {
                console.log(erro)
        })
    }

    const alterarStatus = (id) => {
        axios.patch(`${API_URL}/${id}`, null, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.status)
        }).catch(erro => {
            console.log(erro)
        })
    }

    useEffect(() => {
        listarApostas()
    }, [])

    return (
        <ConsultaApostas listarApostas={listarApostas} alterarStatus={alterarStatus} />
    )
}

export default Actions
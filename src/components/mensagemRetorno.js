import React, {useState} from "react"

const MensagemRetorno = (result) => {
    const [msgErro, setMsgErro] = useState(result)

    const fecharMsgErro = () => {        
        setMsgErro(false)
    }

    return (msgErro &&
    <div className="alert alert-dismissible alert-secondary">
        <button
            type="button"
            className="close"
            onSubmit={fecharMsgErro}
            data-dismiss="alert">&times;
        </button>
        <h4 className="alert-heading">Erro!</h4>
        <p className="mb-0">E-mail ou senha não incorreto(s), tente mais tarde.</p>
    </div>)
}

export default MensagemRetorno
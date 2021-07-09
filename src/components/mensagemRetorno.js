import React, {useState} from "react"

const MensagemRetorno = (props) => {
    const [msgErro, setMsgErro] = useState(props.result)

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
        <h4 className="alert-heading">{props.title}</h4>
        <p className="mb-0">{props.description}</p>
    </div>)
}

export default MensagemRetorno
import Modal from 'react-modal';
import RegisterLogin from './RegisterLogin';

const customStyles = {
    content:{
        position: "absolute",
        inset: "40px",
        border:"none",
        background:"none",
        overflow:"hiden",
        padding:0,
        top:0,
        left:0,
        width: "100%",
        height: "100%"
    },
    overlay:{
        "background-color": "rgb(75 75 75 / 48%)",
        "z-index": "1050",
    }
};

Modal.setAppElement('#root');

const AuthModal =({state})=>{
    return (<div>
        <Modal
            isOpen={state.AuthModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
        <RegisterLogin/>
        </Modal>
    </div>);
}
export default AuthModal;
import Modal from "react-modal";

const ModelSignInUp = ({ modalIsOpen, closeModal }) => {
  return (
    <Modal isOpen={modalIsOpen} contentLabel="Example Modal">
      <h2>Hello</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
};

export default ModelSignInUp;

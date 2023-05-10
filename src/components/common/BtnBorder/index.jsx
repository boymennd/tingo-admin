import './btnBorder.css';

const BtnBorder = (props) => {
  const { image, text, callback } = props;
  return (
    <div className="btnBorder" onClick={callback}>
      <div className="btnInside">
        <div className="btnContent">
          <img src={image} alt={text} />
          {text}
        </div>
      </div>
    </div>
  );
};

export default BtnBorder;

import styles from './LayerBox.module.scss';

const LayerBox = (props) => {
  return (
    <div className={styles.layerBox}>
      <input
        id={props.id}
        onChange={() => props.handleCheck(props.id)}
        value={props.caption}
        type="checkbox"
        checked={props.checked}
      ></input>
      <label htmlFor={props.id}>{props.caption}</label>
    </div>
  );
};

export default LayerBox;

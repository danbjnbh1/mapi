import styles from './LayerBox.module.scss';
import './icons/layersIcons.css'

// import './layer_icons.css'

export default function LayerBox(props) {

  return (
    <div className={styles.layerBox}>
      <input
        id={props.id}
        onChange={() => props.hundleCheck(props.index)}
        value={props.caption}
        type="checkbox"
        checked={props.checked}
      ></input>
      <label htmlFor={props.id}>{props.caption}</label>
    </div>
  );
}

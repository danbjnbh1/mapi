import React from 'react';
import styles from './LayerBox.module.scss';

export default function LayerBox(props) {
  function hundleChange({ target: { value } }) {
    console.log(value + 'checked');
  }

  return (
    <div className={styles.layerBox}>
      <input
        id={props.id}
        onChange={hundleChange}
        value={props.caption}
        type="checkbox"
      ></input>
      <label htmlFor={props.id}>{props.caption}</label>
    </div>
  );
}

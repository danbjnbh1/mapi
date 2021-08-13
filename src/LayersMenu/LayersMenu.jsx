import React, { useEffect, useState } from 'react';
import LayerBox from '../LayerBox/LayerBox';
import layers from '../tests/layers';
import styles from './LayersMenu.module.scss';

export default function LayersMenu() {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState(layers);

  function hundleSearchChange(event) {
    setSearchKey(event.target.value);
  }

  useEffect(() => {
    if (searchKey === '') {
      setSearchResults(layers);
    } else {
      const results = layers.filter((layer) =>
        layer.caption.includes(searchKey)
      );
      setSearchResults(results);
    }
  }, [searchKey]);

  return (
    <div className={styles.layersMenu}>
      <h1>שכבות מידע</h1>
      <div className={styles.searchConteiner}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="חיפוש שכבה לפי שם"
          value={searchKey}
          onChange={hundleSearchChange}
        />
      </div>
      {searchResults.map((element, index) => {
        return (
          <LayerBox
            key={element.layer}
            id={element.layer}
            caption={element.caption}
          />
        );
      })}
    </div>
  );
}

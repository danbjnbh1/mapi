import React, { useEffect, useState } from 'react';
import LayerBox from '../LayerBox/LayerBox';
// import layers from '../tests/layers';
import styles from './LayersMenu.module.scss';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import axios from 'axios';

export default function LayersMenu(props) {
  const [layers, setLayers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState();

  // useEffect(() => {
  //   async function fetchLayers() {
  //     const { data } = await axios.get(
  //       'http://localhost:3001/getAdditionalLayers'
  //     );
  //     console.log(data);
  //     setLayers(data);
  //     }
  //   fetchLayers();
  // }, []);

  useEffect(() => {
    (async () => {
      const layers = [];
      const { data } = await axios.post(
        'https://ags.govmap.gov.il/Layers/GetAdditionalLayers',
        {
          Group: 0,
          LayersInToc: [],
        }
      );
      for (let layer in data.data.AdditionalLayers) {
        layers.push({
          layer,
          caption: data.data.AdditionalLayers[layer].caption,
          layerID: data.data.AdditionalLayers[layer].layerID,
        });
      }
      setLayers(layers);
    })();
  }, []);

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
  }, [layers, searchKey]);

  function hundleCheck(index) {
    props.setCheckedLayers((prev) => {
      const newCheckedArray = new Set(prev);
      if (newCheckedArray.has(index)) {
        newCheckedArray.delete(index);
      } else {
        newCheckedArray.add(index)
      }
      // newCheckedArray[index] = !newCheckedArray[index];
      return newCheckedArray;
    });
  }

  const Row = ({ index, style }) => {
    const element = searchResults[index];
    const layerIdx = layers.findIndex((e) => e.layer === element.layer);
    return (
      <div style={style}>
        <LayerBox
          hundleCheck={hundleCheck}
          checked={props.checkedLayers.has(layerIdx)}
          index={layerIdx}
          key={element.layer}
          id={element.layer}
          caption={element.caption}
        />
      </div>
    );
  };

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
      <div className={styles.listContainer}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              direction={'rtl'}
              itemCount={searchResults.length}
              itemSize={50}
              width={500}
              position={'static'}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

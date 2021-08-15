import React, { useEffect, useState } from 'react';
import LayerBox from '../LayerBox/LayerBox';
import styles from './LayersMenu.module.scss';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import axios from 'axios';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

export default function LayersMenu(props) {
  const [layers, setLayers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

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

  useEffect(() => {
    console.log('ernder');
  });

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
      const CheckedLayersClone = new Set(prev);
      if (CheckedLayersClone.has(index)) {
        CheckedLayersClone.delete(index);
      } else {
        CheckedLayersClone.add(index);
      }
      return CheckedLayersClone;
    });
  }

  function hundleOpenMenuClick() {
    setMenuIsOpen(!menuIsOpen);
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
    <>
      <Button class={styles.openMenuButton} onClick={hundleOpenMenuClick}>
        הוסף שכבות מידע
      </Button>

      <Zoom in={menuIsOpen}>
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
          <Button
            color="primary"
            onClick={() => props.setCheckedLayers(new Set())}
          >
            מחק את כל השכבות
          </Button>
          <label className={styles.sliderLabel} htmlFor="transparencySlider">שקיפות שכבות:</label>
          <Slider
            id="transparencySlider"
            defaultValue={0}
            step={10}
            marks
            min={0}
            max={100}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => props.setTransparency(value)}
          />
          <div className={styles.listContainer}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className="List"
                  height={height}
                  direction={'rtl'}
                  itemCount={searchResults.length}
                  itemSize={60}
                  width={width}
                  position={'static'}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>
      </Zoom>
    </>
  );
}

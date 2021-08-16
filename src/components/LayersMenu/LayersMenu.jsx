import React, { useEffect, useState } from 'react';
import { LayerBox } from '../LayerBox';
import styles from './LayersMenu.module.scss';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import axios from 'axios';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

const LayersMenu = (props) => {
  const [layers, setLayers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const extractLayersArray = (layersData) => {
    //takes all the necessary details from the layers object
    return layersData.map((layer) => ({
      layer: layer.layerName,
      caption: layer.caption,
      layerID: layer.layerID,
    }));
  };

  useEffect(() => {
    // fetch all layers from govmap
    (async () => {
      const { data } = await axios.post(
        'https://ags.govmap.gov.il/Layers/GetAdditionalLayers',
        {
          Group: 0,
          LayersInToc: [],
        }
      );
      let layers = extractLayersArray(
        Object.values(data.data.AdditionalLayers)
      );
      setLayers(layers);
    })();
  }, []);

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

  const handleSearchChange = (event) => {
    setSearchKey(event.target.value);
  };

  const handleCheck = (index) => {
    props.setCheckedLayers((prev) => {
      const CheckedLayersClone = new Set(prev);
      if (CheckedLayersClone.has(index)) {
        CheckedLayersClone.delete(index);
      } else {
        CheckedLayersClone.add(index);
      }
      return CheckedLayersClone;
    });
  };

  const handleOpenMenuClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const Row = ({ index, style }) => {
    const element = searchResults[index];
    return (
      <div style={style}>
        <LayerBox
          handleCheck={handleCheck}
          checked={props.checkedLayers.has(element.layerID)}
          key={element.layer}
          id={element.layerID}
          caption={element.caption}
        />
      </div>
    );
  };

  return (
    <>
      <button className={styles.openMenuButton} onClick={handleOpenMenuClick}>
        הוסף שכבות מידע
      </button>

      <Zoom in={menuIsOpen}>
        <div className={styles.layersMenu}>
          <h1>שכבות מידע</h1>
          <div className={styles.searchConteiner}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="חיפוש שכבה לפי שם"
              value={searchKey}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            color="primary"
            onClick={() => props.setCheckedLayers(new Set())}
          >
            מחק את כל השכבות
          </Button>
          <label className={styles.sliderLabel} htmlFor="transparencySlider">
            שקיפות שכבות:
          </label>
          <Slider
            id="transparencySlider"
            defaultValue={0}
            step={10}
            marks
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={(e, value) => props.setTransparency(value)}
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
};

export default LayersMenu;

import React from 'react';
import { Header, Breadcrumb, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NationalMap from './NationalMap';
import MapInfo from '../Map/mapInfo';

const NationalMapContainer = props => (
  <div>
    {!props.headerHid && (
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          left: 30,
          borderRadius: '25px',
          top: 80,
          width: 300,
          backgroundColor: 'white',
          padding: '20px',
          opacity: '0.8',
          borderColor: 'gray',
          borderStyle: 'solid',
          borderWidth: '0.5px',
        }}
      >
        {props.overlay.hoveredDem.votes === '' ? (
          <Header size="huge">
            President: 2016
            <Header.Subheader>
              Zoom in to see counties or out to see states. Click for details.
            </Header.Subheader>
          </Header>
        ) : (
          <div>
            <MapInfo />
          </div>
        )}
      </div>
    )}
    <NationalMap />
  </div>
);

const mapStateToProps = state => ({
  headerHid: state.maps.headerHid,
  overlay: state.maps.overlay,
});

export default connect(mapStateToProps)(NationalMapContainer);

import React from 'react';
import { connect } from 'react-redux';
import DesktopNav from '../components/Nav/DesktopNav';
import MobileNav from '../components/Nav/MobileNav';
import { setWindowWidth } from '../redux/actions/navActions';

class ResponsiveNav extends React.Component {
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.props.setWindowWidth(this.divElement.clientWidth);
  };

  render() {
    return (
      <div
        ref={divElement => (this.divElement = divElement)}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {this.props.windowWidth >= 768 ? (
          <DesktopNav>{this.props.children}</DesktopNav>
        ) : (
          <MobileNav>{this.props.children}</MobileNav>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setWindowWidth: windowWidth => dispatch(setWindowWidth(windowWidth)),
});

const mapStateToProps = state => ({
  windowWidth: state.nav.windowWidth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResponsiveNav);
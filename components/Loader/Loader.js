import {  Dimmer, Loader as Spinner } from 'semantic-ui-react';

const Loader = ({ loading }) => {
  return (
    <div style={{ height: '80vh' }}>
      <Dimmer inverted active={loading}>
        <Spinner active content="Loading" />
      </Dimmer>
    </div>
  );
};

export default Loader;

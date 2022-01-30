import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners/CircleLoader';

Loading.propTypes = {
    color: PropTypes.string,
    loading: PropTypes.bool,
};

Loading.defaultProps = {
    color: 'blue',
    loading: false,
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading(props) {
    console.log(props);
    const { color, loading } = props;

    return (
        <CircleLoader color={color} loading={loading} css={override} size={150} />
    );
}

export default Loading;
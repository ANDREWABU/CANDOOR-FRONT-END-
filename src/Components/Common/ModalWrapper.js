import React from 'react';
import * as PropTypes from 'prop-types';

const ModalWrapper = ({
  children,
  content = true,
  id = '',
  title = '',
  className = null,
  color = null,
  image = null,
}) => {
  return (
    <>
      <div class={`modal fade modal-d ${className}`} id={id}>
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" style={{ color: { color } }}>
                {image && (
                  <img
                    src={image}
                    class="img-fluid"
                    alt=""
                    style={{ marginRight: '10px' }}
                  />
                )}
                {title}
              </h4>
              {content && <>{children}</>}
              {!content && children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  content: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default ModalWrapper;
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function PreviewImage({ file = null, initialImg = null }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    try {
      const reader = new FileReader();
      if (file !== null) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreview(reader.result);
          }
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [file]);

  return (
    <>
      {preview !== null ? (
        <img
          src={preview}
          alt='Preview'
          style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '200px' }}
        />
      ) : initialImg === null ? (
        'Select Image for Preview '
      ) : (
        <>{initialImg}</>
      )}
    </>
  );
}

PreviewImage.propTypes = {
  file: PropTypes.any,
  initialImg: PropTypes.node,
};

export default PreviewImage;

import React from 'react';
import ModelWrapper from '../../../Components/Common/ModalWrapper';
import { useEffect, useState } from 'react';
import ApiRequest from '../../../Services/ApiRequest';

import moment from 'moment';


class ViewResume extends React.Component {
    render() {
    	  return (
		    <>
		      <ModelWrapper id='myModalResume'>
		        <div className='modal-body'>
			        <embed id='embedme' src='' type="application/pdf" width="100%" height="100%" />
		        </div>
		      </ModelWrapper>
		    </>
		  );
		}
}

export default ViewResume;
// export { ViewResume };

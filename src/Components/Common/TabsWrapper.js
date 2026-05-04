import * as PropTypes from 'prop-types';

const TabWrapper = ({
  content = true,
  id = '',
  modalTitle = '',
  tabContent = [],
}) => {
  const [form1, form2] = tabContent;
  return (
    <>
      <div className='modal fade modal-d' id={id}>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>{modalTitle}</h4>
            </div>
            <div class='modal-body'>
              <ul class='nav nav-tabs' role='tablist'>
                <li class='nav-item'>
                  <a class='nav-link active' data-toggle='tab' href='#addedu'>
                    Add Education Experience
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' data-toggle='tab' href='#addwork'>
                    Add Work Experience
                  </a>
                </li>
              </ul>
              <div class='tab-content'>
                <div id='addedu' class='tab-pane active'>
                  {content && form1}
                  {!content && form1}
                </div>

                <div id='addwork' class='tab-pane fade'>
                  {content && form2}
                  {!content && form2}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TabWrapper.propTypes = {
  content: PropTypes.bool,
  id: PropTypes.string,
  modalTitle: PropTypes.string,
  tabContent: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
};

export default TabWrapper;

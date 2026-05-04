import './DataLoading.css';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20rem',
};

function DataLoading() {
  return (
    <div style={styles}>
      <div className='borders'></div>
    </div>
  );
}

export default DataLoading;

import footerlogo from '../../assets/images/footerlogo.png';

function MainFooter() {
  return (
    <footer className='mainfooter  mar-width-0 footer-wrap'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='footer-logo'>
              <a href='#'>
                <img src={footerlogo} className='img-fluid' alt='' />
              </a>
              <p>Democratizing access to transformative careers</p>
            </div>
          </div>
          <div className='col-md-2'>
            <div className='footernav'>
              <h2>General</h2>
              <ul>
                <li>
                  <a href='#'>About</a>
                </li>
                <li>
                  <a href='#'>Partners</a>
                </li>
                <li>
                  <a href='#'>Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-2'>
            <div className='footernav'>
              <h2>Legal</h2>
              <ul>
                <li>
                  <a target='_blank' href='/termOfUse'>Terms of Use</a>
                </li>
                <li>
                  <a target='_blank'  href='/privacyPolicy'>Privacy Policy</a>
                </li>
                <li>
                  <a  
                 target='_blank' href='/codeOfConduct'>Code of Conduct</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='row copyrightrow'>
          <div className='col-md-12'>
            <div className='copyright'>
              <p>© 2022 Candoor. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;

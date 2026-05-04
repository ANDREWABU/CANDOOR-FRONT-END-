import React from 'react';
import { Link } from "react-router-dom";
import ApiRequest from "../../../Services/ApiRequest";
import PreviewImage from '../../../Components/Common/PreviewImage';
import myprofile from '../../../assets/images/myprofile.png';
import upload from '../../../assets/images/upload.png';
import CreatableSelect from 'react-select/creatable';
import notes from '../../../assets/images/memo_1f4dd.png';
import { toasterAlert as toastAlert } from '../../../Helpers/Functions';
import history from "../../../Utils/history";


const components = {
    DropdownIndicator: null,
};


class YourProfile extends React.Component {
    state = {
        image: null,
        tags_list: [],
        about_you: '',
        how_did_you_hear_about_us: '',
        consent_to_be_featured: true,
        errors: {
            image: '',
            tags_list: '',
            about_you: '',
            how_did_you_hear_about_us: '',
        },
        data: {
            hear_about_us: []
        },
    }

    componentDidMount() {
        this.fetchFormStaticData();
    }

    fetchFormStaticData = async () => {
        let response = await ApiRequest.getRequest('/api/submit-form-request');
        response = response.data;
        let data = this.state.data;
        if (response.result) {
            data.hear_about_us = response.result.here_about_us;
            this.setState(() => ({ data }));
        }
    }

    onChangeState = (event) => {
        const { name, value, checked, id } = event.target;
        this.setState({ [name]: value })
    }

    onTagsListChange = (event) => {
        this.setState({
            tags_list: event
        })
        console.log(this.state.tags_list)
    }

    consentToBeFeaturedChanged = () => {
        if (this.state.consent_to_be_featured == 0) {
            this.setState({
                consent_to_be_featured: 1
            })
        } else {
            this.setState({
                consent_to_be_featured: 0
            })
        }
    }

    changeStep = () => {
        history.push(
            `/advisor/signupwizard/background`
        );
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: event.target.files
            });
        }
    };

    submit = async () => {
        console.log(this.state)
        let { imageErrors, tagsErrors, about_youErrors, how_did_you_hear_about_us_Errors } = '';

        if (this.state.image == null) {
            imageErrors = 'Please upload a picture'
        }
        if (this.state.tags_list.length == 0) {
            tagsErrors = 'Please enter 5 tags that describe you!'
        }

        if (this.state.tags_list.length > 5) {
            tagsErrors = 'Please enter only 5 tags'
        }

        if (this.state.about_you == '') {
            about_youErrors = 'Please enter about you section'
        }
        if (this.state.how_did_you_hear_about_us == '') {
            how_did_you_hear_about_us_Errors = 'Please select an option from the drop down'
        }

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                image: imageErrors,
                tags_list: tagsErrors,
                about_you: about_youErrors,
                how_did_you_hear_about_us: how_did_you_hear_about_us_Errors,
            }
        }))


        console.log(this.state)

        if (imageErrors || tagsErrors || about_youErrors || how_did_you_hear_about_us_Errors) {
            return true;
        }

        const formData = new FormData();
        if (this.state.image !== null) {
            formData.append('profile_goal', this.state.image[0]);
        }
        formData.append('tags_list', JSON.stringify(this.state.tags_list.map((field) => field.value)));
        formData.append('about_me', this.state.about_you);
        formData.append('how_did_you_hear_about_us', this.state.how_did_you_hear_about_us);
        formData.append('consent_to_be_featured', this.state.consent_to_be_featured ? '1' : '0');

        console.log(formData)
        try {
            let response = await ApiRequest.postRequest(
                '/api/update-complete-profile',
                formData
            );
            if (
                response !== undefined &&
                response.status === 200 &&
                response.status !== 422
            ) {
                history.push(
                    `/advisor/signupwizard/welcome`
                );
                console.log('Success')
            } else if (response !== undefined && response.status === 422) {
                toastAlert('error', response.data.errors[0]);
            } else {
                toastAlert('error', 'Please upload a picture less than 2MB');
            }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (

            <div className={`row mar-width-0 mt-80 NewStepThird__Wrapper`}>
                <div className="col-md-12 text-center wizardHeading">
                    {/* <div></div> */}
                    <h2>Your Profile

                        <img
                            src={notes}
                            className="img-fluid signup-icons"
                            alt=""
                        />

                    </h2>
                    <p>
                        At Candoor, we’re all about candid conversations. Your profile helps Advisees get to know the human being behind your name!
                    </p>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='form-group inputDnD'>
                            <label className="label-custom-">
                                Profile Photo <span className='label-star'>*</span>
                            </label>
                            <div className='drag-sec'>
                                <div className='dragimg'>
                                    <PreviewImage
                                        file={this.state.image && this.state.image[0]}
                                        initialImg={
                                            <img
                                                style={{
                                                    'objectFit': 'cover'
                                                }}
                                                src={myprofile}
                                                className='img-fluid'
                                                alt=''
                                            />
                                        }
                                    />
                                </div>
                                <div className='dragdiv'>
                                    <input
                                        type='file'
                                        className='form-control-file text-primary font-weight-bold'
                                        accept='image/*'
                                        // onchange='readUrl(this)'
                                        data-title='Drag &amp; Drop here'
                                        onChange={this.onImageChange}
                                    />
                                    <img src={upload} className='img-fluid' alt='' />
                                    <h4>
                                        {this.state.image && (
                                            <>
                                                <span
                                                    style={{
                                                        margin: '2px',
                                                        fontSize: '0.75em',
                                                    }}
                                                >
                                                    {this.state.image && this.state.image[0]?.name}
                                                </span>
                                            </>
                                        )}
                                        <Link href='#'>Click to replace</Link> or drag and
                                        drop <span>SVG, PNG, JPG or GIF</span>
                                        <span className='text-danger'>Photo must be less than 2 MB</span>
                                        {this.state.errors.image && (
                                            <small className='text-danger'>
                                                {this.state.errors.image}
                                            </small>
                                        )}
                                    </h4>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div className='row'>
                    <div className='col-md-12'>
                        <div className='form-group tag-design'>
                            <label>
                                {/* Tags <span className='label-star'>*</span> */}
                            </label>
                            <div className='careerlabel'>
                                <b> 5 Tags that describe you </b> (e.g. female, first-generation, sustainability, software engineer, founder)
                            </div>

                            <CreatableSelect
                                components={components}
                                value={this.state.tags_list}
                                placeholder="Type here ..."
                                isMulti
                                isClearable
                                // menuIsOpen={true}
                                classNamePrefix='react-select-custom'
                                onChange={this.onTagsListChange}
                            />

                            {this.state.errors.tags_list && (
                                <small className='text-danger'>
                                    {this.state.errors.tags_list}
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='form-group'>

                            <div className='careerlabel'>
                                <b> About You </b> (your bio, written in the first-person. Tell Advisees who you are, what you’re passionate about and how you became who you are today! You can edit this in your profile at any time.)
                            </div>
                            <>
                                <textarea
                                    name='about_you'
                                    rows={9}
                                    class='form-control'
                                    onChange={this.onChangeState}
                                    maxLength={500}

                                    placeholder={'I’m a mission-driven product manager, mother and science fiction lover. I’m passionate about tech, education and DEI and have 4 years of experience in nonprofits and corporations including Teach for America, Oliver Wyman and Google. After starting my career in consulting, I pivoted to product management because I love solving problems for users at scale. I’m the first person in my family to have attended college, and I’m excited to pay it forward and champion your career!'}
                                ></textarea>
                                {this.state.errors.about_you && (
                                    <small className='text-danger'>
                                        {this.state.errors.about_you}
                                    </small>
                                )}
                                <div class='textlimit'>
                                    {this.state.about_you?.length}/{500}
                                </div>
                            </>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 form-inputs-">
                    <label htmlFor="">How did you hear about us?</label>
                    <select className="form-select" aria-label="Default select example" name="how_did_you_hear_about_us" onChange={this.onChangeState} value={this.state.how_hear_us}>
                        <option selected>Select ...</option>
                        {
                            this.state.data.hear_about_us.map((item, index) => (
                                <option value={item}>{item}</option>
                            ))
                        }
                    </select>
                    {this.state.errors.how_did_you_hear_about_us && (
                        <small className='text-danger'>
                            {this.state.errors.how_did_you_hear_about_us}
                        </small>
                    )}
                    {/* <span className="error">{this.state.errors.how_hear_us}</span> */}
                </div>

                <div className="col-md-12 NewStepThird-p1">
                    <div className=" agreeWrap agreeWrap2 mt-0">

                        <div className="mt-2 checkbox-new-advisor">
                            <input className="styled-checkbox" id="styled-checkbox-12" checked={this.state.consent_to_be_featured == 1} type="checkbox" value="value" name="consent_to_be_featured" onChange={this.consentToBeFeaturedChanged} />
                            <label htmlFor="styled-checkbox-12">
                                I consent to being featured in communications to relevant Advisees.
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <button className="btn btn-back-" onClick={(e) => {
                        e.preventDefault();
                        this.changeStep('back');
                    }}>Back</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-continue-" id="step_eight" disabled={this.state.loading} onClick={(e) => {
                        e.preventDefault();
                        this.submit();
                    }}>Submit</button>
                </div>
            </div>
        );
    }
}

export default YourProfile;

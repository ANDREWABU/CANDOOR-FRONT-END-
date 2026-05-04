import { Controller, useForm } from "react-hook-form";
import ModelWrapper from "../../../Components/Common/ModalWrapper";
import upload from "../../../assets/images/upload.png";
import myprofile from "../../../assets/images/myprofile.png";
import PreviewImage from "../../../Components/Common/PreviewImage";
import ApiRequest from "../../../Services/ApiRequest";
import { toasterAlert } from "../../../Helpers/Functions";
import CreatableSelect from "react-select/creatable";
import { selectOptions } from "../../../Helpers/UtilityFunctions";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";

const schema = yup
  .object({
    firstname: yup
      .string()
      .min(3, "First name should be at least 3 Characters or more")
      .required("Required"),
    lastname: yup.string().required("Required"),
    headline: yup.string().required("Required"),
    pronouns: yup.string().notRequired(),
    tags_list: yup
      .array()
      .max(5, "Tags cannot be more than 5.")
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .required("Required"),
  })
  .required("Required");

const BasicInfo = ({ user, advisorData, getInitialAdvisorData, isAdvisee }) => {
  const history = useHistory();
  const defaultOptions = selectOptions(advisorData?.tags_list);
  const defaultValues = {
    firstname: "",
    lastname: "",
    headline: "",
    profile_goal: "",
    uploaded_resume: "",
    cover_profile: "",
    pronouns: "",
    tags_list: [],
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode: "all",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    reset({
      firstname: user?.firstname,
      lastname: user?.lastname,
      headline: advisorData?.headline,
      profile_goal: advisorData?.profile_goal,
      cover_profile: advisorData?.cover_profile,
      pronouns: user?.pronouns ? user?.pronouns : "",
      tags_list: [...defaultOptions],
    });
  }, [user, advisorData]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        ...defaultValues,
      });
    }
  }, [defaultValues, isSubmitSuccessful, reset]);

  useEffect(() => {
    const subscription = watch((uploaded_resume, { name, type }) => {
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const profile = watch("profile_goal");
  const resume = watch("uploaded_resume");

  const submitBasicInfo = async (data) => {
    let formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === "cover_profile") {
        continue;
      }

      if (key === "profile_goal") {
        if (value[0].length) {
          formData.append(key, value);
        } else {
          formData.append(key, value[0]);
        }
      } else if (key === "tags_list") {
        formData.append(key, JSON.stringify(value.map((field) => field.value)));
      } else if (key === "uploaded_resume") {
        formData.append("resume", value[0]);
      } else {
        formData.append(key, value);
      }
    }

    let response;

    try {
      if (isAdvisee) {
        response = await ApiRequest.postRequest(
          "/api/user-update-basic-info",
          formData
        );
      } else {
        response = await ApiRequest.postRequest(
          "/api/advisor-update-basic-info",
          formData
        );
      }

      if (
        response !== undefined &&
        response.status === 200 &&
        response.status !== 422
      ) {
        if (isSubmitSuccessful) {
          reset({ defaultValues });
        }

        toasterAlert("success", "Basic Information has been Updated!");

        await getInitialAdvisorData();

        document.getElementById("cancelBtn").click();
        history.go();
      } else if (response !== undefined && response.status === 422) {
        toasterAlert("error", response.data.errors[0]);
      } else {
        toasterAlert(
          "error",
          "Something went wrong please try again! Or Upload Image less than 2MB."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ModelWrapper title="Profile" id="myModal">
        <form onSubmit={handleSubmit(submitBasicInfo)}>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="firstname">
                    First name <span className="label-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    placeholder="First Name"
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <small className="text-danger">
                      {errors.firstname.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Last name <span className="label-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Sharma"
                    name="lastname"
                    {...register("lastname")}
                  />
                  {errors.lastname && (
                    <small className="text-danger">
                      {errors.lastname.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="pronouns">Pronouns</label>
                  <input
                    type="text"
                    name="pronouns"
                    className="form-control"
                    placeholder="E.g. She/Her/Her's ..."
                    {...register("pronouns")}
                  />
                  {errors.pronouns && (
                    <small className="text-danger">
                      {errors.pronouns.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="headline">
                    Headline <span className="label-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="headline"
                    className="form-control"
                    placeholder="X student at Y University / Job Title at Company Name"
                    {...register("headline", {
                      required: "Required",
                    })}
                  />
                  {errors.headline && (
                    <small className="text-danger">
                      {errors.headline.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group tag-design">
                  <label htmlFor="tags_list">
                    Tags <span className="label-star">*</span>
                  </label>
                  <div id="output"></div>
                  <Controller
                    name="tags_list"
                    control={control}
                    render={({ field }) => (
                      <CreatableSelect
                        isMulti
                        isClearable
                        classNamePrefix="react-select-custom"
                        options={[...defaultOptions]}
                        {...field}
                      />
                    )}
                  />
                  {errors.tags_list && (
                    <small className="text-danger">
                      {errors.tags_list.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group inputDnD">
                  <label>
                    Profile Photo
                    <span className="label-star">*</span>
                    <div>
                      <span className="label-star">Photo must be &lt;2MB</span>
                    </div>
                  </label>
                  <div className="drag-sec">
                    <div className="dragimg">
                      {profile && (
                        <PreviewImage
                          file={profile && profile[0]}
                          initialImg={
                            <img
                              style={{
                                objectFit: "cover",
                              }}
                              src={
                                advisorData?.profile_goal !== null
                                  ? process.env.REACT_APP_API_URL +
                                    `/${advisorData?.profile_goal}`
                                  : myprofile
                              }
                              className="img-fluid"
                              alt=""
                            />
                          }
                        />
                      )}
                    </div>
                    <div className="dragdiv">
                      <input
                        type="file"
                        className="form-control-file text-primary font-weight-bold"
                        accept="image/*"
                        data-title="Drag & Drop here"
                        {...register("profile_goal")}
                      />
                      <img src={upload} className="img-fluid" alt="" />
                      <h4>
                        {profile !== null && (
                          <>
                            <span style={{ margin: "2px", fontSize: "0.75em" }}>
                              {profile && profile[0]?.name}
                            </span>
                          </>
                        )}
                        <a href="#">Click to replace</a> or drag and drop
                        <span>SVG, PNG, JPG or GIF (2 MB Max)</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {errors.profile_goal && (
              <small className="text-danger">
                {errors.profile_goal.message}
              </small>
            )}

            {isAdvisee ? (
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group inputDnD resume">
                    <label>
                      Resume <span className="label-star"></span>
                    </label>
                    <div className="drag-sec">
                      <div className="dragdiv">
                        <input
                          type="file"
                          name="resumeImage"
                          className="form-control-file text-primary font-weight-bold"
                          id="inputFile"
                          accept="application/pdf"
                          {...register("uploaded_resume")}
                          data-title="Drag & Drop here"
                        />

                        <img src={upload} className="img-fluid" alt="" />
                        <h4>
                          <a href="#">Click to upload</a> or drag and drop
                          <span>PDF, DOC or DOCX (5 MB max)</span>
                        </h4>
                      </div>

                      <a id="link" download>
                        {" "}
                        {resume ? resume[0]?.name : ""}{" "}
                        {resume ? (
                          <i className="fa fa-download" aria-hidden="true">
                            {" "}
                          </i>
                        ) : (
                          ""
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div className="row">
              <div className="col-md-12">
                <div className="location-edit">
                  <p>
                    To edit your location or timezone, go to{" "}
                    <Link
                      to="/advisor/setting"
                      onClick={() =>
                        document.getElementById("cancelBtn").click()
                      }
                    >
                      Settings
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="modal-footer-btn">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-info btn-cancel"
                    data-dismiss="modal"
                    id="cancelBtn"
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="btn btn-info">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModelWrapper>
    </div>
  );
};

export default BasicInfo;

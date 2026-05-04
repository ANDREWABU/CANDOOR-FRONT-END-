// Third-Party Packages Imports 👇
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CreatableSelect from "react-select/creatable";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

// import './onboarding.css';

// Custom hooks 👇
import useFetchData from "../../../hooks/useFetchData";

// Project Imports 👇
import DataLoading from "../../../Utils/DataLoading/DataLoading";
import DataError from "../../../Utils/DataError";
import { destroySession, toasterAlert } from "../../../Helpers/Functions";
import Header from "../../../Components/Layouts/AdviseeLayout/Header";
import { selectOptions } from "../../../Helpers/UtilityFunctions";
import editimg from "../../../assets/images/edit.png";
import myprofile from "../../../assets/images/myprofile.png";
import upload from "../../../assets/images/upload.png";
import ApiRequest from "../../../Services/ApiRequest";
import PreviewImage from "../../../Components/Common/PreviewImage";
import { TextareaWithCount } from "../../../Components/Common/TextareaWithCount";

const schema = yup.object().shape(
  {
    headline: yup
      .string()
      .min(0, "Please enter more than two words")
      .required(),
    about_me: yup
      .string()
      .min(0, "More Than 2 Characters")
      .max(500, "Please enter less than 500 characters")
      .required(),
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
    current_career_goals: yup
      .string()
      .min(0, "More Than 2 Characters")
      .max(500, "less than 500 Characters")
      .required(),
  },
  [["profile_goal", "profile_goal"]]
);

const defaultValues = {
  headline: "",
  about_me: "",
  tags_list: [],
  profile_goal: "",
  current_career_goals: "",
};

const CompleteProfile = () => {
  const { data, isSuccess, isError, isLoading } = useFetchData({
    queryKey: ["CompleteProfileData", "advisee"],
    url: "/api/complete-profile",
  });
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });
  const profile = watch("profile_goal");

  useEffect(() => {
    if (isSuccess) {
      const {
        completeProfileData: {
          headline,
          about_me,
          profile_goal,
          current_career_goals,
          tags_list,
        },
      } = data.data;
      const options = selectOptions(JSON.parse(tags_list));
      reset({
        headline,
        about_me,
        profile_goal,
        current_career_goals,
        tags_list: options,
      });
    }
  }, [isSuccess, data, reset]);

  const postData = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === "profile_goal") {
        if (value !== null) {
          if (typeof value !== "string") formData.append(key, value[0]);
        }
      } else if (key === "tags_list") {
        formData.append(key, JSON.stringify(value.map((field) => field.value)));
      } else {
        formData.append(key, value);
      }
    }

    try {
      const response = await ApiRequest.postRequest(
        "/api/update-complete-profile",
        formData
      ).then((response) => {
        console.log(response);
        if (response.status == 200) {
          toasterAlert("success", "Request has been processed!");
          if (isSubmitSuccessful) reset({ defaultValues });
          history.push("/advisee/dashboard");
        }

        if (
          response.status == 400 &&
          response.data.includes("exceeds the limit")
        ) {
          toasterAlert("error", "Image size must be less than 2MB");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { mutateAsync: onSubmit } = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["CompleteProfileData", "advisee"]);
    },
  });

  const Loading = isLoading && <DataLoading />;
  const Error = isError && <DataError />;

  return (
    <>
      <Header />
      {Loading || Error || (
        <>
          <section className="topbg profilebg">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="topbg-left">
                    <h2>
                      Complete Your Profile
                      <img src={editimg} className="img-fluid" alt="" />
                    </h2>
                    <p>Expected Time to Completion: 4 min.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="profile-onboarding">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-onboarding-edit form-design">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>
                              Headline <span className="label-star">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="headline"
                              autoComplete="off"
                              {...register("headline", {
                                required: "Required",
                              })}
                              placeholder="Type here...."
                            />
                            <span className="error">
                              {errors.headline && (
                                <small className="text-danger">
                                  {errors.headline.message}
                                </small>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group inputDnD">
                            <label>
                              Profile Photo (Optional) {" "}
                              {/* <span className="label-star">*</span> */}
                              <div>
                                {/* <span className="label-star">
                                  Photo must be &lt;2MB
                                </span> */}
                              </div>
                            </label>
                            <div className="drag-sec">
                              <div className="dragimg">
                                {profile == null ? (
                                  <img
                                    style={{
                                      objectFit: "cover",
                                    }}
                                    src={myprofile}
                                    className="img-fluid"
                                    alt=""
                                  />
                                ) : (
                                  <PreviewImage
                                    file={profile && profile[0]}
                                    initialImg={
                                      profile instanceof File || (
                                        <img
                                          style={{
                                            objectFit: "cover",
                                          }}
                                          src={
                                            process.env.REACT_APP_API_URL +
                                            `/${profile}`
                                          }
                                          className="img-fluid"
                                          alt=""
                                        />
                                      )
                                    }
                                  />
                                )}
                              </div>
                              <div className="dragdiv">
                                <input
                                  type="file"
                                  name="profile_goal"
                                  className="form-control-file text-primary font-weight-bold"
                                  accept="image/*"
                                  {...register("profile_goal", {
                                    required: "Required",
                                  })}
                                  data-title="Drag &amp; Drop here"
                                />
                                <img
                                  src={upload}
                                  className="img-fluid"
                                  alt=""
                                />
                                <h4>
                                  <>
                                    {profile && (
                                      <span
                                        style={{
                                          fontSize: "1em",
                                        }}
                                      >
                                        {profile && profile[0]?.name}
                                      </span>
                                    )}
                                  </>
                                  <Link href="#">Click to replace</Link> or drag
                                  and drop{" "}
                                  <span>
                                    SVG, PNG, JPG or GIF{" "}
                                    <strong>(Max: 2MB)</strong>
                                  </span>
                                  {errors.profile_goal && (
                                    <small className="text-danger">
                                      {errors.profile_goal.message}
                                    </small>
                                  )}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group tag-design">
                            <label>
                              Tags <span className="label-star">*</span>
                            </label>
                            <div className="careerlabel">
                              If you had to choose 5 words that describe your
                              ideal career path, what would they be? Add up to 5
                              profile tags (e.g. fintech, product,
                              entrepreneurship, female, first-generation,
                              Latinx) so Advisors know what you’re all about!
                            </div>
                            <Controller
                              name="tags_list"
                              control={control}
                              render={({ field }) => (
                                <CreatableSelect
                                  isMulti
                                  isClearable
                                  classNamePrefix="react-select-custom"
                                  {...field}
                                />
                              )}
                            />
                            <span className="error">
                              {errors.tags_list && (
                                <small className="text-danger">
                                  {errors.tags_list.message}
                                </small>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <TextareaWithCount
                              name="about_me"
                              id="comment"
                              defaultLength={getValues("about_me")?.length}
                              careerlabel="Your bio, written in the first-person. If you’re not
                          sure where to start, check out the examples below!"
                              label="About Me"
                              maxLength={500}
                              placeholder="Type here..."
                              {...register("about_me", {
                                required: "Required",
                              })}
                              error={
                                <>
                                  {errors.about_me && (
                                    <small className="text-danger">
                                      {errors.about_me.message}
                                    </small>
                                  )}
                                </>
                              }
                            ></TextareaWithCount>

                            <div className="flx">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <TextareaWithCount
                              label="Career Interests"
                              defaultLength={
                                getValues("current_career_goals")?.length
                              }
                              careerlabel=" What are your career interests or goals for the next
                          3-5 years?"
                              name="current_career_goals"
                              id="comment"
                              placeholder="[current_career_goals]"
                              maxLength={500}
                              error={
                                <>
                                  {errors.current_career_goals && (
                                    <small className="text-danger">
                                      {errors.current_career_goals.message}
                                    </small>
                                  )}
                                </>
                              }
                              {...register("current_career_goals")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group ondoarding-btn">
                            <button type="submit" className="btn btn-info">
                              Save and Publish
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </>
      )}
    </>
  );
};

export default CompleteProfile;

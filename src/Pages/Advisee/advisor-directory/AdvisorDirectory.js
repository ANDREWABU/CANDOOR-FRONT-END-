import CustomSelect from '../../../Components/Common/CustomSelect';
import Header from '../../../Components/Layouts/AdviseeLayout/Header';
import useFetchData from '../../../hooks/useFetchData';

import advisors5 from '../../../assets/images/advisors5.png';
import myprofile2 from '../../../assets/images/myprofile2.png';
import myprofile from '../../../assets/images/myprofile.png';
import advisors1 from '../../../assets/images/advisors1.png';
import advisors8 from '../../../assets/images/advisors7.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DataLoading from '../../../Utils/DataLoading/DataLoading';
import DataError from '../../../Utils/DataError';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import MainFooter from '../../../Components/Layouts/MainFooter';

const PageSize = 5;

const useAdvisorList = () => {
  return useFetchData({
    queryKey: ['Advisor List'],
    url: '/api/get-advisor-list',
    options: {
      select: (data) => data?.data?.result,
    },
  });
};

const useFilterAdvisorList = (apiParam = {}) => {
  for (const key in apiParam) {
    <>
      { apiParam[key] === '[]' || apiParam[key] === []
        ? delete apiParam[key]
        : apiParam[key]
      }
    </>;
  }
  // console.log(changeArray(apiParam));

  const isEmpty = (obj) =>
    Object.values(obj).every(
      (x) => x === null || x === '' || x === '[]' || x === undefined
    );

  return useFetchData({
    queryKey: ['Advisor List', { ...apiParam }],
    url: '/api/get-advisor-list',
    axiosOptions: {
      params: { ...apiParam },
    },
    enabled: !isEmpty(apiParam),
    options: {
      select: (data) => data?.data?.result,
    },
  });
};

const usePagination = (originalResponse = null) => {
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [itemsLength, setItemsLength] = useState(0);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // originalResponse?.data?.sort((a, b) => parseFloat(b.AdvisorID) - parseFloat(a.AdvisorID));


  useEffect(() => {
    const endOffset = itemOffset + PageSize;

    // Fetch items from nother resources.

    setCurrentItems(originalResponse?.data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(originalResponse?.count / PageSize));

    setItemsLength(originalResponse?.count);
  }, [itemOffset, originalResponse?.data, originalResponse?.count]);

  return {
    itemOffset,
    pageCount,
    currentItems,
    itemsLength,

    setItemOffset,
    setPageCount,
    setCurrentItems,
    setItemsLength,
  };
};

const useFilterItems = ({
  filteredResponse = null,
  setPageCount,
  setCurrentItems,
  setItemsLength,

  result,
}) => {
  const [filtered, setFiltered] = useState(false);
  const { itemOffset, setItemOffset } = usePagination();
  const endOffset = itemOffset + PageSize;

  const pageHandler = (event) => {
    const newOffset = (event.selected * PageSize) % result?.count;

    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);

    setCurrentItems(filteredResponse?.data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredResponse?.count / PageSize));
    setItemsLength(filteredResponse?.count);
    window.scrollTo({ top: 0 });
    setFiltered(true);
  };
  useEffect(() => {
    if (filteredResponse) {
      setCurrentItems(filteredResponse?.data?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredResponse?.count / PageSize));
      setItemsLength(filteredResponse?.count);
      window.scrollTo({ top: 0 });
      setFiltered(true);
    } else {
      setCurrentItems(result?.data?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(result?.count / PageSize));
      setItemsLength(result?.count);
      window.scrollTo({ top: 0 });
    }
  }, [
    endOffset,
    filteredResponse,
    filteredResponse?.count,
    filteredResponse?.data,
    itemOffset,
    result?.count,
    result?.data,
    setCurrentItems,
    setItemOffset,
    setItemsLength,
    setPageCount,
  ]);

  return { filtered, pageHandler };
};


function AdvisorDirectory() {
  const { watch, reset, control } = useForm({
    defaultValues: {
      industry: '',
      roles: '',
      company: '',
      services: '',
    },
  });
  const { data: result, isLoading, isError } = useAdvisorList();
  const { data: filterOptionsData, isSuccess } = useFetchData({
    queryKey: 'Filter Options',
    url: '/api/get-filter-data',
  });

  //Sort


  const {
    pageCount,
    currentItems,
    itemsLength,
    setPageCount,
    setCurrentItems,
    setItemsLength,
  } = usePagination(result);

  const industry = watch('industry');
  const company = watch('company');
  const role = watch('roles');
  const services = watch('services');
  const schools = watch('schools');
  // console.log(industry.value);
  // console.log(role);
  // currentItems = []
  //Randomize list
  // currentItems?.sort(() => Math.random() - 0.5)


  const {
    data: filteredData,
    isError: isFilteringError,
    isLoading: isFilteringLoading,
  } = useFilterAdvisorList({
    industry: industry
      ? JSON.stringify(industry?.map((field) => field.value))
      : undefined,
    role: role ? JSON.stringify(role?.map((field) => field.value)) : undefined,
    company: company
      ? JSON.stringify(company?.map((field) => field.value))
      : undefined,
    services: services
      ? JSON.stringify(services?.map((field) => field.value))
      : undefined,
    school: schools
      ? JSON.stringify(schools?.map((field) => field.value))
      : undefined,
    // services: services?.value && `["${services?.value}"]`,
  });
  // Filter Items Based
  const { pageHandler } = useFilterItems({
    filteredResponse: filteredData,
    setPageCount,
    setCurrentItems,
    setItemsLength,
    result,
  });

  let options = {};
  if (isSuccess) {
    options = { ...filterOptionsData?.data?.result };
  }

  // const pageHandler = (event) => {
  //   const newOffset = (event.selected * PageSize) % result?.count;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  const Loading = isLoading && <DataLoading />;
  const Error = isError && <DataError />;
  const filterError = isFilteringError && <DataError />;
  const filterLoading = isFilteringLoading && <DataLoading />;
  console.log(currentItems);

  return (
    <>
      <Header />
      <section className="booking">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-heading">
                <h2>Find an Advisor</h2>
              </div>
            </div>
          </div>

          {Loading || Error || (
            <>
              <div className="row">
                <div className="col-md-12">
                  <div className="booking-searchbox">
                    <div className="searchbox-select">
                      <div className="form-group form-inputs-search">
                        <CustomSelect
                          name="industry"
                          control={control}
                          optionsArr={options?.Industries}
                          placeholder="Select Industry"
                        />
                      </div>
                      <div className="form-group form-inputs-search">
                        <CustomSelect
                          name="company"
                          control={control}
                          optionsArr={options?.Companies}
                          placeholder="Select Company"
                        />
                      </div>
                      <div className="form-group form-inputs-search">
                        <CustomSelect
                          name="roles"
                          control={control}
                          optionsArr={options?.WorkRoles}
                          placeholder="Select Role"
                        />
                      </div>
                      <div className="form-group form-inputs-search">
                        <CustomSelect
                          name="services"
                          control={control}
                          optionsArr={options?.MeetingTypes}
                          placeholder="Select Service"
                        />
                      </div>
                      <div className="form-group form-inputs-search">
                        <CustomSelect
                          name="schools"
                          control={control}
                          optionsArr={options?.Schools}
                          placeholder="University"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="advisors-display">
                    <h6>
                      {itemsLength === result.count
                        ? itemsLength
                        : itemsLength > 5
                          ? '5'
                          : itemsLength}{' '}
                      out of{' '}
                      {itemsLength === result.count
                        ? result.count
                        : itemsLength}{' '}
                      Advisors{' '}
                      <span className="clearall">
                        <Link to="#" onClick={() => reset()}>
                          Clear all filters
                        </Link>
                      </span>
                    </h6>

                    {filterError ||
                      filterLoading ||
                      (itemsLength > 0 ? (
                        currentItems?.map((advisor) => (
                          <Link
                            to={`/advisor/${advisor.AdvisorID}`}
                          >
                            <div className="advisors-displaylist">
                              <div className="advisors-display-img">
                                <div className="advisors-display-img-card">
                                  <img
                                    src={
                                      advisor.profile_goal
                                        ? process.env.REACT_APP_API_URL + `/${advisor.profile_goal}`
                                        : myprofile
                                    }
                                    style={{ borderRadius: '100%' }}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </div>
                                <Link
                                  // onClick={() => {
                                  //   console.log('YA')
                                  // }}
                                  to={`/advisee/request-meeting/${advisor.AdvisorID}`}
                                  className={
                                    advisor.monthly_capacity_remaining > 0
                                      ? `btn btn-info`
                                      : `btn btn-info disabled`
                                  }
                                >
                                  Request to Meet
                                </Link>
                                {
                                  advisor.monthly_capacity_remaining < 1
                                    ?
                                    <div className="careerlabel">This advisor is not currently available.</div>
                                    : ``
                                }
                              </div>
                              <div className="advisors-display-desc">
                                <Link
                                  // to={`/advisee/request-meeting/${advisor.id}`}
                                  to={`/advisor/${advisor.AdvisorID}`}
                                >
                                  <h2>
                                    {advisor.firstname} {advisor.lastname}{' '}
                                    <span>
                                      {advisor.pronouns
                                        ? `(${advisor.pronouns})`
                                        : null}
                                    </span>
                                  </h2>
                                  <h5>{advisor.headline}</h5>
                                  <div className="tag-d">
                                    {JSON.parse(advisor.tags_list)?.map(
                                      (tag) => (
                                        <span>{tag}</span>
                                      )
                                    )}
                                  </div>
                                  <p>{advisor.about_me}</p>
                                  <div style={{ height: '10px' }}></div>
                                  {advisor.help ? <p><strong>How I Can Help: </strong>{advisor.help}</p> : <></>}

                                </Link>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <>
                          <h4 className="fw-bolder .text-muted text-center">
                            We don’t have Advisors with that experience yet.
                            We’re working on it!
                          </h4>
                        </>
                      ))}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="paginationdiv">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel={
                        <>
                          Next
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.16669 7.00008H12.8334M12.8334 7.00008L7.00002 1.16675M12.8334 7.00008L7.00002 12.8334"
                              stroke="#344054"
                              stroke-width="1.67"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </>
                      }
                      onPageChange={(e) => pageHandler(e)}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel={
                        <>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.8334 7.00008H1.16669M1.16669 7.00008L7.00002 12.8334M1.16669 7.00008L7.00002 1.16675"
                              stroke="#344054"
                              stroke-width="1.67"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Previous
                        </>
                      }
                      renderOnZeroPageCount={null}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      activeClassName="active"
                      className="pagination"
                      previousLinkClassName="page-link"
                      nextLinkClassName="page-link"
                      previousClassName="page-item previous"
                      nextClassName="page-item next"
                      breakClassName="break page-item"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <MainFooter />
    </>
  );
}

export default AdvisorDirectory;

import Dashboard from "../../Dashboard";
import AmenitiesAdd from "./AmenitiesAdd"
import TableData from "./TableData";



const index = ({meta}) => {
  return (
    <>
      {/* <!-- Our Dashbord --> */}
      <section
        className="our-dashbord dashbord bgc-f7 pb50"
        style={{ background: "#F7F7F7" }}
      >
        <div className="container-fluid ovh"> 
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                {/* <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div> */}
                {/* End Dashboard Navigation */}

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    {/* <h3
                      className="breadcrumb_title"
                      style={{ fontSize: "29px" }}
                    >
                      {" "}
                      {meta?.title}
                    </h3> */}
                    {/* <p>We are glad to see you again!</p> */}
                  </div>
                </div>
                {/* End .col */}
                {/* <Dashboard /> */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <AmenitiesAdd />
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <TableData />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}

              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;

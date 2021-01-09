import React from "react";

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://d2qn8jbm9065yh.cloudfront.net/wp-content/uploads/2019/05/Hide-Your-Pain-Harold-1024x576.jpg"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Please Help</h1>
            <p>
                The elderly people are more susceptible to the COVID-19 virus and represent the majority of deaths that have occured due to the virus. Furthermore, ventilators and ICU beds in the hospital are considered scarce medical resources and may need to be rationed. Therefore, with the surge in COVID-19 cases, it is likely that the elderly will be excluded from gaining access to these scarce medical resources because they are less likely to survive even if they are given these scarce medical resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
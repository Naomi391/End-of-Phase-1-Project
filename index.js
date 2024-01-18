function contractors() {
  document.addEventListener("DOMContentLoaded", function () {
    const approvedContractorsLink = document.getElementById(
      "approvedContractorsLink"
    );

    const servicesLink = document.getElementById("servicesLink");

    const newsLink = document.getElementById("newsLink");

    const ourcompanyLink = document.getElementById("ourcompanyLink");

    approvedContractorsLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "contractors.html";
    });

    servicesLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "services.html";
    });

    newsLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "news.html";
    });

    if (window.location.pathname.includes("contractors.html")) {
      contractorsFetch();
    }

    if (window.location.pathname.includes("services.html")) {
      servicesFetch();
    }

    if (window.location.pathname.includes("news.html")) {
      getNews();
    }

    function contractorsFetch() {
      fetch("http://localhost:3000/contractors", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "Cache-control": "no-cache",
        },
      })
        .then((res) => res.json())
        .then((contractors) => {
          const container = document.getElementById("container");

          container.innerHTML = "";

          contractors.forEach((contractor) => {
            const card = document.createElement("div");

            card.innerHTML = `
            
              <div class="contractorCard">
                <div class="profile_pic">
                  <img src="${contractor.profile_pic}">
                </div>
                <div class="contractorInfo">
                  <h3>Name : ${contractor.name}</h3>
                  <p>Company name : ${contractor.company_name}</p>
                  <p>License number : ${contractor.license_number}</p>
                  <p>NCA Approval Number : ${contractor.NCA_approval}</p>
                  <p>NEMA Approval Number : ${contractor.NEMA_approval}</p>
                  <p>EBK Registration number : ${contractor.EBK_registration}</p>
                  <button class="viewButton">View portfolio</button>
                </div>
              </div>
            `;
            const viewPortfolio = card.querySelector(".viewButton");
            viewPortfolio.addEventListener("click", () => {
              alert(`Viewing portfolio for : ${contractor.name}`);
            });

            container.appendChild(card);
          });
        });
    }

    function servicesFetch() {
      const pendingApprovalsContainer =
        document.getElementById("pending_approvals");

      const verificationTickImageSrc = "images/verTick.png";

      const verificationSteps = [
        "Pending Documentation",
        "Pending NCA Approval",
        "Pending NEMA Approval",
        "Pending Police Clearance",
        "Pending KRA PIN",
      ];

      const pendingApprovals = [
        {
          name: "Liam Contractors",
          reasons: [
            { step: "Pending Documentation", verified: true },
            { step: "Pending NCA Approval", verified: true },
            { step: "Pending NEMA Approval", verified: true },
            { step: "Pending Police Clearance", verified: true },
            { step: "Pending KRA PIN", verified: false },
          ],
        },
        {
          name: "Crawford Contractors",
          reasons: [
            { step: "Pending Documentation", verified: true },
            { step: "Pending NCA Approval", verified: true },
            { step: "Pending NEMA Approval", verified: true },
            { step: "Pending Police Clearance", verified: true },
            { step: "Pending KRA PIN", verified: false },
          ],
        },
        {
          name: "Jay Contractors",
          reasons: [
            { step: "Pending Documentation", verified: true },
            { step: "Pending NCA Approval", verified: true },
            { step: "Pending NEMA Approval", verified: true },
            { step: "Pending Police Clearance", verified: false },
            { step: "Pending KRA PIN", verified: false },
          ],
        },

        {
          name: "Lawson Contractors",
          reasons: [
            { step: "Pending Documentation", verified: true },
            { step: "Pending NCA Approval", verified: true },
            { step: "Pending NEMA Approval", verified: false },
            { step: "Pending Police Clearance", verified: false },
            { step: "Pending KRA PIN", verified: false },
          ],
        },
        {
          name: "Crater Builders",
          reasons: [
            { step: "Pending Documentation", verified: true },
            { step: "Pending NCA Approval", verified: false },
            { step: "Pending NEMA Approval", verified: false },
            { step: "Pending Police Clearance", verified: false },
            { step: "Pending KRA PIN", verified: false },
          ],
        },
      ];

      pendingApprovalsContainer.innerHTML =
        "<h2 class='pendingApp'>Pending Approvals</h2>";

      pendingApprovals.forEach((approval) => {
        const approvalCard = document.createElement("div");

        approvalCard.innerHTML = `
          <div class="approvalCard">
            <h3>Name : ${approval.name}</h3>
            <div class="verificationSteps">
              ${generateVerificationSteps(
                approval.reasons,
                verificationSteps,
                verificationTickImageSrc
              )}
            </div>
          </div>
        `;

        const verifiedStepsCount = approval.reasons.filter(
          (reason) => reason.verified
        ).length;
        if (verifiedStepsCount > 3) {
          const almostVerifiedMessage = document.createElement("p");
          almostVerifiedMessage.textContent =
            "Your company is almost verified ! Hang in there !";
          almostVerifiedMessage.classList.add("almostVerified");
          approvalCard.appendChild(almostVerifiedMessage);
        }
        pendingApprovalsContainer.appendChild(approvalCard);
      });
    }

    function generateVerificationSteps(
      reasons,
      verificationSteps,
      verificationTickImageSrc
    ) {
      return reasons
        .map(
          (reason) => `
            <div class="verificationStep ${
              reason.verified ? "verified" : "unverified"
            }">
              ${
                reason.verified
                  ? `<img src="${verificationTickImageSrc}" alt="Verified">`
                  : ""
              }
            </div>
            <p>${reason.step}</p>`
        )
        .join("");
    }

    function getNews() {
      apikey = "100968497a4a68f13d2876ae759178e9";
      url =
        "https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=" +
        apikey;

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const articles = data.articles;

          const newsContainer = document.getElementById("container");
          newsContainer.innerHTML = "";

          articles.forEach((article) => {
            const card = document.createElement("div");

            card.innerHTML = `
            <div class="newsCard">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            </div>
            `;
            newsContainer.appendChild(card);
          });
        });
    }
  });
}
contractors();

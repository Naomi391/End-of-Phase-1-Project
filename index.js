document.addEventListener("DOMContentLoaded", function () {
  const approvedContractorsLink = document.getElementById(
    "approvedContractorsLink"
  );

  const servicesLink = document.getElementById("servicesLink");

  approvedContractorsLink.addEventListener("click", function (event) {
    event.preventDefault();
    contractorsFetch();
  });

  servicesLink.addEventListener("click", function (event) {
    event.preventDefault();
    servicesFetch();
  });

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
        let container = document.getElementById("container");

        container.innerHTML = "";

        contractors.forEach((contractor) => {
          const card = document.createElement("div");

          card.innerHTML = `
            <div class="contractorCard">
              <div class="profile_pic">
                <img src=${contractor.profile_pic}>
              </div>
              <div class="contractorInfo">
                <h3>Name : ${contractor.name}</h3>
                <p>Company name : ${contractor.company_name}</p>
                <p>License number : ${contractor.license_number}</p>
                <p>NCA Approval Number : ${contractor.NCA_approval}</p>
                <p>NEMA Approval Number : ${contractor.NEMA_approval}</p>
                <p>EBK Registration number : ${contractor.EBK_registration}</p>
              </div>
            </div>
          `;
          container.appendChild(card);
        });
      });
  }

  function servicesFetch() {
    const pendingApprovalsContainer =
      document.getElementById("pending_approvals");

    const pendingApprovals = [
      { name: "Lawson Contractors", reason: "Pending documentation" },
      { name: "Crater Builders", reason: "Pending NCA Approval" },
    ];

    pendingApprovalsContainer.innerHTML = "<h2>Pending Approvals</h2>";

    pendingApprovals.forEach((approval) => {
      const approvalCard = document.createElement("div");

      approvalCard.innerHTML = `
      <div class="approvalCard">
      <h3>Name : ${approval.name}</h3>
      <p> Reason : ${approval.reason} </p>
      </div>
      `;
      pendingApprovalsContainer.appendChild(approvalCard);
    });
  }
});

import { useState } from "react";
import "./ApplicantPage.css";

export default function ApplicantPage() {
  // Always show Ramesh's data
  const data = {
    applicantName: "Ramesh",
    documents: [
      { name: "Claim Form", url: "/docs/claim_form.pdf", timestamp: 1710000000 },
      { name: "Identity Proof (Aadhaar)", url: "/docs/aadhaar.pdf", timestamp: 1710003600 },
      { name: "Land Records", url: "/docs/land_records.pdf", timestamp: 1710086400 },
    ],
  };

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userVerified, setUserVerified] = useState(false);

  const sendOTP = () => {
    setOtpSent(true);
    alert("Enter any OTP to proceed."); // No real SMS sent
  };

  const verifyOTP = () => {
    if (!otp) return alert("Enter OTP!");
    setUserVerified(true); // Any OTP is accepted
    alert("Applicant verified successfully!");
  };

  return (
    <div className="applicant-container">
      <h1>Applicant: {data.applicantName}</h1>
      <h2>Secure Document Access</h2>

      {!userVerified ? (
        <>
          <button onClick={sendOTP}>Send OTP</button>

          {otpSent && (
            <div className="otp-section">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={verifyOTP}>Verify OTP</button>
            </div>
          )}
        </>
      ) : (
        <>
          <h3>Documents & Actions</h3>
          <table className="documents-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>View</th>
                <th>Download</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.documents.map((doc, idx) => (
                <tr key={idx}>
                  <td>{doc.name}</td>
                  <td>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </td>
                  <td>
                    <a href={doc.url} download>
                      Download
                    </a>
                  </td>
                  <td>{new Date(doc.timestamp * 1000).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

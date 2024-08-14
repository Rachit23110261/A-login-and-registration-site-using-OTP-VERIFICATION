import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const EMAILVerifier = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { storeTokenInLS, email } = useAuth();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(10);

  const URL = `http://localhost:5000/api/auth/emailverify`;

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const sendOTP = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/emailotpsend', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        toast.success('OTP Sent Successfully')
      } else {
        toast.error('Please check your EMAIL address')
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handlesendOTP = () => {
    sendOTP(email);
    setResendDisabled(true);
    setTimeout(() => {
      setResendDisabled(false);
    }, 10000);
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        toast.success('EMAIL Verified');
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "EMAIL verification failed");
      }
    } catch (error) {
      console.error("Error during EMAIL verification:", error);
      setError("An error occurred during OTP verification");
    }
  };

  useEffect(() => {
    sendOTP(email);
  }, []); // Empty dependency array means this effect runs only once, on mount

  useEffect(() => {
    let interval;
    if (resendTimer > 0 && resendDisabled) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0 && resendDisabled) {
      setResendDisabled(false);
      setResendTimer(10);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendTimer, resendDisabled]);

  return (
    <>
      <section>
        <main>
          <div className="otp-verifier">
            <div className="container">
              <h1 className="main-heading mb-3">OTP Verification</h1>
              <br />
              <form onSubmit={handleSubmitOTP}>
                <div>
                  <label htmlFor="otp">Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    id="otp"
                    required
                    autoComplete="off"
                    value={otp}
                    onChange={handleOTPChange}
                  />
                </div>
                {error && <p className="error-message">{error}</p>}
                <br />
                
                <button type="submit" className="btn btn-submit">
                  Verify OTP
                </button>
              </form>
              <button onClick={handlesendOTP} disabled={resendDisabled} className="btn btn-submit">
                  {resendDisabled ? `Resend OTP in ${resendTimer}s` : 'Send OTP'}
                </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

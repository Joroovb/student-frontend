import { supabase } from "../../lib/client";
import "./loginbutton.css";

const LoginButton = () => {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://roc-dev.tech/",
      },
    });
  }

  return (
    <div className="google-btn" onClick={() => signInWithGoogle()}>
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google logo"
        />
      </div>
      <p className="btn-text">
        <b>Sign in with Google</b>
      </p>
    </div>
  );
};

export default LoginButton;

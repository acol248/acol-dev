import { useRef } from "react";

// interface
import Checkbox from "../../interface/checkbox";
import Input from "../../interface/input";
import Button from "../../interface/button";

// styles
import styles from "../../styles/Login.module.scss";

export default function Login() {
  const loginFormRef = useRef(null);

  /**
   * Handles login
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    const { current: form } = loginFormRef;

    const formData = Object.fromEntries(new FormData(form));

    console.log(formData);

    // try {
    //   return await fetch("", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(),
    //   });
    // } catch (err) {
    //   return console.log(err);
    // }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <form ref={loginFormRef} onSubmit={handleLogin}>
          <Input name="login_username">Username</Input>
          <Input type="password" name="login_password">
            Password
          </Input>
          <Checkbox name="login_remember">Remember Me</Checkbox>
          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
}

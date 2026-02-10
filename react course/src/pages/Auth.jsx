//hooks
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"

//components
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import ErrorPopUp from '../components/ErrorPopUp';

const Auth = () => {
  const [mode, setMode] = useState("Sign Up");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp, signIn, error, user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    let result;
    if (mode === "Sign Up") {
      result = signUp(data.email, data.password)

    } else {
      result = signIn(data.email, data.password)
      if (result.success) {
        navigate("/")
      }
    }
  }

  return (
    <div className="page">
      <div className="container">
        {user && <p>{"user registered succesfully " + user.email}</p>}
        <button onClick={logOut}>LogOut</button>
        <div className="auth-container">
          <h1 className="page-title">{mode === "Sign Up" ? "Sign Up" : "Sign In"}</h1>
          <form action="submit" className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <Label
                className="form-label"
                label="Email"
                htmlFor="email"
              />
              <Input
                className="form-input"
                type="email"
                id="email"
                {...register("email", { required: "The email is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
              <Label
                className="form-label"
                label="Password"
                htmlFor="password"
              />
              <Input
                className="form-input"
                type="password"
                id="password"
                {...register("password", {
                  required: "The password is required",
                  minLength: { value: 6, message: "Password must be at least 6 chars long" },
                  maxLength: { value: 12, message: "Password must be less than 12 characters" }
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <Button
              className="btn btn-primary btn-large"
              label={mode === "Sign Up" ? "Sign Up" : "Sign In"}
              type="submit"
            />
          </form>
          <div className="auth-switch">
            {mode === "Sign Up" ? (
              <p>
                Already have an account?
                <span className="auth-link" onClick={() => setMode("Sign In")}>Login</span>
              </p>
            ) : (
              <p>
                Don't have an account?
                <span className="auth-link" onClick={() => setMode("Sign Up")}>Sing Up</span>
              </p>
            )}
          </div>
        </div>
        {error && <ErrorPopUp />}
      </div >
    </div >
  )
}

export default Auth;

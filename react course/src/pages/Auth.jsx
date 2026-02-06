//hooks
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from "../context/AuthContext";


//components
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';

const Auth = () => {
  const [mode, setMode] = useState("Sign Up");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp, signIn } = useContext(AuthContext)

  const onSubmit = (data) => {
    let process = null
    if(mode === "Sign Up"){
      process = signUp(data.email, data.password)
    }else{
      process = signIn(data.email, data.password)
    }
    return process;
  }

  return (
    <div className="page">
      <div className="container">
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
      </div >
    </div >
  )
}

export default Auth;

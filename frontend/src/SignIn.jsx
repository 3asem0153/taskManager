import React from "react";
import Container from "./container"
const SignIn = () => {

  const form = <form>
    <h2>Sign in </h2>
    <label>
      Email address :
      <input />
    </label>
    <br />
    <label>
      Password:
      <input />
    </label>
    <button type="submit">Submit</button>
    <h5>don't have an account?  <a href="./sign-up">create account</a></h5>

  </form>
  return <>
    <Container closec="hidden" conclass="container" action={() => { }} content={form} />
  </>
}

export default SignIn;
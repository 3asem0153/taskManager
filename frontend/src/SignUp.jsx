import React from "react";
import Container from "./container";

const SignUp = () => {

    const form = <form>
        <h3>Sign up a new account</h3>
        <label>
            Email address
            <input type="email" />
        </label>
        <br />
        <label>
            Password:
            <input type="password" />
        </label>
        <br />
        <label>
            Confirm Password:
            <input type="password" />
        </label>
        <button type="submit">Submit</button>

    </form>
    return <>
        <Container closec="hidden" conclass="container" action={() => { }} content={form} />
    </>
}

export default SignUp;
import React, {
  useState
} from "react";
import Container from "./container";

const SignUp = () => {
  const [formData,
    setFormData] = useState( {
      email: "",
      password: ""
    })
  const handleChange = (e)=> {
    setFormData((prevData)=> (
      {
        ...prevData,
        [e.target.name]: e.target.value,
      }

    )
    )}

  const handleSubmit = (e)=> {
    e.preventDefault();
    fetch("http://localhost:3000/sign-up",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)}
    ).then(res => res.json()).then(data => console.log("data from server:", data)).catch(Error => console.log(`Error : ${Error}`))}


  const form = <form onSubmit={handleSubmit}>
    <h3>Sign up a new account</h3>
    <label>
      Email address
      <input type="email" name="email" value={formData.email} onChange={handleChange} />
  </label>
  <br />
<label>
  Password:
  <input type="password" name="password" value={formData.password} onChange={handleChange} />
</label>
<br />
<label>
Confirm Password:
<input type="password" />
</label>
<button type="submit">Submit</button>

</form>

return <>
<Container closec="hidden" conclass="container" action={() => {}} content={form} />
</>
}

export default SignUp;
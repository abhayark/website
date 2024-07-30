import React from 'react'
import './Sign_up/Signup.css'

function Signup() {
  return (
    <body>
      <div class="signupFrm">
        <form action="" class="form">
          <h1 class="title">Sign up</h1>

          <div class="inputContainer">
              <input type="text" class="input" placeholder="Email"/>
              <label for="" class="label">Email</label>
           </div>

           <div class="inputContainer">
              <input type="text" class="input" placeholder="Username"/>
              <label for="" class="label">Username</label>
            </div>

            <div class="inputContainer">
              <input type="text" class="input" placeholder="Password"/>
              <label for="" class="label">Password</label>
            </div>

            <div class="inputContainer">
              <input type="text" class="input" placeholder="Confirm"/>
              <label for="" class="label">Confirm Password</label>
            </div>

            <input type="submit" class="submitBtn" value="Sign up"/>
        </form>
      </div>
    </body>
  )
}

export default Signup
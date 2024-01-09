import React from 'react'
import { supabase } from '../supabaseClient'
import { useState } from 'react'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSignUp = async (e) => {
      e.preventDefault()
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) console.error(error)
      else console.log(user)
    }
  
    return (
      <form onSubmit={handleSignUp}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    )
}

export default SignUp
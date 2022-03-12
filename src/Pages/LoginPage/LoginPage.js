import React, {useState} from 'react';

const validateEmail = email => {
    String(email)
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if(!validateEmail) return 'Invalid email';
      return '';
  };

const validatePassword = password =>{
    if(!password) return 'Required';
    if(!password.length<0) return 'At least 8 characters';
    return '';
}

const LoginPage = () =>{
    const [values, setValues] = useState({
        email:'',
        password:'',
    });
    const [isFormDt,setIsFormDt] = useState(false);
    const [touched, setTouched]=useState({
        email: false,
        password:false
    })

    const[errors, setErrors]=useState({
        email:'',
        password:'',
    })

    const handleInputChange = evt =>{
        setIsFormDt(true);
        setValues(
            {...values,[evt.target.name]: evt.target.value})
            if(evt.target.name=== 'email'){
                setErrors({
                    ...errors,[evt.target.name]: validateEmail(evt.target.value)
                }
                )
            }
            if(evt.target.name=== 'password'){
                setErrors({
                    ...errors,[evt.target.name]: validatePassword(evt.target.value)
                }
                )
            }
console.log('this is the error', evt.target.value, evt.target.name)
    };
    
    const handleInputBlur = evt =>{
        setTouched({
            ...touched,
            [evt.target.name]:true
        })
    }
    const isFormInvalid = errors.email||errors.password||!isFormDt;

    const handleOnSubmit = evt=>{
        evt.preventDefault();
        console.log('valuse = ',values);
    }
    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <div>
                <input style = {{display:'block', margin:'20px'}} 
                type="text" 
                placeholder='Email' 
                value={values.email} 
                onChange={handleInputChange}
                onBlur ={handleInputBlur}
                name = "email"
                />
                {touched.email && errors.email!=='' && <p style={{color:'red', margin :'20px'}}>{errors.email}</p>}
                </div>

                <div>
                <input style = {{display:'block', margin:'20px'}} 
                type="Password" 
                placeholder='Password' 
                value={values.password} 
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                name="password"/>
                {touched.password && errors.password!=='' && <p style={{color:'red', margin :'20px'}}>{errors.password}</p>}
                </div>

                <button disabled={isFormInvalid} style={{display:'block', margin:'20px'}} type ="submit">Submit</button>
            </form>
        </div>
    )
}
export default LoginPage;
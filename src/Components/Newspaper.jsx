import React, {useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import {useMutation} from 'react-query';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export default function Newspaper() {
    const schema = yup
    .object()
    .shape({
      fullName: yup.string(),
      email: yup.string().email().required()
    })
    .required();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema)
      });

    const [hide,setHide] = useState({
        spinner: "hidden",
        message: "hidden"})
    const [captcha,setCaptcha] = useState("")



    const [poslano,setposlano] = useState("false");

        function sendPost (data) {
            if (captcha !== "") {
                
            } else {
                setError('captcha22', { type: 'custom', message: 'captcha not ticked!' });
                return null;
            }
                     
            console.log(data);
            console.log(data.email);
            
            mutation.mutate({
                ime: data.fullName,
                mail: data.email,
                captchaToken: captcha,
            });
            console.log("submited?");
            setHide({
                spinner: "",
                message: "hidden"});
        }
     
          const mutation = useMutation(
            text => axios.post('http://localhost:3100/api/posting', { text }),
            {
                 onSuccess: (data, variables, context) => {
                    // I will fire first
                    setHide({
                        spinner: "hidden",
                        message: ""});
                    console.log(data.data);
                  },
                 onError: (error, variables, context) => {
                // I will fire first
                    },
            }
          )
   
    function onChange(value) {
        setCaptcha(value);
        console.log('Captcha value:', value);
    }



  return (  
    <>
        
        <section class="text-gray-600 body-font bg-turkizna">
            

            <form onSubmit={handleSubmit(sendPost)} method="post">
            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
            
            {/* <img className="absolute transform-gpu scale-50 left-1/4 skew-x-12 -skew-y-12 z-0" src="images/play_Board.png" alt=""/>  */}
                <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 class="title-font font-medium text-3xl text-gray-900">Prijavi se na časopis !</h1>
                    <p class="leading-relaxed mt-4"> Bodi obveščen o vseh novicah !</p>
                </div>
                
                <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col relative md:ml-auto w-full mt-10 md:mt-0 z-10">
                
                <div className={'absolute flex justify-center items-center left-0 top-0 w-full h-full bg-slate-900 opacity-80 z-20 rounded-lg '+ hide.spinner}>
                    <div class="lds-hourglass text-accent"> </div>   
                </div>
                <div className={'absolute flex flex-col justify-center items-center left-0 top-0 w-full h-full bg-slate-900 opacity-95 z-20 rounded-lg '+ hide.message}>
                    <p className='text-xl text-white'>Thank you for subscribing!</p>
                    🙂
                </div>
                
                    <h2 class="text-lg font-medium title-font mb-5 text-primary">Fill out to subscribe</h2>
                <div class="relative mb-4">
                        <label for="full-name" class="leading-7 text-sm text-gray-600">Full Name</label>
                        <input {...register("fullName")} type="text" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-600">Email *</label>
                    <input  {...register("email", { required: true})} id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors.email && (
                    <p className="tooltip tooltip-open tooltip-error bg-error rounded m-1 p-1 flex"> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.email.message}</p>
                      )}
                </div>
                <div className="App">
                    <ReCAPTCHA
                        sitekey="6LerNyogAAAAAD9X1A4eSHdO2L5hhEukHWdme0EE"
                        size="normal"
                        onChange={onChange}
                        
                    />
                    <input {...register("captcha22")} className="hidden"></input>
                    {errors.captcha22 && (
                    <p className="tooltip tooltip-open tooltip-error bg-error rounded m-1 p-1 flex"> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.captcha22.message}</p>
                      )}
                </div>
                <button type='submit' class="text-white bg-accent border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Subscribe</button>
                <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                </div>
            </div>
            </form>
        </section>
    </>
    )

}

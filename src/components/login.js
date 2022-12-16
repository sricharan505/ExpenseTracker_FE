import { useSelector, useDispatch } from "react-redux";
import { setisloading, setloginerror, login } from "../features/User/userSlice";
import { Navigate } from "react-router-dom";
import Error from "./error";

const Login = () => {
  const dispatch = useDispatch();

  const { isloggedin, loginerror, isloading } = useSelector(
    (state) => state.user
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Trying to login" + process.env.REACT_APP_API_URL);
    const email = e.target.email.value;
    const password = e.target.password.value;

    dispatch(setloginerror({ loginerror: "" }));
    dispatch(setisloading({ isloading: true }));

    const loginquery = {
      query: `
                {
                    login
                    (
                        email:"${email}"
                        password:"${password}"
                    )
                    {
                        jwt
                        username
                        email
                        acctype
                        isloggedin
                    }
                }
            `,
    };

    let res; 

    try
    {
      res = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginquery),
      });

      res = await res.json();
    }
    catch(err)
    {
      console.log(err);
      return(<Error/>);
    }


    //console.log(res);

    if (res.errors) {
      dispatch(setloginerror({ loginerror: res.errors[0].message }));
      dispatch(setisloading({ isloading: false }));
      console.log(loginerror);
      return;
    }

    const isloggedin = res.data.login.isloggedin;

    if (isloggedin) {
      console.log("logged in");
      dispatch(setisloading({ isloading: false }));
      dispatch(
        login({
          username: res.data.login.username,
          email: res.data.login.email,
          authtoken: res.data.login.jwt,
          acctype: res.data.login.acctype,
          isloggedin: res.data.login.isloggedin,
        })
      );
    }
  };

  if(isloading)
  {
      return(<>
          <h1>Loading.....</h1>
      </>)
  }

  return (
    <div className="flex justify-start items-center w-full h-screen  loginbg">
      <div className="hidden sm:inline w-1/6"></div>
      <div className="flex flex-col justify-center text-lg bg-gradient-to-b from-violet-500 via-purple-700 to-purple-900 border rounded-md w-full md:w-1/3 lg:w-1/4 h-full sm:h-4/5 xl:3/5 ">
        <div className="flex justify-center items-center py-6">
          <svg
            width="100"
            height="100"
            viewBox="0 0 312.5 312.5"
            className="bg-stone-300 rounded-full"
          >
            <defs id="SvgjsDefs1817"></defs>
            <g
              id="SvgjsG1819"
              featurekey="symbolFeature-0"
              transform="matrix(1.2453194306351842,0,0,1.2453194306351842,94.27523260044657,42.399806780107696)"
              fill="#111111"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M2.6,31.4c1.1-0.9,2.9-1.2,4.3,0.3c0.9,1.1,1.4,4.4,1.6,5.3c0.5,3.2,1.1,7.8,1.2,11c0,0.2,0,0.5,0,0.7c0.1,1.4,0.4,2.7,1,4  c3.3,7.1,9.8,16,9.8,16l0.4,0.5c0.3,0.4,0.8,0.5,1.2,0.3c0.5-0.3,0.6-0.9,0.4-1.3l-8.7-14.1c-0.9-1.6-0.4-3.8,1.3-4.8  c1.7-1,3.9-0.5,4.9,1.1l9,11.6c0.6,0.8,1.7,1.9,2.5,2.4c8.1,5.8,9.2,11.8,9.9,14.8c0,0,0.1,0.7,0.1,1.7h0l0,0c0,0.8,0,1.8-0.2,2.8  l-0.5,9.7c0,0.7-0.6,1.3-1.3,1.3l-15.2-0.1c-0.7,0-1.3-0.6-1.3-1.3l-0.3-8L8.1,67.8c-2.1-2.3-3.6-4.8-4-7.9L3.9,59L1.4,34.6  C1.3,33.4,1.7,32.1,2.6,31.4z M12.3,46.3c0,0.3,0,0.5,0,0.8c0.3-0.3,0.6-0.5,1-0.7c0.4-0.3,0.9-0.5,1.4-0.6c0,0,0-0.1,0.1-0.1  c-0.3-2.5-1.2-7.3-1.9-9.8c-0.3-1.2-1.1-2.1-2.3-2.6c0.3,0.9,0.4,1.7,0.6,2.6C11.6,38.7,12.3,43.6,12.3,46.3z M17.2,45.4  c0.7,0,1.5,0.2,2.2,0.4c-0.2-1.6-1.3-4.9-1.7-6.4c-0.3-1.2-1-2.1-2.3-2.5c0.4,1.8,1.4,5.2,1.7,7l0.2,1.2  C17.2,45.1,17.2,45.2,17.2,45.4z M93.1,31.6c-0.9,1.1-1.4,4.4-1.6,5.3c-0.5,3.2-1.1,7.8-1.2,11c0,0.2,0,0.5,0,0.7  c-0.1,1.4-0.4,2.7-1,4c-3.3,7.1-9.8,16-9.8,16l-0.4,0.5c-0.3,0.4-0.8,0.5-1.2,0.3c-0.5-0.3-0.6-0.9-0.4-1.3l8.7-14.1  c0.9-1.6,0.4-3.8-1.3-4.8c-1.7-1-3.9-0.5-4.9,1.1l-9,11.6c-0.6,0.8-1.7,1.9-2.5,2.4c-8.1,5.8-9.2,11.8-9.9,14.8c0,0-0.1,0.7-0.1,1.7  v0c0,0.8,0,1.8,0.2,2.8l0.5,9.7c0,0.7,0.6,1.3,1.3,1.3l15.2-0.1c0.7,0,1.3-0.6,1.3-1.3l0.3-8l14.5-17.4c2.1-2.3,3.6-4.8,4-7.9  l0.1-0.9l2.5-24.5c0.1-1.2-0.3-2.4-1.2-3.2C96.2,30.4,94.4,30.1,93.1,31.6z M85.3,45.7C85.3,45.7,85.3,45.7,85.3,45.7  c0.5,0.2,1,0.5,1.4,0.7c0.4,0.2,0.7,0.5,1,0.7c0-0.3,0-0.5,0-0.8c0.1-2.7,0.7-7.6,1.2-10.4c0.1-0.8,0.3-1.7,0.6-2.6  c-1.3,0.4-2,1.3-2.3,2.6C86.5,38.3,85.6,43.1,85.3,45.7z M80.6,45.8c0.7-0.3,1.4-0.4,2.2-0.4c0-0.1,0-0.2,0-0.3l0.2-1.2  c0.2-1.8,1.3-5.1,1.7-7c-1.2,0.4-1.9,1.3-2.3,2.5C81.9,40.9,80.8,44.2,80.6,45.8z M38.9,26.8H26.7v25h12.2V26.8z M43.9,5.3h12.2  v46.4H43.9V5.3z M52.8,44.5l-4,4h4V44.5z M47.2,12.6l3.9-3.9h-3.9V12.6z M47.2,20.9l5.7-5.7v-4l-5.7,5.7V20.9z M47.2,29.2l5.7-5.7  v-4l-5.7,5.7V29.2z M47.2,37.6l5.7-5.7v-4l-5.7,5.7V37.6z M47.2,45.9l5.7-5.7v-4l-5.7,5.7V45.9z M61.1,16.7h12.2v35.1H61.1V16.7z   M64.3,48.5H70V19.9h-5.7V48.5z"
              ></path>
            </g>
            <g
              id="SvgjsG1820"
              featurekey="nameFeature-0"
              transform="matrix(1.5864957105536184,0,0,1.5864957105536184,56.00000037825005,181.10433334759588)"
              fill="#111111"
            >
              <path d="M9.4 21.24 l0 3.76 l-5.64 0 l0 14.92 l-3.76 0 l0 -28.48 l9.32 0 l0 3.8 l-5.56 0 l0 6 l5.64 0 z M17.228 11.36 l0 28.48 l-3.8 0 l0 -28.48 l3.8 0 z M30.536 33.44 l0.16 -22.16 l3.84 0 l-0.24 28.88 l-5.96 0 l-3.24 -22.36 l0 22.36 l-3.84 0 l0 -28.88 l6.2 0 z M45.764 11.440000000000001 l3.8 0 l0 28.52 l-3.8 0 l0 -15.08 l-3.4 0 l0 15.08 l-3.8 0 l0 -28.52 l3.8 0 l0 9.68 l3.4 0 l0 -9.68 z M62.912 24.92 l-5.52 0 l0 11.28 l5.56 0 l0 3.8 l-9.36 0 l0 -28.56 l9.36 0 l0 3.8 l-5.56 0 l0 5.88 l5.52 0 l0 3.8 z M76.7 40 l-1.44 -9.88 l-4.04 0 l-1.32 9.88 l-3.84 0 l4.32 -28.6 l5.16 0 l5 28.6 l-3.84 0 z M71.74000000000001 26.32 l2.96 0 l-1.52 -10.4 z M88.328 36.24 l5.52 0 l0 3.76 l-9.28 0 l0 -28.72 l3.76 0 l0 24.96 z M111.71600000000001 11.36 l0 3.84 l-4.76 0 l0 24.84 l-3.84 0 l0 -24.84 l-5.24 0 l0 -3.84 l13.84 0 z M122.264 11.440000000000001 l3.8 0 l0 28.52 l-3.8 0 l0 -15.08 l-3.4 0 l0 15.08 l-3.8 0 l0 -28.52 l3.8 0 l0 9.68 l3.4 0 l0 -9.68 z"></path>
            </g>
          </svg>
        </div>
        <p className="pb-4 text-center text-4xl">Login</p>
        <form onSubmit={handleSubmit} className="p-2">
          <div className="p-2 ">
            <label htmlFor="email" className="font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="inline w-7 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Email
            </label>
            <br></br>
            <input
              id="email"
              className="border rounded w-full p-1 bg-gray-300"
              type="email"
              required
            ></input>
            {/* {loginerror ? <p>Enter a proper email.</p> : <br></br>} */}
          </div>

          <div className="p-2">
            <label htmlFor="password" className="font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="inline w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Password
            </label>
            <input
              id="password"
              className="border rounded w-full p-1 bg-gray-300"
              type="password"
              required
            ></input>
            {/* {loginerror ? <p>{"Enter the correct password."}</p> : <br></br>} */}
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="bg-stone-300 font-semibold border rounded-2xl py-2 px-8"
            >
              Lets Go!
            </button>
          </div>

          <div className="p-4 text-red-600">
            {loginerror ? <p>{loginerror}</p> : <br></br>}
          </div>
        </form>
      </div>
      {isloggedin && <Navigate to="/home"></Navigate>}
    </div>
  );
};

export default Login;

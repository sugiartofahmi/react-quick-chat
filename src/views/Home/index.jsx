import { lazy, useState } from "react";
const ContentLayout = lazy(() => import("@/layouts/ContentLayout"));
import { codeNumber } from "../../Helper";
import { BsFillClipboard2Fill } from "react-icons/bs";
import { HiClipboardDocument } from "react-icons/hi2";
import { AiOutlineDelete } from "react-icons/ai";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("62");
  const [result, setResult] = useState([]);
  const [valid, setValid] = useState(false);
  const regex = /([a-zA-Z-’/`~!#*$@_%+=.^&(){}[\]|;:”"<>?\\])/gi;
  const submit = () => {
    if (!regex.test(number)) {
      try {
        if (number.includes(",")) {
          const multiNumber = number.split(",").map((el) => ({
            number: `${country}${
              el.startsWith("0") ? el.replace("0", "") : el
            }`,
            message: message.split(" ").join("%20"),
          }));
          setResult((prev) => prev.concat(multiNumber));
        } else {
          setResult((prev) => [
            ...prev,
            {
              number: `${country}${
                number.startsWith("0") ? number.replace("0", "") : number
              }`,
              message: message.split(" ").join("%20"),
            },
          ]);
        }
        setMessage("");
        setNumber("");
      } catch (err) {
        console.log(err);
        setMessage("");
        setNumber("");
      }
    } else {
      setValid(!valid);
    }
  };

  return (
    <ContentLayout>
      <div className="flex w-full h-full justify-center py-[35px] px-5 items-center font-montserrat ">
        <div className="flex flex-col flex-start md:w-[60%] w-[100vh] text-center   h-full gap-y-[5vh]">
          <h1 className=" font-bold text-3xl text-left ">Quick Chat</h1>
          <div className="flex flex-start flex-col gap-y-2">
            <h1 className=" font-bold text-lg text-left">WhatsApp Numbers :</h1>
            <div className="flex flex-row gap-x-3">
              <div className="w-1/3 ">
                <select
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-full rounded-lg p-3  text-sm  focus:ring-2 focus:ring-blue-500   block  bg-gray-700  placeholder-gray-400 dark:text-white focus:outline-none"
                  value={country}
                >
                  {codeNumber.map((el, i) => (
                    <option key={i} value={el.code}>
                      {`(+${el.code})${el.country}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-2/3 ">
                <input
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                    setValid(regex.test(number));
                  }}
                  type="text"
                  className="w-full h-full rounded-lg p-3  text-sm   focus:ring-2 focus:ring-blue-500 block  bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white focus:outline-none"
                  placeholder="893353xxxx,893353xxxx,893353xxxx"
                />
              </div>
            </div>
            {valid && (
              <h1 className="text-left text-sm font-medium text-red-500">
                Special characters and letters are not allowed
              </h1>
            )}
          </div>
          <div className="flex flex-start flex-col gap-y-2">
            <h1 className=" font-bold text-lg text-left">Message :</h1>
            <div className="flex flex-row gap-x-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded bg-gray-700  placeholder-gray-400 text-white"
                placeholder="Write message here..."
              ></textarea>
            </div>
          </div>
          <button
            disabled={!number | valid}
            onClick={submit}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-10 disabled:hover:bg-blue-500  text-white font-medium py-2 px-4 rounded-lg w-[15vh]"
          >
            Submit
          </button>
          <div className="gap-y-2 flex flex-col ">
            {result.length > 0 && (
              <h1 className=" font-bold text-lg text-left">Result :</h1>
            )}
            <div className="">
              <ol className="list-decimal flex text-base md:text-lg flex-col px-5 gap-y-3">
                {result.length > 0 &&
                  result.map((el, i) => (
                    <li key={i}>
                      <div className="flex text-blue-500  flex-row gap-x-2 items-center">
                        <a
                          className="text-left  flex  hover:underline font-medium"
                          href={`https://wa.me/${el.number}${
                            el.message != "" ? `?text=${el.message}` : ""
                          }`}
                          target="_blank"
                        >
                          {`wa.me/${el.number}`}
                        </a>
                        <CopyToClipboard
                          onCopy={() =>
                            toast.success("Copied to clipboard", {
                              position: toast.POSITION.TOP_CENTER,
                            })
                          }
                          text={`wa.me/${el.number}${
                            el.message != "" ? `?text=${el.message}` : ""
                          }`}
                        >
                          <button className="flex flex-row items-center border-solid border-2 border-blue-500 hover:bg-blue-500 hover:text-white  disabled:opacity-10 font-medium md:text-sm text-xs py-1 px-2 gap-x-2 rounded-lg md:w-[17vh] w-[15vh]">
                            <BsFillClipboard2Fill />
                            Copy link
                          </button>
                        </CopyToClipboard>
                      </div>
                    </li>
                  ))}
                {result.length > 1 && (
                  <div className="flex gap-x-2">
                    <button
                      onClick={() => setResult([])}
                      className="flex text-red-500  flex-row items-center border-solid border-2 border-red-500 hover:bg-red-500 hover:text-white  disabled:opacity-10 font-medium md:text-sm text-xs py-1 px-2 gap-x-2 rounded-lg md:w-[17vh] w-[15vh]"
                    >
                      <AiOutlineDelete /> Delete all
                    </button>
                    <CopyToClipboard
                      onCopy={() =>
                        toast.success("Copied all to clipboard", {
                          position: toast.POSITION.TOP_CENTER,
                        })
                      }
                      text={result.map(
                        (el) =>
                          `wa.me/${el.number}${
                            el.message != "" ? `?text=${el.message}` : ""
                          }`
                      )}
                    >
                      <button className="flex text-blue-500  flex-row items-center border-solid border-2 border-blue-500 hover:bg-blue-500 hover:text-white  disabled:opacity-10 font-medium md:text-sm text-xs py-1 px-2 gap-x-2 rounded-lg md:w-[17vh] w-[15vh]">
                        <HiClipboardDocument /> Copy all
                      </button>
                    </CopyToClipboard>
                  </div>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </ContentLayout>
  );
};

export default Home;

// import { usePaystackPayment } from "react-paystack";

// const formData = new FormData();

// export const Paystack = () => {
//   const config = {
//     reference: new Date().getTime().toString(),
//     email: formData.get("email") as string,
//     amount: Number(formData.get("amount")) * 100,
//     publicKey: import.meta.env.PUBLIC_KEY,
//   };

//   const initializePayment = usePaystackPayment(config);

//   // you can call this function anything
//   const onSuccess = (reference) => {
//     // Implementation for whatever you want to do with reference and after success call.
//     console.log(reference);
//   };

//   // you can call this function anything
//   const onClose = () => {
//     // implementation for  whatever you want to do when the Paystack dialog closed.
//     console.log("closed");
//   };
//   return (
//     <div>
//       <div>
//         <form>
//           <div>
//             <label htmlFor="">Email:</label>
//             <input type="email" name="email" />
//           </div>
//           <div>
//             <label htmlFor="">Amount:</label>
//             <input type="number" name="amount" />
//           </div>
//         </form>
//       </div>
//       <div>
//         <button
//           type="submit"
//           onClick={() => {
//             initializePayment(onSuccess, onClose);
//           }}
//         >
//           Paystack Hooks Implementation
//         </button>
//       </div>
//     </div>
//   );
// };

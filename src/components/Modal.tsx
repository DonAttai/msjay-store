//import react hooks
import { useRef, useEffect } from "react";

// prop type
type modalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

export const Modal = ({ isOpen, toggleModal }: modalProps) => {
  //dialogRef
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      return dialogRef.current?.showModal();
    } else {
      return dialogRef.current?.close();
    }
  }, [isOpen]);

  const onClose = () => {
    dialogRef.current?.close();
    toggleModal();
  };
  return (
    <dialog ref={dialogRef} className="px-4 py-2 rounded-md w-3/4 md:w-1/3">
      <div>
        <div className="flex justify-between items-center">
          <p>Sign in</p>
          <button
            onClick={onClose}
            className="text-2xl bg-red-500 rounded-md shadow text-white px-2 py-0"
          >
            &times;
          </button>
        </div>
        <hr className="mt-1" />
        <div className="mt-4">
          <div>
            <form>
              <div className="flex flex-col mb-3">
                <label htmlFor="">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="shadow border p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="shadow border p-2 rounded-md"
                />
              </div>
            </form>
            <div className="text-center">
              <button className="bg-green-600 text-white px-4 py-1 rounded-md">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

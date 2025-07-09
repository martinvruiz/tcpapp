import { toast } from "react-toastify";

export const confirmToast = ({
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const toastId = toast(
    <div className="flex flex-col items-center w-full gap-2">
      <p className="text-white">{message}</p>
      <div className="flex gap-3 justify-end mt-3">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          onClick={() => toast.dismiss(toastId)}
        >
          {cancelText}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          onClick={() => {
            onConfirm();
            toast.dismiss(toastId);
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
      draggable: false,
      className: "!bg-sky-700 !text-gray-900 !shadow-md !rounded-lg !p-4 !mb-4",
    }
  );
};
